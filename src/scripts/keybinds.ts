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
    keys: ["ALT", "digit"],
    desc: "make mark"
  }, {
    keys: ["ALT", "click", null, "H"],
    desc: "highlight cell"
  }, {
    keys: ["SPACE", null, "BACKSPACE", null, "DELETE"],
    desc: "clear cell"
  }, {
    keys: ["E"],
    desc: "edit grid"
  }, {
    keys: ["R"],
    desc: "clear grid"
  }, {
    keys: ["M"],
    desc: "toggle marking"
  }, {
    keys: ["N"],
    desc: "show/hide marks"
  }, {
    keys: ["P"],
    desc: "open Control Pane"
  }, {
    keys: [],
    desc: "highlight all cells with same digit"
  }
];


export function set_keybinds(window: Window)
{
  window?.addEventListener("keydown", e => {
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
      
      case "/":
        current.overlays.keybinds = !current.overlays.keybinds;
        break;
    }

    if (current.any_modkeys) return;

    switch (key) {
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
        current.show_controls = true;
        break;
    }
  });

  window?.addEventListener("keyup", e => {
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
  });
}
