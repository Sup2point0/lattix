import { SvelteSet as Set } from "svelte/reactivity";

import { current } from "../stores";
import type { int } from "./root";


export class Cell
{
  button: HTMLButtonElement | null = null;
  shard: int;
  
  kind: "inner" | "outer";
  x: int;
  y: int;

  /** Whether the cell is focused. */
  focused: boolean = $derived(current.selected_cells.has(this));
  
  /** Whether the cell ctonains digit pre-provided by the puzzle. */
  fixed: boolean = $state(false);

  /** The single digit currently entered in the cell. */
  entered: string | null = $state(null);

  /** The digits marked in the cell. */
  marks: Set<string> = $state(new Set());

  constructor(shard: int, kind: "inner" | "outer", x: int, y: int) {
    this.shard = shard;
    this.kind = kind;
    this.x = x;
    this.y = y;
  }
}
