import { SvelteSet as Set } from "svelte/reactivity";

import { ControlTab, Overlay } from "#scripts/config";
import type { int, key } from "#scripts/types";

// NOTE: Separate imports required to avoid circular imports in unit testing
import { Lattice } from "#scripts/types/lattice.svelte.ts";
import { Timer }   from "#scripts/types/timer.svelte.ts";
import { Toasts }  from "#scripts/types/toasts.svelte.ts";


export enum DragMode {
  Selecting,
  Unselecting,
  Highlighting,
  Unhighlighting,
}

export enum MarkMode {
  ALWAYS  = "Always Enabled",
  DEFAULT = "Default",
  NEVER   = "Always Disabled",
}


export class CurrentState
{
  DEBUG: boolean = $state(false);
  
  lattice: Lattice = new Lattice();
  timer:   Timer   = new Timer();
  toasts:  Toasts  = new Toasts();

  held_keys: Set<key> = new Set();
  any_modkeys: boolean = $derived(
    this.held_keys.has("CONTROL")
    || this.held_keys.has("ALT")
    || this.held_keys.has("SHIFT")
  );

  /** Whether dragging the mouse over a cell should select or deselect it. */
  drag_mode: DragMode | null = $state(null);

  /** When enabled, selecting a cell does not deselect other cells. */
  multiselecting = $derived(this.held_keys.has("CONTROL"));

  /** Whether pencilmarks should always or never be made. */
  mark_mode: MarkMode = $state(MarkMode.DEFAULT);

  /** Whether typing a digit should make a pencilmark instead of entering the digit. */
  marking = $derived(
    this.mark_mode === MarkMode.ALWAYS ? true
    : this.mark_mode === MarkMode.NEVER ? false
    : this.held_keys.has("ALT")
  );

  // TODO
  highlighting = $state(false);

  show_marks = $state(true);
  editing = $state(false);

  show_controls: boolean = $state(true);
  control_tab: ControlTab = $state(ControlTab.CORE);
  
  /** Stage of the landing overlay animation. */
  landing: int = $state(5);

  /** Currently shown overlay window. */
  overlay: Overlay | null = $state(null);
}


/** Global object for providing access to the current application state. */
export const current = new CurrentState();
