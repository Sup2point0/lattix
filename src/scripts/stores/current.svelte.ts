import { SvelteSet as Set } from "svelte/reactivity";

import { ControlTab, Overlay, TimerState } from "#scripts/config";
import type { int, Key, Cell } from "#scripts/types";


class CurrentState
{
  lattice: Lattice = new Lattice();
  time: Time = new Time();

  held_keys: Set<Key> = new Set();
  any_modkeys: boolean = $derived(
    this.held_keys.has("CONTROL") ||
    this.held_keys.has("ALT") ||
    this.held_keys.has("SHIFT")
  );

  /** When enabled, hovering over a cell selects it (no click is needed). */
  dragselecting = $state(false);

  /** When enabled, selecting a cell does not deselect other cells. */
  multiselecting = $derived(this.held_keys.has("CONTROL"));

  /** When enabled, typing digits always makes a mark instead of entering the digit. */
  marking = $state(false);
  show_marks = $state(true);
  editing = $state(false);

  show_controls: boolean = $state(true);
  control_tab: ControlTab = $state(ControlTab.CORE);
  
  /** Stage of the landing overlay animation. */
  landing: int = $state(5);

  /** The currently shown overlay window. */
  overlay: Overlay | null = $state(null);
  
  toasts: Toast[] = $state([]);
  toast_count: int = 0;
  clear_toasts: int = 0;

  add_toast(toast: Partial<Toast>)
  {
    this.toast_count++;
    toast.id = this.toast_count;
    this.toasts.push(toast as Toast);

    if (this.clear_toasts) {
      clearTimeout(this.clear_toasts);
    }

    this.clear_toasts = setTimeout(() => {
      this.toasts.splice(0);
    }, 5000);
  }
}

class Lattice
{
  /** The width of the grid, excluding outer cells. */
  x: int = $state(5);

  /** The height of the grid, excluding outer cells. */
  y: int = $state(5);

  cells: Cells = $state({});
  selected: Set<Cell> = new Set();
}

class Time
{
  state: TimerState = $state(TimerState.IDLE);
  init: number | null = $state(null);
  stamp: number | null = $state(null);
  elapsed: number | null = $state(null);
  interval: int  = $state(0);

  start()
  {
    this.state = TimerState.TIMING;
    this.init = Date.now();
    this.stamp = null;

    this.interval = setInterval(() => {
      this.elapsed = Math.round(Date.now() - this.init!);
    }, 500);
  }

  freeze()
  {
    this.state = TimerState.FROZEN;
    this.init = null;
    this.stamp = Date.now();
    clearInterval(this.interval);
  }

  reset()
  {
    if (this.state === TimerState.FROZEN) {
      this.state = TimerState.IDLE;
    }
    this.init = this.init ? Date.now() : null;
    this.stamp = null;
    this.elapsed = null;
  }
}

interface Cells {
  [cords: string]: Cell;
}

interface Toast {
  id: int;
  text: string;
}


export const current = new CurrentState();
