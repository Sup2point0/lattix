import { SvelteSet as Set } from "svelte/reactivity";

import { current } from "../stores";
import type { ThemeCol } from "../config";
import type { int, Key } from "./root";


export class Cell
{
  shard: int;
  button: HTMLButtonElement | null = null;
  input: HTMLTextAreaElement | null = null;
  
  kind: "inner" | "outer";
  x: int;
  y: int;

  /** Whether the cell is selected. */
  selected: boolean = $derived(current.lattice.selected.has(this));
  
  /** Whether the cell ctonains digit pre-provided by the puzzle. */
  fixed: string | null = $state(null);

  /** The single digit currently entered in the cell. */
  entered: string | null = $state(null);

  /** The digits marked in the cell. */
  marks: Set<string> = $state(new Set());

  /** The highlight colour of the cell. */
  highlight: ThemeCol | null = $state(null);
  
  constructor(shard: int, kind: "inner" | "outer", x: int, y: int) {
    this.shard = shard;
    this.kind = kind;
    this.x = x;
    this.y = y;
  }

  /** Select the cell. */
  select()
  {
    if (!current.multiselecting && current.drag_mode === null) {
      current.lattice.selected.clear();
    }

    current.lattice.selected.add(this);
    current.lattice.selected = current.lattice.selected;

    this.input?.focus();
  }

  /** Trigger a press animation. */
  animate_press()
  {
    this.button?.classList.add("clicked");

    setTimeout(() => {
      this.button?.classList.remove("clicked");
    }, 30);
  }

  enter(digit: Key | null)
  {
    this.fixed = null;
    this.entered = digit;
    this.marks.clear();
  }

  fix(digit: Key | null)
  {
    this.fixed = digit;
    this.entered = null;
    this.marks.clear();
  }
}
