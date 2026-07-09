import { SvelteSet as Set } from "svelte/reactivity";

import { current } from "#scripts/stores/current.svelte.ts";
import type { ThemeCol } from "../config";
import type { int, key } from "./root";


export class Cell
{
  static shard_counter: int = 0;
  shard: int;

  button: HTMLButtonElement | null = null;
  input: HTMLTextAreaElement | null = null;
  
  x: int;
  y: int;

  /** Is the cell selected? */
  selected: boolean = $derived(current.lattice.selected.has(this));
  
  /** Pre-provided digit in the puzzle. */
  fixed: string | null = $state(null);

  /** A single currently entered value. */
  entered: string | null = $state(null);

  /** Pencilmarked candidates. */
  marks: Set<string> = $state(new Set());

  /** Highlight colour. */
  highlight: ThemeCol | null = $state(null);
  
  constructor(x: int, y: int) {
    Cell.shard_counter++;
    this.shard = Cell.shard_counter;

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

  enter(digit: key | null)
  {
    this.fixed = null;
    this.entered = digit;
    this.marks.clear();
  }

  fix(digit: key | null)
  {
    this.fixed = digit;
    this.entered = null;
    this.marks.clear();
  }
}
