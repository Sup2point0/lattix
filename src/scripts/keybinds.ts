import { current } from "#scripts/stores";


export function set_keybinds(window: Window)
{
  window?.addEventListener("keydown", e => {
    let key = e.key.toUpperCase();

    switch (key) {
      case "CONTROL":
        current.modkeys.ctrl = true;
        current.multiselecting = true;
        break;

      case "SHIFT":
        current.modkeys.shift = true;
        break;

      case "ALT":
        current.modkeys.alt = true;
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

    if (current.modkeys.any) return;

    switch (key) {
      case "E":
        current.editing = !current.editing;
        break;

      case "R":
        current.show_marks = false;
        break;
    }
  });

  window?.addEventListener("keyup", e => {
    let key = e.key.toUpperCase();

    switch (key) {
      case "CONTROL":
        current.modkeys.ctrl = false;
        current.multiselecting = false;
        break;

      case "SHIFT":
        current.modkeys.shift = false;
        break;

      case "ALT":
        current.modkeys.alt = false;
        break;

      case "R":
        current.show_marks = true;
        break;
    }
  });
}
