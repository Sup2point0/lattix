import { persisted } from "svelte-persisted-store";

import { ThemeCol } from "#scripts/config";
import type { int, scalar } from "#scripts/types";

import { get, writable } from "svelte/store";


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
  /** Settings for default lattice on startup. */
  lattice: LatticePrefs = Object.assign({}, new LatticePrefs())

  cols: ColPrefs = Object.assign({}, new ColPrefs())

  text: TextPrefs = Object.assign({}, new TextPrefs())

  /** Settings for pencilmarks. */
  marks: MarkPrefs = Object.assign({}, new MarkPrefs())

  cells: CellPrefs = Object.assign({}, new CellPrefs())

  grid: GridPrefs = Object.assign({}, new GridPrefs())
}

class LatticePrefs
{
  width: int = 5
  
  height: int = 5
}

class ColPrefs
{
  theme: Theme = Theme.LIGHT

  /** Default colour for highlighting an inner cell. */
  highlight_inner: ThemeCol = ThemeCol.PINK

  /** Default colour for highlighting an outer cell. */
  highlight_outer: ThemeCol = ThemeCol.GREEN

  /** Should lane peaks be automatically highlighted? */
  highlight_peaks: boolean = false

  /** Should conflicting digits in a lane be automatically highlighted? */
  highlight_conflicts: boolean = false

  /** Should the colours of fixed and entered digits be swapped? */
  invert: boolean = false
}

class TextPrefs
{
  font: Font = Font.SORA

  size: scalar = 0.5
}

class MarkPrefs
{
  /**
   * If disabled, pencilmarks can only be added with ALT + digit.
   *
   * If enabled, typing a digit either adds it to or removes it from the cell. If multiple digits have been added to a cell, they become pencilmarks.
   */
  auto: boolean = true

  align: MarkAlignment = MarkAlignment.CENTRE

  size: scalar = 0.5

  opacity: scalar = 1
}

class CellPrefs
{
  size: scalar = 0.5

  /** Space between cells. */
  gap: scalar = 0.5

  /** Gap between main grid and outer lanes. */
  outer_gap: scalar = 0.5  // TODO

  /** `border-radius:` of cells. */
  rounding: scalar = 0.5

  /** Opacity of cell outlines. */
  opacity: scalar = 0.25
}

class GridPrefs
{
  wasd_nav: boolean = false
  
  include_corners: boolean = false

  /** If enabled, navigating the grid with arrow keys will also move to outer cells. */
  nav_outer: boolean = false

  /** Can the grid grow to an infinite size? */
  unlimited: boolean = false
}


/**
 * All of the user's preferences, saved to localStorage.
 */
export const prefs = persisted(
  "lattix.prefs",
  Object.assign({}, new Prefs()),
  {
    serializer: {
      stringify: JSON.stringify,
      parse: data => {
        let out = JSON.parse(data);
        repair_prefs(out);
        return out;
      }
    }
  }
);


/**
 * Has the user modified the preferences from their defaults?
 */
export const prefs_is_dirty = writable(false);

prefs.subscribe(() => {
  prefs_is_dirty.set(true);
})


/**
 * Reset all preferences to their defaults.
 */
export function reset_prefs()
{
  prefs.set(Object.assign({}, new Prefs()));
  prefs_is_dirty.set(false);
}


/**
 * Find any unset categories of preferences (if the user has an older version of `Prefs` in their `localStorage`) and fill them out.
 */
function repair_prefs(prefs: Prefs)
{
  let defaults = new Prefs();

  for (let category in defaults) {
    if (!Object.hasOwn(prefs, category)) {
        // @ts-ignore
        prefs[category] = defaults[category];
    }
    else {
      // @ts-ignore
      for (let option in defaults[category]) {
        // @ts-ignore
        if (!Object.hasOwn(prefs[category], option)) {
          // @ts-ignore
          prefs[category][option] = defaults[category][option]
        }
      }
    }
  }
}
