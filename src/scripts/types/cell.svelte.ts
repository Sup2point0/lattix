import type { int } from "./root";


export class Cell
{
  button: HTMLButtonElement | null = null;
  shard: int;
  
  kind: "inner" | "outer";
  x: int;
  y: int;
  
  fixed: boolean = $state(false);
  entered: string | null = $state(null);
  notes: string[] = $state([]);

  constructor(shard: int, kind: "inner" | "outer", x: int, y: int) {
    this.shard = shard;
    this.kind = kind;
    this.x = x;
    this.y = y;
  }
}
