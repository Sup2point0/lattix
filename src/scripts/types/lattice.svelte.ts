import { prefs } from "#scripts/stores";
import { ThemeCol } from "#scripts/config";

import { Cell } from "./cell.svelte.ts";
import type { int, Direction } from "./root";
import type { CurrentState } from "#scripts/stores/current.svelte.ts";

import { get } from "svelte/store";
import { SvelteSet } from "svelte/reactivity";


const MIN_SIZE: int = 1;
const MAX_SIZE: int = 32;


/**
 * A grid of cells.
 */
export class Lattice
{
  /**
   * Cells of the grid, including outer cells.
   * 
   * A square 2D array, indexed as `[row][col]` (y, x).
   * */
  cells: Cell[][] = $state([]);

  /** Currently selected cells. */
  selected = new SvelteSet<Cell>();

  #current?: CurrentState;


  // == PROPERTIES == //

  /** x-width of the grid, including outer cells. */
  get full_width(): int {
    return this.cells.length ? (this.cells[0].length) : 0;
  }

  /** x-width of the grid, excluding outer cells. */
  get inner_width(): int {
    return this.full_width ? (this.full_width - 2) : 0;
  }

  /** y-height of the grid, including outer cells. */
  get full_height(): int {
    return this.cells.length ? (this.cells.length) : 0;
  }

  /** y-height of the grid, excluding outer cells. */
  get inner_height(): int {
    return this.full_height ? (this.full_height - 2) : 0;
  }


  // == CONSTRUCTORS == //

  init(width: int, height: int, current?: CurrentState)
  {
    if (width < MIN_SIZE)  width = MIN_SIZE;
    if (height < MIN_SIZE) height = MIN_SIZE;

    this.cells = Array.from({ length: height + 2 },
      (_, y) => Array.from({ length: width + 2 },
        (_, x) => new Cell(x, y)
      )
    );

    this.#current = current;
  }


  // == ACCESSORS == //

  at(x: int, y: int): Cell | undefined
  {
    return this.cells.at(y)?.at(x);
  }

  row(y: int): Cell[]
  {
    return this.cells[y];
  }

  column(x: int): Cell[]
  {
    return this.cells.map(row => row[x]);
    
  }

  *iter_cells(): Generator<Cell>
  {
    for (let row of this.cells) {
      for (let cell of row) {
        yield cell;
      }
    }
  }

  inner_rows(): Array<Cell[]>
  {
    return this.cells.slice(1, -1);
  }

  *iter_inner_rows(): Generator<Cell[]>
  {
    return this.inner_rows()[Symbol.iterator];
  }

  *iter_inner_cols(): Generator<Cell[]>
  {
    for (let x = 1; x < this.inner_width + 1; x++) {
      yield Array.from({ length: this.inner_height + 2 },
        (_, y) => this.at(x, y)!
      );
    }
  }


  // == PREDICATES == //

  is_square: boolean = $derived(this.full_width === this.full_height);

  is_outer_cell(cell: Cell): boolean
  {
    let is_outer_x = (cell.x == 0 || cell.x == this.inner_width + 1);
    let is_outer_y = (cell.y == 0 || cell.y == this.inner_height + 1);

    return is_outer_x || is_outer_y;
  }

  is_corner_cell(cell: Cell): boolean
  {
    let is_upper_left  = (cell.x == 0             && cell.y == 0);
    let is_upper_right = (cell.x == this.inner_width + 1 && cell.y == 0);
    let is_lower_left  = (cell.x == 0             && cell.y == this.inner_height + 1);
    let is_lower_right = (cell.x == this.inner_width + 1 && cell.y == this.inner_height + 1);

    return is_upper_left || is_upper_right || is_lower_left || is_lower_right;
  }


  // == UTILITY == //

  for_each_cell(action: (cell: Cell) => void)
  {
    for (let row of this.cells) {
      for (let cell of row) {
        action(cell);
      }
    }
  }

  for_each_inner_cell(action: (cell: Cell) => void)
  {
    for (let row of this.inner_rows()) {
      for (let cell of row.slice(1, -1)) {
        action(cell);
      }
    }
  }

  /** Does the entered digit (if any) of `cell` conflict with other cells in the same column and row as it? */
  has_conflicts(cell: Cell): boolean
  {
    return (
      cell.entered !== null
      && (
        this.column(cell.x).some(c => conflicts(c))
        || this.row(cell.y).some(c => conflicts(c))
      )
    );

    function conflicts(other: Cell): boolean {
      return (
        other.entered === cell.entered
        && other !== cell
      );
    }
  }


  // == INTERACTING == //

  select_same_as_current()
  {
    let digits = [...this.selected].map(cell => cell.entered);

    let before = this.#current!.multiselecting;
    this.#current!.multiselecting = true;
    
    this.for_each_inner_cell(cell => {
      if (digits.includes(cell.entered)) {
        cell.select();
      }
    });

    this.#current!.multiselecting = before;
  }

