import { SvelteSet } from "svelte/reactivity";

import { Cell } from "./cell.svelte.ts";
import type { int, Direction } from "./root";
import type { Toasts } from "./toasts.svelte.ts";


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

  /** x-width of the grid, excluding outer cells. */
  get width(): int {
    return this.cells.length ? (this.cells[0].length - 2) : 0;
  }

  /** y-height of the grid, excluding outer cells. */
  get height(): int {
    return this.cells.length ? (this.cells.length - 2) : 0;
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

  // *iter_rows(): Generator<Cell[]>
  // {
  //   for (let y = 0; y < this.height + 2; y++) {
  //     yield Array.from({ length: this.width + 2 },
  //       (_, x) => this.cells[x][y]
  //     );
  //   }
  // }

  // *enum_rows(): Generator<[int, Cell[]]>
  // {
  //   let i = 0;

  //   for (let row of this.iter_rows()) {
  //     yield [i, row];
  //     i++;
  //   }
  // }

  *iter_inner_cols(): Generator<Cell[]>
  {
    for (let x = 1; x < this.width + 1; x++) {
      yield Array.from({ length: this.height + 2 },
        (_, y) => this.at(x, y)!
      );
    }
  }


  // == CONSTRUCTORS == //

  init(width: int, height: int, toasts?: Toasts)
  {
    this.cells = Array.from({ length: height + 2 },
      (_, y) => Array.from({ length: width + 2 },
        (_, x) => new Cell(x, y)
      )
    );

    this.#toasts = toasts;
  }


  // == QUERY == //

  is_outer_cell(cell: Cell): boolean
  {
    let is_outer_x = (cell.x == 0 || cell.x == this.width + 1);
    let is_outer_y = (cell.y == 0 || cell.y == this.height + 1);

    return is_outer_x || is_outer_y;
  }

  is_corner_cell(cell: Cell): boolean
  {
    let is_upper_left  = (cell.x == 0             && cell.y == 0);
    let is_upper_right = (cell.x == this.width + 1 && cell.y == 0);
    let is_lower_left  = (cell.x == 0             && cell.y == this.height + 1);
    let is_lower_right = (cell.x == this.width + 1 && cell.y == this.height + 1);

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
        let right_column = this.cells.at(-1)!
        for (let cell of right_column) {
          cell.x++;
        }

        let x = this.width + 1;
        this.cells.splice(x, 0, Array.from({ length: this.height },
          (_, y) => new Cell(x, y)
        ));

        break;
      
      case "left":
        // shift all columns to make space
        for (let column of this.cells.slice(1)) {
          for (let cell of column) {
            cell.x++;
          }
        }

        this.cells.splice(1, 0, Array.from({ length: this.height },
          (_, y) => new Cell(1, y)
        ));

        break;

      case "top":
        break;

      case "down":

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
