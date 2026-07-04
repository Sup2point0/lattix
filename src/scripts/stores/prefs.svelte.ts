import { persisted } from "svelte-persisted-store";

import { ThemeCol } from "#scripts/config";
import type { int, Scalar } from "#scripts/types";

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

  grid: GridPrefs = Object.assign({}, new GridPrefs())

  cells: CellPrefs = Object.assign({}, new CellPrefs())
}

class LatticePrefs
{
  width: int = 5
  
  height: int = 5
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
   * If disabled, pencilmarks can only be added with ALT + digit.
   *
   * If enabled, typing a digit either adds it to or removes it from the cell. If multiple digits have been added to a cell, they become pencilmarks.
   */
  auto: boolean = true

  align: MarkAlignment = MarkAlignment.CENTRE

  size: Scalar = 0.5

  opacity: Scalar = 1
}

class GridPrefs
{
  wasd_nav: boolean = false
  
  include_corners: boolean = false

  /** If enabled, navigating the grid with arrow keys will also move to outer cells. */
  nav_outer: boolean = false
}

class CellPrefs
{
  size: Scalar = 0.5

  /** Space between cells. */
  gap: Scalar = 0.5

  /** Gap between main grid and outer lanes. */
  outer_gap: Scalar = 0.5  // TODO

  /** border-radius of cells. */
  rounding: Scalar = 0.5

  /** Opacity of cell outlines. */
  opacity: Scalar = 0.25
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
        console.log(`out =`, out);
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
