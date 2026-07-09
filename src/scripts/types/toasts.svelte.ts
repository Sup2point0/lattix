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
    this.data.splice(this.data.indexOf(toast), 1);
  }
}
