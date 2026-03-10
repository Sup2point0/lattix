import { writable } from "svelte/store";

import { ThemeCol } from "../config";
import type { Scalar } from "../types";


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

const MATERIAL = `span class="material-symbols-rounded" style="transform: translateY(0.15em)"`;

export enum MarkAlignment
{
  CENTRE = `<${MATERIAL}>fullscreen</span>`,
  TOP_LEFT = `<${MATERIAL}>arrow_insert</span>`,
  TOP_RIGHT = `<${MATERIAL}>arrow_outward</span>`,
}


export class Prefs
{
  cols: ColPrefs = new ColPrefs();

  text: TextPrefs = new TextPrefs();

  /** Settings for pencilmarks (little digits for noting possible values). */
  marks: MarkPrefs = new MarkPrefs();

  cells: CellPrefs = new CellPrefs();
}

class ColPrefs
{
  theme: Theme = $state(Theme.LIGHT);

  highlight: ThemeCol = $state(ThemeCol.PINK);
}

class TextPrefs
{
  font: Font = $state(Font.SORA);

  size: Scalar = $state(0.5);

  invert: boolean = $state(false);
}

class MarkPrefs
{
  /**
   * If disabled, marks can only be added with ALT + digit.
   *
   * If enabled, typing a digit either adds it to or removes it from the cell. If multiple digits have been added to a cell, they become marks.
   */
  auto: boolean = $state(true);

  align: MarkAlignment = $state(MarkAlignment.CENTRE);

  size: Scalar = $state(0.5);

  opacity: Scalar = $state(1);
}

class CellPrefs
{
  /** If enabled, navigating the grid with arrow keys will also move to outer cells. */
  nav_outer: boolean = $state(false);

  size: Scalar = $state(0.5);

  /** Space between cells. */
  gap: Scalar = $state(0.5);

  /** Gap between main grid and outer lanes. */
  outer_gap: Scalar = $state(0.5);

  /** border-radius of cells. */
  rounding: Scalar = $state(0.5);

  /** Opacity of cell outlines. */
  opacity: Scalar = $state(0.25);
}

export const prefs = writable(new Prefs());
