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

  editing = $state(false);
  multiselecting = $derived(this.held_keys.has("CONTROL"));
  marking = $state(false);
  show_marks = $state(true);

  show_controls: boolean = $state(true);
  control_tab: ControlTab = $state(ControlTab.CORE);
}

class Overlays {
  landing: int = $state(3);
  keybinds: boolean = $state(false);
}

interface Cells {
  [cords: string]: HTMLButtonElement;
}


export const current = new CurrentState();
