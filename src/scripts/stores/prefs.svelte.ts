import { writable } from "svelte/store";

import type { Scalar, Key } from "#scripts/types";


type Theme = "light" | "dark" | "bubblegum";
type Font = "Sora" | "Lora" | "Sniglet";
type MarkMaking = "always" | "auto" | "never";
type MarkAlignment = "center" | "top-left" | "top-right";


export class Prefs
{
  theme: Theme = $state("light");

  /** Settings for keyboard shortcuts and modifier keys. */
  keybinds: KeyPrefs = new KeyPrefs();

  text: TextPrefs = new TextPrefs();

  /** Settings for pencil marks (little digits for noting possible values). */
  marks: MarkPrefs = new MarkPrefs();

  cells: CellPrefs = new CellPrefs();

  /** Gap between main grid and outer lanes. */
  outer_gap: Scalar = $state(0.5);
}

class KeyPrefs
{
  multiselect: Key = "CONTROL";

  /** Modifier key for enabling markmaking when typing into a cell. */
  mark: Key = "SHIFT";
}

class TextPrefs
{
  font: Font = $state("Sora");

  text_size: Scalar = $state(0.5);
}

class MarkPrefs
{
  /**
   * If disabled, typing a digit replaces the digit(s) in that cell.
   *
   * If enabled, typing a digit either adds it to or removes it from the cell. If multiple digits have been added to a cell, they become marks.
   */
  making: MarkMaking = $state("auto");

  align: MarkAlignment = $state("center");

  size: Scalar = $state(0.5);

  opacity: Scalar = $state(0.5);
}

class CellPrefs
{
  size: Scalar = $state(0.5);

  /** Space between cells. */
  gap: Scalar = $state(0.5);

  /** border-radius of cells. */
  rounding: Scalar = $state(0.5);

  /** Opacity of cell outlines. */
  opacity: Scalar = $state(0.5);
}

export const prefs = writable(new Prefs());
