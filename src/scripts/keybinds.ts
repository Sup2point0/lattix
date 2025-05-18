import { current } from "./stores";
import { Overlay } from "./config";


export const keybinds = [
  {
    keys: ["ALT", "/"],
    desc: "view keybinds"
  }, {
    keys: [
      "↑", null,
      "←", null,
      "↓", null,
      "→"
    ],
    desc: "move in grid"
  }, {
    keys: [
      "HOME", null,
      "ALT", "←"
    ],
    desc: "jump to left edge of grid"
  }, {
    keys: [
      "END", null,
      "ALT", "→"
    ],
    desc: "jump to cell furthest right"
  }, {
    keys: [
      "⇧", "HOME", null,
      "ALT", "↑"
    ],
    desc: "jump to cell furthest up"
  }, {
    keys: [
      "⇧", "END", null,
      "ALT", "↓"
    ],
    desc: "jump to cell furthest down"
  }, {
    keys: ["CTRL", "click"],
    desc: "select multiple cells"
  }, {
    keys: ["CTRL", "arrow"],
    desc: "select multiple cells while moving"
  }, {
    keys: ["SPACE", null, "BACKSPACE", null, "DELETE"],
    desc: "clear cell"
  }, {
    keys: ["ALT", "digit"],
    desc: "make mark"
  }, {
    keys: ["ALT", "click", null, "ALT", "H"],
    desc: "highlight cell"
  }, {
    keys: ["ALT", "E"],
    desc: "edit grid"
  }, {
    keys: ["ALT", "R"],
    desc: "clear grid"
  }, {
    keys: ["ALT", "M"],
    desc: "toggle marking"
  }, {
    keys: ["ALT", "N"],
    desc: "show/hide marks"
  }, {
    keys: ["ALT", "P"],
    desc: "open Control Pane"
  }, {
    keys: ["ALT", "Q"],
    desc: "view changelog"
  }, {
    keys: [],
    desc: "highlight all cells with same digit"
  },
];


export function set_keybinds(window: Window)
{
  window?.addEventListener("keydown", keydown);
  window?.addEventListener("keyup", keyup);
}


function keydown(e: KeyboardEvent)
{
  let key = e.key.toUpperCase();
  if (current.held_keys.has(key)) {
    e.stopPropagation();
    return;
  } else {
    current.held_keys.add(key);
  }

  switch (key) {
    case "CONTROL":
      current.multiselecting = true;
      e.stopPropagation();
      break;
    
    case "ALT":
      current.marking = true;        
      e.stopPropagation();
      break;

    case "ESCAPE":
      if (current.overlay) {
        current.overlay = null;
        e.stopPropagation();
      }
      break;
  }

  if (!current.held_keys.has("ALT")) return;

  switch (key) {
    case "/":      
      current.overlay = (current.overlay === Overlay.KEYBINDS) ? null : Overlay.KEYBINDS;
      break;
    
    case "E":
      current.editing = !current.editing;
      break;

    case "R":
      alert("This feature hasn’t been implemented yet!");
      break;

    case "M":
      alert("This feature hasn’t been implemented yet!");
      break;

    case "N":
      current.show_marks = false;
      break;

    case "P":
      current.show_controls = !current.show_controls;
      break;

    case "Q":
      current.overlay = (current.overlay === Overlay.CHANGELOG) ? null : Overlay.CHANGELOG;
  }
}


function keyup(e: KeyboardEvent)
{
  let key = e.key.toUpperCase();
  current.held_keys.delete(key);

  switch (key) {
    case "CONTROL":
      current.multiselecting = false;
      break;

    case "ALT":
      current.marking = false;
      break;
    
    case "N":
      current.show_marks = true;
      break;
  }
}


export function onbeforeunload(e: Event): boolean
{
  for (let cell of Object.values(current.lattice.cells)) {
    if (cell.fixed || cell.entered || cell.marks.size) {
      e.preventDefault();
      return true;
    }
  }

  return false;
}
