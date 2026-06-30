import { SvelteSet } from "svelte/reactivity";

import { current } from "#scripts/stores";
import type { int, Cell } from "#scripts/types";


export class Lattice
{
  /** The width of the grid, excluding outer cells. */
  x: int = $state(5);

  /** The height of the grid, excluding outer cells. */
  y: int = $state(5);

  cells: {
    [cords: string]: Cell;
  } = $state({});

  selected: SvelteSet<Cell> = new SvelteSet();


  clear_work()
  {
    if (window.confirm("Clear all entered and pencilmarked digits?")) {
      for (let cell of Object.values(this.cells)) {
        cell.entered = null;
        cell.marks.clear();
      }

      current.add_toast({ text: "Cleared work" });
    }
  }

  clear_marks()
  {
    if (window.confirm("Clear all pencilmarks? (fixed and entered digits will not be cleared.)")) {
      for (let cell of Object.values(this.cells)) {
        cell.marks.clear();
      }

      current.add_toast({ text: "Cleared pencilmarks" });
    }
  }

  clear_highlights()
  {
    if (window.confirm("Clear all highlights?")) {
      for (let cell of Object.values(this.cells)) {
        cell.highlight = null;
      }

      current.add_toast({ text: "Cleared highlights "});
    }
  }

  clear_all()
  {
    if (window.confirm("Clear all digits in the grid?")) {
      for (let cell of Object.values(this.cells)) {
        cell.fixed = null;
        cell.entered = null;
        cell.marks.clear();
      }

      current.add_toast({ text: "Cleared all" });
    }
  }
}