  highlight_selected()
  {
    let is_outer = [...this.selected].every(each => this.is_outer_cell(each));
    
    const col_prefs = get(prefs).cols;
    const default_highlight = is_outer ? col_prefs.highlight_outer : col_prefs.highlight_inner;

    let added = 0;

    for (let each of this.selected) {
      if (each.highlight !== default_highlight) {
        each.highlight = default_highlight;
        added++;
      }
    }

    if (added) return;

    for (let each of this.selected) {
      each.highlight = null;
    }
  }

  highlight_same_as_current()
  {
    this.select_same_as_current();
    this.highlight_selected();
    this.selected.clear();
  }


  // == RESIZING == //

  /**
   * Add a lane to the grid.
   */
  upsize(from: Direction)
  {
    if (get(prefs).grid.unlimited !== true) {
      if (this.inner_width >= MAX_SIZE && this.inner_height >= MAX_SIZE) {
        window.alert(`Maximum supported grid size is currently ${MAX_SIZE}×${MAX_SIZE}, sorry!\n\nIf you’d like to go further, you can enable Unlimited grid size in the Control Pane, but this might result in bugs or instability!`);
        return;
      }  else if ((from === "top" || from === "down") && this.inner_height >= MAX_SIZE) {
        window.alert(`Maximum supported grid height is ${MAX_SIZE}!`);
        return;
      } else if ((from === "left" || from === "right") && this.inner_width >= MAX_SIZE) {
        window.alert(`Maximum supported grid width is ${MAX_SIZE}!`);
        return;
      }
    }

    switch (from) {
      case "down":
        // shift lowermost row to make space
        let lowest_row = this.cells.at(-1)!;
        for (let cell of lowest_row) {
          cell.y++;
        }

        let y = this.inner_height + 1;
        this.cells.splice(y, 0, Array.from({ length: this.full_width },
          (_, x) => new Cell(x, y)
        ));

        break;
      
      case "top":
        // shift all rows to make space
        for (let row of this.cells.slice(1)) {
          for (let cell of row) {
            cell.y++;
          }
        }

        this.cells.splice(1, 0, Array.from({ length: this.full_width },
          (_, x) => new Cell(x, 1)
        ));

        break;

      case "right":
        let x = this.full_width - 1;

        for (let [y, row] of this.cells.entries()) {
          // shift rightmost column to make space
          row[x].x++;

          // insert new column
          row.splice(x, 0, new Cell(x, y))
        }
        break;
      
      case "left":
        // shift all columns to make space
        for (let [y, row] of this.cells.entries()) {
          for (let cell of row.slice(1)) {
            cell.x++;
          }

          row.splice(1, 0, new Cell(1, y));
        }
        break;
    }

    prefs.update(p => {
      p.lattice.width = this.inner_width;
      p.lattice.height = this.inner_height;
      return p;
    });
  }

  /**
   * Wipe a lane from the grid.
   */
  downsize(from: Direction)
  {
    if (this.inner_width <= 1 && this.inner_height <= 1) {
      window.alert(`Minimum supported grid size is ${MIN_SIZE}×${MIN_SIZE}, mate! Any more and your grid’s gone!`);
      return;
    } else if ((from === "top" || from === "down") && this.inner_height <= 1) {
      window.alert(`Minimum supported grid height is ${MIN_SIZE}!`);
      return;
    } else if ((from === "left" || from === "right") && this.inner_width <= 1) {
      window.alert(`Minimum supported grid width is ${MIN_SIZE}!`);
      return;
    }
    
    switch (from) {
      case "down":
        this.cells.splice(this.inner_height, 1);

        for (let cell of this.cells.at(-1)!) {
          cell.y--;
        }
        break;

      case "top":
        this.cells.splice(1, 1);

        for (let row of this.cells.slice(1)) {
          for (let cell of row) {
            cell.y--;
          }
        }
        break;

      case "right":
        let x = this.inner_width;

        for (let row of this.cells) {
          row.splice(x, 1);
          row.at(-1)!.x--;
        }
        break;

      case "left":
        for (let row of this.cells) {
          row.splice(1, 1);

          for (let cell of row.slice(1)) {
            cell.x--;
          }
        }
        break;
    }

    prefs.update(p => {
      p.lattice.width = this.inner_width;
      p.lattice.height = this.inner_height;
      return p;
    });
  }


  // == LINEAR TRANSFORMS == //

  flip_horizontal()
  {
    for (let row of this.cells) {
      row.reverse();

      for (let cell of row) {
        cell.x = this.full_width - cell.x - 1;
      }
    }

    this.#current?.toasts.push("Flipped horizontally");
  }

  flip_vertical()
  {
    for (let x = 0; x < this.full_width; x++) {
      let temp: Cell[] = Array.from({ length: this.full_height });

      for (let y = 0; y < this.full_height; y++) {
        let cell = this.at(x, y)!;
        let yy = this.full_height - y - 1;
        cell.y = yy;
        temp[yy] = cell;
      }

      for (let y = 0; y < this.full_height; y++) {
        this.cells[y][x] = temp[y];
      }
    }
  }

