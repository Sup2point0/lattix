import { SvelteSet as Set } from "svelte/reactivity";

import type { int } from "#scripts/types";


class CurrentState
{
  lattice_x: int = 5;
  lattice_y: int = 5;

  lattice_cells: Cells = $state({});

  /** Shards of the currently selected cells. */
  selected_cells: Set<number> = $state(new Set());

  multiselect_enabled = $state(false);
}

interface Cells {
  [cords: string]: HTMLButtonElement;
}


export const current = new CurrentState();
