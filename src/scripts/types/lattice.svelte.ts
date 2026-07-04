import { SvelteSet } from "svelte/reactivity";

import { Cell } from "./cell.svelte.ts";
import type { int, Direction } from "./root";
import type { Toasts } from "./toasts.svelte.ts";


const MIN_SIZE: int = 3;


/**
 * A grid of cells.
 * 
 * The grid has a minimum size of 3x3.
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

  #toasts?: Toasts;


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


  // == ACCESSORS == //

  at(x: int, y: int): Cell | undefined
  {
    return this.cells.at(y)?.at(x);
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


  // == CONSTRUCTORS == //

  init(width: int, height: int, toasts?: Toasts)
  {
    if (width < MIN_SIZE)  width = MIN_SIZE;
    if (height < MIN_SIZE) height = MIN_SIZE;

    this.cells = Array.from({ length: height + 2 },
      (_, y) => Array.from({ length: width + 2 },
        (_, x) => new Cell(x, y)
      )
    );

    this.#toasts = toasts;
  }

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

    const SHUFFLE_ITERATIONS: int = 25;

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


  // == RESIZING == //

  upsize(from: Direction)
  {
    switch (from) {
      case "right":
        // shift rightmost column to make space
        let right_column = this.cells.at(-1)!;
        for (let cell of right_column) {
          cell.x++;
        }

        // let x = this.width + 1;
        // this.cells.splice(x, 0, Array.from({ length: this.height },
        //   (_, y) => new Cell(x, y)
        // ));

        break;
      
      case "left":
        // shift all columns to make space
        for (let column of this.cells.slice(1)) {
          for (let cell of column) {
            cell.x++;
          }
        }

        this.cells.splice(1, 0, Array.from({ length: this.inner_height },
          (_, y) => new Cell(1, y)
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
    }
  }

  downsize()
  {}


  // == CLEAR == //

  clear_work()
  {
    if (window.confirm("Clear all entered and pencilmarked digits?")) {
      this.for_each_cell(cell => {
        cell.entered = null;
        cell.marks.clear();
      });

      this.#toasts?.push("Cleared work");
    }
  }

  clear_marks()
  {
    if (window.confirm("Clear all pencilmarks? (fixed and entered digits will not be cleared.)")) {
      this.for_each_cell(cell => {
        cell.marks.clear();
      });

      this.#toasts?.push("Cleared pencilmarks");
    }
  }

  clear_highlights()
  {
    if (window.confirm("Clear all highlights?")) {
      this.for_each_cell(cell => {
        cell.highlight = null;
      });

      this.#toasts?.push("Cleared highlights");
    }
  }

  clear_all()
  {
    if (window.confirm("Clear all digits in the grid?")) {
      this.for_each_cell(cell => {
        cell.fixed = null;
        cell.entered = null;
        cell.marks.clear();
      });

      this.#toasts?.push("Cleared all");
    }
  }
}
