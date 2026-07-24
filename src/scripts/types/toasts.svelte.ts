import type { int } from "#scripts/types";


interface Toast {
  id: int;
  text: string;
}


export class Toasts
{
  data: Toast[] = $state([]);

  toast_count: int = 0;

  #clear_toasts_timeout: int = 0;


  /** Push a new toast to the screen. */
  push(toast: string)
  {
    this.toast_count++;

    this.data.push({
      id: this.toast_count,
      text: toast,
    });

    if (this.#clear_toasts_timeout) {
      clearTimeout(this.#clear_toasts_timeout);
    }

    this.#clear_toasts_timeout = setTimeout(() => {
      this.data.splice(0);
    }, 5000);
  }

  delete(toast: Toast)
  {
    let idx = this.data.indexOf(toast);
    
    if (idx !== -1) {
      this.data.splice(idx, 1);
    }
  }
}
