import { SvelteSet as Set } from "svelte/reactivity";

import { ControlTab, Overlay } from "#scripts/config";
import type { int, Key } from "#scripts/types";

import { Lattice } from "#scripts/types";
import { Timer } from "#scripts/types";


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


class CurrentState
{
  lattice: Lattice = new Lattice();
  timer: Timer = new Timer();

  held_keys: Set<Key> = new Set();
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


interface Toast {
  id: int;
  text: string;
}


export const current = new CurrentState();
