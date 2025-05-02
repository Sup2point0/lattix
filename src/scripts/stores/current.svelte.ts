import { Cell } from "#scripts/types";


class CurrentState
{
  cell: Cell | null = null;
  cell_button: HTMLElement | null = null;
}


export const current = new CurrentState();
