export class Keys {
  static readonly Ignored
    = new Set(["CONTROL", "SHIFT", "ALT", "TAB"]);
  
  static readonly Arrows
    = new Set(["ARROWLEFT", "ARROWRIGHT", "ARROWUP", "ARROWDOWN"]);

  static readonly WASD
    = new Set(["W", "A", "S", "D"]);
  
  static readonly Numbers
    = new Set(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);
  
  static readonly Alpha
    = new Set(["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "U", "T", "V", "W", "X", "Y", "Z"]);
  
  static readonly Punct
    = new Set([",", ".", "!", "?", "+", "-", "*", "/", "=", "<", ">", "_", "~", "#", "$", "%"]);
}

export enum Overlay
{
  SYNOPSIS  = "Synopsis",
  CHANGELOG = "Changelog",
  KEYBINDS  = "Keybinds",
}

export enum ControlTab
{
  CORE  = `<span class="material-symbols-rounded">left_click</span>`,
  COLS  = `<span class="material-symbols-rounded">colors</span>`,
  TEXT  = `<span class="material-symbols-rounded">text_fields</span>`,
  MARKS = `<span class="material-symbols-rounded">stylus_note</span>`,
  CELLS = `<span class="material-symbols-rounded">looks_one</span>`,
  GRID  = `<span class="material-symbols-rounded">grid_3x3</span>`,
  EXTRA = `<span class="material-symbols-rounded">more</span>`,
}


export enum ThemeCol
{
  BLUE   = "blue",
  PURP   = "purp",
  PINK   = "pink",
  RED    = "red",
  ORANGE = "orange",
  GREEN  = "green",
  GREY   = "grey-dark",
}

export const HighlightCols = [
  ThemeCol.PINK,
  ThemeCol.RED,
  ThemeCol.ORANGE,
  ThemeCol.GREEN,
  ThemeCol.BLUE,
  ThemeCol.GREY,
]

/** Factors to scale fonts to maintain similar optical size across different typefaces. */
export const FontSizes = {
  Sora:    "100%",
  Lora:    "103%",
  Sniglet: "105%",
}
