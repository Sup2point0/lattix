import { current, MarkMode } from "#scripts/stores";
import { Overlay, ControlTab } from "#scripts/config";


export const keybinds = [
  {
    keys: ["ALT", "/"],
    desc: "view keybinds"
  },
  {
    keys: ["ALT", "P"],
    desc: `open/close <strong>Control Pane</strong>`
  },
  {
    keys: ["ALT", "G"],
    desc: "edit grid"
  },
  {},
  {
    keys: [
      "↑", null,
      "←", null,
      "↓", null,
      "→"
    ],
    desc: "move in grid"
  },
  {
    keys: [
      "W", null,
      "A", null,
      "S", null,
      "D"
    ],
    desc: [`move in grid`, `(must be enabled in <strong>Grid</strong> settings)`]
  },
  {
    keys: [
      "HOME", null,
      "ALT", "←"
    ],
    desc: "jump to left edge"
  },
  {
    keys: [
      "END", null,
      "ALT", "→"
    ],
    desc: "jump to right edge"
  },
  {
    keys: [
      "⇧", "HOME", null,
      "ALT", "↑"
    ],
    desc: "jump to top edge"
  },
  {
    keys: [
      "⇧", "END", null,
      "ALT", "↓"
    ],
    desc: "jump to bottom edge"
  },
  {
    keys: ["CTRL", "click"],
    desc: "select multiple cells"
  },
  {
    keys: ["CTRL", "arrow"],
    desc: "select multiple cells while moving"
  },
  {
    keys: ["ALT", "digit"],
    desc: "make mark"
  },
  {
    keys: ["ALT", "click", null, "ALT", "H"],
    desc: "highlight cell"
  },
  {
    keys: ["SPACE", null, "BACKSPACE", null, "DELETE"],
    desc: "clear cell"
  },
  {},
  {
    keys: ["ALT", "R"],
    desc: [`restart`, `(clears entered + pencilmarks)`]
  },
  {
    keys: ["ALT", "SHIFT", "R"],
    desc: [`reset`, `(clears entered + pencilmarks + fixed)`]
  },
  {
    keys: ["ALT", "N"],
    desc: "show/hide pencilmarks"
  },
  {
    keys: ["ALT", "M"],
    desc: "always enable marking"
  },
  {
    keys: ["ALT", "SHIFT", "M"],
    desc: "always disable marking"
  },
  {
    keys: ["ALT", "F"],
    desc: "select all cells with same digit"
  },
  {
    keys: ["ALT", "SHIFT", "F"],
    desc: "highlight all cells with same digit"
  },
  {},
  {
    keys: ["ALT", "="],
    desc: `add new column to right`
  },
  {
    keys: ["ALT", "SHIFT", "="],
    desc: `add new row to below`
  },
  {
    keys: ["ALT", "-"],
    desc: `remove column from right`
  },
  {
    keys: ["ALT", "SHIFT", "-"],
    desc: `remove row from below`
  },
  {},
  {
    keys: ["PAGE UP", null, "PAGE DOWN"],
    desc: `switch Control Pane tabs`
  },
  {
    keys: ["ALT", "Q"],
    desc: `view <strong>Changelog</strong>`
  },
  {
    keys: ["ALT", "K"],
    desc: "enable debug mode"
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
  }
  else {
    current.held_keys.add(key);
  }

  switch (key) {
    case "CONTROL":
      current.multiselecting = true;
      e.stopPropagation();
      return true;
    
    case "ALT":
      e.stopPropagation();
      return true;

    case "ESCAPE":
      if (current.overlay) {
        current.overlay = null;
        e.stopPropagation();
      }
      return true;

    case "PAGEUP": {
      let tabs = Object.values(ControlTab);

      let idx = tabs.indexOf(current.control_tab) - 1;
      if (idx < 0) {
        idx = tabs.length - 1;
      }
      current.control_tab = tabs[idx];

      e.stopPropagation();
      return true;
    }
    case "PAGEDOWN": {
      let tabs = Object.values(ControlTab);

      let idx = tabs.indexOf(current.control_tab) + 1;
      if (idx >= tabs.length) {
        idx = 0;
      }
      current.control_tab = tabs[idx];

      e.stopPropagation();
      return true;
    }
  }

  if (!e.altKey) return false;

  switch (key) {
    case "/": current.overlay = (current.overlay === Overlay.KEYBINDS) ? null : Overlay.KEYBINDS;
      return true;

    case "P": current.show_controls = !current.show_controls;
      return true;

    case "G": current.editing = !current.editing;
      return true;

    case "R": (e.shiftKey ?
              current.lattice.reset_grid()
            : current.lattice.restart());
      return true;

    case "N": current.show_marks = false;
      return true;

    case "M":
      /* NOTE: Not idempotent, we want retriggering to reset to default */
      (e.shiftKey ?
        current.mark_mode = (current.mark_mode === MarkMode.NEVER) ? MarkMode.DEFAULT : MarkMode.NEVER
      : current.mark_mode = (current.mark_mode === MarkMode.ALWAYS) ? MarkMode.DEFAULT : MarkMode.ALWAYS
      );
      return true;

    case "F": (e.shiftKey ?
              current.lattice.highlight_same_as_current()
            : current.lattice.select_same_as_current());
      return true;

    case "=": (e.shiftKey ?
              current.lattice.upsize("down")
            : current.lattice.upsize("right"));
      return true;

    case "-": (e.shiftKey ?
              current.lattice.downsize("down")
            : current.lattice.downsize("right"));
      return true;

    case "Q": current.overlay = (current.overlay === Overlay.CHANGELOG) ? null : Overlay.CHANGELOG;
      return true;

    case "K": current.DEBUG = !current.DEBUG;
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
      break;
      
    case "N":
      if (e.altKey) current.show_marks = true;
      break;
  }
}


/**
 * Clear all held keys when the user leaves the page to avoid bleeding latent keypresses.
 */
export function onblur()
{
  for (let key of current.held_keys) {
    window.dispatchEvent(new KeyboardEvent("keyup", { key }));
  }
}


/**
 * Confirm with the user before closing the page if they have modified any cell.
 */
export function onbeforeunload(e: Event): boolean
{
  for (let cell of current.lattice.iter_cells()) {
    if (cell.fixed || cell.entered || cell.marks.size) {
      e.preventDefault();
      return true;

    }
  }

  return false;
}
