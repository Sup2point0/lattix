<!-- @component Lattice

The grid.
-->

<script lang="ts">

import { current, prefs } from "#scripts/stores";

import Cell from "#parts/lattice.cell.svelte";


let x = $derived(current.lattice.x +2);
let y = $derived(current.lattice.y +2);

</script>


<div class="lattice-container"
  style:gap={current.editing ? "1rem" : "0"}
>
  {#if current.editing}
    <div class="empty"></div>
    <button class="new row" onclick={() => { current.lattice.y++; }}> + </button>
    <div class="empty"></div>
  {/if}

  {#if current.editing}
    <button class="new column" onclick={() => { current.lattice.x++; }}> + </button>
  {/if}

  <div class="lattice"
    style:--x={x}
    style:--y={y}
    style:--size="calc({$prefs.cells.size} * 1.2 * 100vh / {Math.max(x, y)})"
  >
    <div class="empty"></div>

    {#each { length: current.lattice.x } as _, i}
      <Cell kind="outer" x={i+1} y={0} />
    {/each}

    <div class="empty"></div>

    {#each { length: current.lattice.y } as _, j}
        <Cell kind="outer" x={0} y={j+1} />

      {#each { length: current.lattice.x } as _, i}
        <Cell kind="inner" x={i+1} y={j+1} />
      {/each}

        <Cell kind="outer" x={x+1} y={j+1} />
    {/each}
    
    <div class="empty"></div>

    {#each { length: current.lattice.x } as _, i}
      <Cell kind="outer" x={i+1} y={y+1} />
    {/each}

    <div class="empty"></div>
  </div>
  
  {#if current.editing}
    <button class="new column" onclick={() => { current.lattice.x++; }}> + </button>
  {/if}

  {#if current.editing}
    <div class="empty"></div>
    <button class="new row" onclick={() => { current.lattice.y++; }}> + </button>
    <div class="empty"></div>
  {/if}
</div>


<style lang="scss">

.lattice-container {
  width: max-content;
  display: grid;
  grid-template-columns: repeat(3, auto);
}

.lattice {
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(var(--x), 1fr);
  gap: 1rem;
}

button.new {
  justify-self: center;
  align-self: center;
  background: color-mix(in oklch, $col-blue, transparent 90%);
  border: none;
  border-radius: 0.5rem;

  &.row {
    width: 50%;
    height: 2rem;
  }

  &.column {
    width: 2rem;
    height: 50%;
  }

  &:hover {
    cursor: pointer;
    background: $col-blue;
  }
}

</style>
