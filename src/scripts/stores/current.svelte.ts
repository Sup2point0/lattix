import { SvelteSet as Set } from "svelte/reactivity";

import type { int } from "#scripts/types";


class CurrentState
{
  modkeys = new ModifierKeys();

  lattice_x: int = $state(5);
  lattice_y: int = $state(5);

  lattice_cells: Cells = $state({});

  /** Shards of the currently selected cells. */
  selected_cells: Set<number> = $state(new Set());

  editing = $state(false);
  multiselecting = $state(false);

  control_tab: string | null = $state(null);
}

class ModifierKeys {
  ctrl: boolean = $state(false);
  shift: boolean = $state(false);
  alt: boolean = $state(false);
}

interface Cells {
  [cords: string]: HTMLButtonElement;
}


export const current = new CurrentState();
