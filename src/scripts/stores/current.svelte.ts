import { SvelteSet as Set } from "svelte/reactivity";

import { ControlTab } from "#parts/controls/controls.svelte";
import type { int, Cell } from "#scripts/types";


class CurrentState
{
  overlays = new Overlays();

  held_keys: Set<string> = new Set();
  any_modkeys: boolean = $derived(
    this.held_keys.has("CONTROL") ||
    this.held_keys.has("ALT") ||
    this.held_keys.has("SHIFT")
  );

  lattice_x: int = $state(5);
  lattice_y: int = $state(5);

  lattice_cells: Cells = $state({});

  /** Shards of the currently selected cells. */
  selected_cells: Set<Cell> = new Set();

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
}

class Overlays {
  landing: int = $state(3);
  keybinds: boolean = $state(false);
}

interface Cells {
  [cords: string]: Cell;
}


export const current = new CurrentState();
