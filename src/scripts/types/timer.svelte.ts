import type { int } from "#scripts/types";


export enum TimerState
{
  IDLE,
  TIMING,
  FROZEN,
}


export class Timer
{
  state: TimerState = $state(TimerState.IDLE);
  
  init:    number | null = $state(null);
  stamp:   number | null = $state(null);
  elapsed: number | null = $state(null);

  interval: int = $state(0);

  start()
  {
    this.state = TimerState.TIMING;
    this.init = Date.now();
    this.stamp = null;

    this.interval = setInterval(() => {
      this.elapsed = Math.round(Date.now() - this.init!);
    }, 500);
  }

  freeze()
  {
    this.state = TimerState.FROZEN;
    this.init = null;
    this.stamp = Date.now();
    clearInterval(this.interval);
  }

  reset()
  {
    if (this.state === TimerState.FROZEN) {
      this.state = TimerState.IDLE;
    }
    this.init = this.init ? Date.now() : null;
    this.stamp = null;
    this.elapsed = null;
  }
}
