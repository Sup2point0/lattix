import { persisted } from "svelte-persisted-store";

import { ThemeCol } from "../config";
import type { Scalar } from "../types";


export enum Theme {
  LIGHT     = "light",
  DARK      = "dark",
  BUBBLEGUM = "bubblegum",
}

export enum Font
{
  SORA    = "Sora",
  LORA    = "Lora",
  SNIGLET = "Sniglet",
}

const MATERIAL = `span class="material-symbols-rounded" style="transform: translateY(0.15em)"`;

export enum MarkAlignment
{
  CENTRE    = `<${MATERIAL}>fullscreen</span>`,
  TOP_LEFT  = `<${MATERIAL}>arrow_insert</span>`,
  TOP_RIGHT = `<${MATERIAL}>arrow_outward</span>`,
}


export class Prefs
{
  cols: ColPrefs = Object.assign({}, new ColPrefs())

  text: TextPrefs = Object.assign({}, new TextPrefs())

  /** Settings for pencilmarks (little digits for noting possible values). */
  marks: MarkPrefs = Object.assign({}, new MarkPrefs())

  cells: CellPrefs = Object.assign({}, new CellPrefs())
}

class ColPrefs
{
  theme: Theme = Theme.LIGHT

  highlight: ThemeCol = ThemeCol.PINK
}

class TextPrefs
{
  font: Font = Font.SORA

  size: Scalar = 0.5

  invert: boolean = false
}

class MarkPrefs
{
  /**
   * If disabled, marks can only be added with ALT + digit.
   *
   * If enabled, typing a digit either adds it to or removes it from the cell. If multiple digits have been added to a cell, they become marks.
   */
  auto: boolean = true

  align: MarkAlignment = MarkAlignment.CENTRE

  size: Scalar = 0.5

  opacity: Scalar = 1
}

class CellPrefs
{
  /** If enabled, navigating the grid with arrow keys will also move to outer cells. */
  nav_outer: boolean = false

  size: Scalar = 0.5

  /** Space between cells. */
  gap: Scalar = 0.5

  /** Gap between main grid and outer lanes. */
  outer_gap: Scalar = 0.5

  /** border-radius of cells. */
  rounding: Scalar = 0.5

  /** Opacity of cell outlines. */
  opacity: Scalar = 0.25
}

export const prefs = persisted(
  "lattix.prefs",
  Object.assign({}, new Prefs())
);
