<script lang="ts">

import { current } from "#scripts/stores";
import { TimerState } from "#scripts/config";
import type { int } from "#scripts/types";

import Clicky from "#parts/ui/clicky.svelte";

import { onMount } from "svelte";


let elapsed: int | null = $state(null);

onMount(() => {
  update_elapsed();

  let interval = setInterval(update_elapsed, 500);

  return () => {
    clearInterval(interval);
  }
});


function update_elapsed()
{
  if (current.time_start) {
    elapsed = Math.round(Date.now() - current.time_start);
  } else {
    elapsed = null;
  }
}

function display_time(t: int | null): string
{
  if (t === null || t === undefined) {
    t = 0;
  }

  let s = Math.round(t / 1000);
  let hours = Math.floor(s / 3600);
  let minutes = Math.floor(s / 60) % 60;
  let seconds = s % 60;

  return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

</script>


<h2> Stats </h2>

<div>
  <section>
    <div class="row">
      <h4> Timer </h4>

      <p>
        {display_time(current.time.elapsed)}
      </p>
    </div>
    
    <div>
      <div class="row" style:justify-content="start">
        <Clicky text={current.time.state === TimerState.IDLE ? "Start Timer" : "Stop Timer"}
          action={() => {
            if (current.time.state === TimerState.IDLE) {
              current.time.start();
            } else {
              current.time.freeze();
            }
          }}
          disabled={current.time.state === TimerState.FROZEN}
        />
        
        <Clicky text="Reset Timer"
          action={() => {
            current.time.reset();
            current.add_toast({ text: "Timer reset" });
          }}
        />
      </div>
    </div>
  </section>

  <section>
    <div class="row">
      <h4> Outer Cells </h4>
      <p> {Object.values(current.lattice.cells).filter(cell => cell.kind === "outer" && cell.fixed).length} </p>
    </div>
    
    <div class="row">
      <h4> Fixed Cells </h4>
      <p> {Object.values(current.lattice.cells).filter(cell => cell.kind === "inner" && cell.fixed).length} </p>
    </div>
  </section>
</div>


<style lang="scss">

@use './tab-view' as *;


section {
  padding-top: 2rem;
  margin-top: 2rem;
  display: flex;
  flex-flow: column nowrap;
  align-items: start;
  gap: 0.5rem;
  border-top: 1px solid $col-grey-light;
}

.row {
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  gap: 0.5rem;
}

</style>
