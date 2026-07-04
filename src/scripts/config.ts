export class Keys {
  static readonly Ignored
    = ["CONTROL", "SHIFT", "ALT", "TAB"];
  
  static readonly Arrows
    = ["ARROWLEFT", "ARROWRIGHT", "ARROWUP", "ARROWDOWN"];
  
  static readonly Numbers
    = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  
  static readonly Alpha
    = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "U", "T", "V", "W", "X", "Y", "Z"];
  
  static readonly Punct
    = [",", ".", "!", "?", "+", "-", "*", "/", "=", "<", ">", "_", "~", "#", "$", "%"];
}

export enum Overlay
{
  SYNOPSIS  = "Synopsis",
  CHANGELOG = "Changelog",
  KEYBINDS  = "Keybinds",
}

export enum ControlTab
{
  CORE  = "Controls",
  COLS  = "Colours",
  TEXT  = "Text",
  MARKS = "Marks",
  GRID  = "Grid",
  CELLS = "Cells",
  STATS = "Extras",
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
