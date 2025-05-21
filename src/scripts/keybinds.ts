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


export function keydown(e: KeyboardEvent): boolean
{
  let key = e.key.toUpperCase();
  if (current.held_keys.has(key)) {
    e.stopPropagation();
    return false;
  } else {
    current.held_keys.add(key);
  }

  switch (key) {
    case "CONTROL":
      current.multiselecting = true;
      e.stopPropagation();
      return true;
    
    case "ALT":
      current.marking = true;        
      e.stopPropagation();
      return true;

    case "ESCAPE":
      if (current.overlay) {
        current.overlay = null;
        e.stopPropagation();
      }
      return true;
  }

  if (!e.altKey) return false;

  switch (key) {
    case "/":      
      current.overlay = (current.overlay === Overlay.KEYBINDS) ? null : Overlay.KEYBINDS;
      return true;
    
    case "E":
      current.editing = !current.editing;
      return true;

    case "R":
      current.lattice.clear_work();
      return true;

    case "M":
      alert("This feature hasn’t been implemented yet!");
      return true;

    case "N":
      current.show_marks = false;
      return true;

    case "P":
      current.show_controls = !current.show_controls;
      return true;

    case "Q":
      current.overlay = (current.overlay === Overlay.CHANGELOG) ? null : Overlay.CHANGELOG;
      return true;
  }

  return false;
}


function keyup(e: KeyboardEvent)
{
  let key = e.key.toUpperCase();
  current.held_keys.delete(key);

  switch (key) {
    case "CONTROL":
      current.multiselecting = false;
      return true;

    case "ALT":
      current.marking = false;
      return true;
    
    case "N":
      current.show_marks = true;
      return true;
  }
}


export function onblur()
{
  for (let key of current.held_keys) {
    window.dispatchEvent(new KeyboardEvent("keyup", { key }));
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
