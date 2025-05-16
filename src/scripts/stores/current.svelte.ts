import { SvelteSet as Set } from "svelte/reactivity";

import { ControlTab } from "#scripts/config";
import type { int, Key, Cell } from "#scripts/types";


class CurrentState
{
  lattice: Lattice = new Lattice();

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

  overlays = new Overlays();
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

class Lattice {
  /** The width of the grid, excluding outer cells. */
  x: int = $state(5);

  /** The height of the grid, excluding outer cells. */
  y: int = $state(5);

  cells: Cells = $state({});
  selected: Set<Cell> = new Set();
}

class Overlays {
  landing: int = $state(3);
  keybinds: boolean = $state(false);
}

interface Cells {
  [cords: string]: Cell;
}

interface Toast {
  id: int;
  text: string;
}


export const current = new CurrentState();
