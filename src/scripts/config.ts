export class Keys
{
  static Ignored = ["CONTROL", "SHIFT", "ALT", "TAB"];
  static Arrows = ["ARROWLEFT", "ARROWRIGHT", "ARROWUP", "ARROWDOWN"];
  static Numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  static Alpha = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "U", "T", "V", "W", "X", "Y", "Z"];
  static Punct = [",", ".", "!", "?", "+", "-", "*", "/", "=", "<", ">", "_", "~", "#", "$", "%"];
}

export enum Overlay
{
  ABOUT,
  CHANGELOG,
  KEYBINDS,
}

export enum ControlTab
{
  CORE = "Controls",
  COLS = "Colours",
  TEXT = "Text",
  MARKS = "Marks",
  CELLS = "Cells",
  STATS = "Stats",
}

export enum TimerState
{
  IDLE,
  TIMING,
  FROZEN,
}

export enum ThemeCol
{
  BLUE = "blue",
  PURP = "purp",
  PINK = "pink",
  RED = "red",
  ORANGE = "orange",
  GREEN = "green",
  
  GREY_LIGHT = "grey-light",
  GREY_DARK = "grey-dark",
}

export const HighlightCols = [
  // ThemeCol.PURP,
  ThemeCol.PINK,
  ThemeCol.RED,
  ThemeCol.ORANGE,
  ThemeCol.GREEN,
  ThemeCol.BLUE,
  // ThemeCol.GREY_LIGHT,
  ThemeCol.GREY_DARK,
]

/** Factors to scale fonts to maintain similar optical size across different typefaces. */
export const FontSizes = {
  Sora: "100%",
  Lora: "103%",
  Sniglet: "105%",
}
