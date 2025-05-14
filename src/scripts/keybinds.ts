import { current } from "#scripts/stores";


export const keybinds = [
  {
    keys: ["CTRL", "click"],
    desc: "select multiple cells"
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
    keys: ["CTRL", "arrow"],
    desc: "select multiple cells while moving"
  }, {
    keys: ["SPACE", null, "BACKSPACE", null, "DELETE"],
    desc: "clear cell"
  }, {
    keys: ["ALT", "digit"],
    desc: "make mark"
  }, {
    keys: ["ALT", "click", null, "H"],
    desc: "highlight cell"
  }, {
    keys: ["ALT", null, "E"],
    desc: "edit grid"
  }, {
    keys: ["ALT", null, "R"],
    desc: "clear grid"
  }, {
    keys: ["ALT", null, "M"],
    desc: "toggle marking"
  }, {
    keys: ["ALT", null, "N"],
    desc: "show/hide marks"
  }, {
    keys: ["ALT", null, "P"],
    desc: "open Control Pane"
  }, {
    keys: [],
    desc: "highlight all cells with same digit"
  }
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
      if (current.overlays.keybinds) {
        current.overlays.keybinds = false;
        e.stopPropagation();
      }
      break;
  }

  if (!current.held_keys.has("ALT")) return;

  switch (key) {
    case "/":
      current.overlays.keybinds = !current.overlays.keybinds;
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
