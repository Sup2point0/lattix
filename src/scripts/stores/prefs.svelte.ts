import { writable } from "svelte/store";

import type { Scalar, Key } from "#scripts/types";


export enum Theme {
  LIGHT = "light",
  DARK = "dark",
  BUBBLEGUM = "bubblegum",
}

export enum Font
{
  SORA = "Sora",
  LORA = "Lora",
  SNIGLET = "Sniglet",
}

enum MarkAlignment
{
  CENTER = 0,
  TOP_LEFT,
  TOP_RIGHT,
}


export class Prefs
{
  theme: Theme = $state(Theme.LIGHT);

  text: TextPrefs = new TextPrefs();

  /** Settings for pencil marks (little digits for noting possible values). */
  marks: MarkPrefs = new MarkPrefs();

  cells: CellPrefs = new CellPrefs();

  /** Gap between main grid and outer lanes. */
  outer_gap: Scalar = $state(0.5);
}

class TextPrefs
{
  font: Font = $state(Font.SORA);

  text_size: Scalar = $state(0.5);
}

class MarkPrefs
{
  /**
   * If disabled, marks must be added with ALT + digit.
   *
   * If enabled, typing a digit either adds it to or removes it from the cell. If multiple digits have been added to a cell, they become marks.
   */
  auto: boolean = $state(true);

  align: MarkAlignment = $state(0);

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
