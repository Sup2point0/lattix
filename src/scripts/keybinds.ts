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
    keys: ["ALT", "G"],
    desc: "edit grid"
  },
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
  // {
  //   keys: [],
  //   desc: "highlight all cells with same digit" TODO
  // },
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
    case "/":      
      current.overlay = (current.overlay === Overlay.KEYBINDS) ? null : Overlay.KEYBINDS;
      e.stopPropagation();
      return true;

    case "P":
      current.show_controls = !current.show_controls;
      e.stopPropagation();
      return true;
    
    case "G":
      current.editing = !current.editing;
      e.stopPropagation();
      return true;

    case "=":
      current.lattice.upsize("right");
      e.stopPropagation();
      return true;

    case "+":
      current.lattice.upsize("down");
      e.stopPropagation();
      return true;

    case "-":
      current.lattice.downsize("right");
      e.stopPropagation();
      return true;

    case "_":
      current.lattice.downsize("down");
      e.stopPropagation();
      return true;

    case "R":
      if (e.shiftKey) {
        current.lattice.reset_grid();
      } else {
        current.lattice.clear_work();
      }
      e.stopPropagation();
      return true;

    case "N":
      current.show_marks = false;
      e.stopPropagation();
      return true;

    case "M":
      /* NOTE: Not idempotent, we want retriggering to reset to default */
      if (e.shiftKey) {
        current.mark_mode = (current.mark_mode === MarkMode.NEVER) ? MarkMode.DEFAULT : MarkMode.NEVER;
      } else {
        current.mark_mode = (current.mark_mode === MarkMode.ALWAYS) ? MarkMode.DEFAULT : MarkMode.ALWAYS;
      }
      e.stopPropagation();
      return true;

    case "Q":
      current.overlay = (current.overlay === Overlay.CHANGELOG) ? null : Overlay.CHANGELOG;
      e.stopPropagation();
      return true;

    case "K":
      current.DEBUG = !current.DEBUG;
      e.stopPropagation();
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
      e.stopPropagation();
      return true;

    case "ALT":
      e.stopPropagation();
      return true;
    
    case "N":
      current.show_marks = true;
      e.stopPropagation();
      return true;
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
  for (let cell of Object.values(current.lattice.cells)) {
    if (cell.fixed || cell.entered || cell.marks.size) {
      e.preventDefault();
      return true;
    }
  }

  return false;
}