  transpose()
  {
    let columns: Cell[][] = Array.from({ length: this.full_width }).map(_ => []);

    for (let row of this.cells) {
      for (let [x, cell] of row.entries()) {
        let [x, y] = [cell.x, cell.y];
        cell.x = y;
        cell.y = x;
        columns[x].push(cell);
      }
    }

    this.cells.splice(0);
    this.cells.push(...columns);
  }

  rotate_clockwise()
  {
    this.transpose();
    this.flip_horizontal();
  }

  rotate_counter_clockwise()
  {
    this.transpose();
    this.flip_vertical();
  }


  // == SHENANIGANS == //

  /** For a square lattice only: Fill the lattice with random digits, such that each lane has exactly 1 each of `[1, size]`. */
  fill_random(): boolean
  {
    if (this.inner_width !== this.inner_height) return false;

    /* Initialise a Sudoku grid, then shuffle by repeatedly swapping random lanes. This is sufficient to produce random output! */

    this.for_each_inner_cell(cell => {
      let xy = cell.x + cell.y;
      let digit = 1 + (xy % this.inner_width);
      cell.entered = digit.toString();
    });

    const SHUFFLE_ITERATIONS: int = 20 + this.full_width + this.full_height;

    for (let _ = 0; _ < SHUFFLE_ITERATIONS; _++) {
      if (Math.random() > 0.5) {
        let y1 = 1 + Math.floor(Math.random() * this.inner_width);
        let y2 = 1 + Math.floor(Math.random() * this.inner_width);

        for (let cell of this.cells[y1]) cell.y = y2;
        for (let cell of this.cells[y2]) cell.y = y1;

        let temp       = this.cells[y1];
        this.cells[y1] = this.cells[y2];
        this.cells[y2] = temp;
      }
      else {
        let x1 = 1 + Math.floor(Math.random() * this.inner_width);
        let x2 = 1 + Math.floor(Math.random() * this.inner_width);

        for (let row of this.inner_rows()) {
          row[x1].x = x2;
          row[x2].x = x1;

          let temp = row[x1];
          row[x1]  = row[x2];
          row[x2]  = temp;
        }
      }
    }

    return true;
  }

  /**
   * Copy a Markdown table representation of the grid to the clipboard.
   */
  async export_markdown()
  {
    let lines = [];
    lines.push("|".repeat(this.full_width + 1));

    // find column widths
    let column_widths = new Array(this.full_width).fill(3);

    let cell_reprs: string[][] = this.cells.map(
      row => row.entries().map(
        ([x, cell]) => {
          let repr =
              cell.marks.size ? `*${[...cell.marks].join("")}*`
            : cell.fixed      ? `${cell.fixed}`
            : cell.entered    ? `${cell.entered}`
            : ""
          ;

          if (cell.highlight === ThemeCol.RED) {
            repr = `~~${repr}~~`;
          } else if (cell.highlight) {
            repr = `**${repr}**`;
          }

          column_widths[x] = Math.max(column_widths[x], repr.length);

          return repr;
        }
      ).toArray()
    );

    // separator
    let content = Array.from({ length: this.full_width }).map(
      (_, x) => ":".padEnd(column_widths[x], "-")
    );

    lines.push(`| ${content.join(" | ")} |`);

    // rows
    for (let row of cell_reprs) {
      let content = row.entries().map(
        ([x, repr]) => repr.padStart(column_widths[x])
      ).toArray();

      lines.push(`| ${content.join(" | ")} |`);
    }

    // copy
    let markdown = lines.join("\n");

    let item = new ClipboardItem({ "text/plain": markdown });
    await navigator.clipboard.write([item]);

    this.#current?.toasts.push("Copied Markdown");
  }


  // == CLEAR == //

  restart()
  {
    if (!window.confirm(
      `Clear all entered and pencilmarked digits?\n\n(Fixed digits will not be cleared.)`
    )) return;

    this.for_each_cell(cell => {
      cell.entered = null;
      cell.marks.clear();
    });

    this.#current?.toasts.push("Restarted puzzle");
  }

  clear_marks()
  {
    if (!window.confirm(
      `Clear all pencilmarks?\n\n(Fixed and entered digits will not be cleared.)`
    )) return;

    this.for_each_cell(cell => {
      cell.marks.clear();
    });

    this.#current?.toasts.push("Cleared pencilmarks");
  }

  clear_highlights()
  {
    if (!window.confirm(`Clear all highlights?`)) return;

    this.for_each_cell(cell => {
      cell.highlight = null;
    });

    this.#current?.toasts.push("Cleared highlights");
  }

  reset_grid()
  {
    if (!window.confirm(`Reset back to an empty grid?`)) return;

    let { width, height } = get(prefs).lattice;
    this.init(width, height);

    this.#current?.toasts.push("Reset grid");
  }
}
