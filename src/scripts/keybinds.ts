import { current } from "#scripts/stores";


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
      case "ALT":
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
      case "N":
        current.show_marks = true;
        break;
    }
  });
}
