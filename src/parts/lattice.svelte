<!-- @component Lattice

The grid.
-->

<script lang="ts">

import { prefs } from "#scripts/stores";

import Cell from "#parts/cell.svelte";

interface Props {
  x?: number;
  y?: number;
  cellsize?: string;
}

let { x = 5, y = 5, cellsize = "10vh" }: Props = $props();


let xsize = $derived(5 + $prefs.show.outer * 2);
let ysize = $derived(5 + $prefs.show.outer * 2);

</script>


<div class="lattice-container">
  <div class="empty"></div>
  <button class="new row">+</button>
  <div class="empty"></div>

  <button class="new column">+</button>

  <div class="lattice"
    style:--x={xsize}
    style:--y={ysize}
    style:--size={cellsize}
  >
    {#if $prefs.show.outer}
      <div class="empty"></div>
      {#each { length: x } as _, i}
        <Cell kind="outer" x={i+1} y={0} />
      {/each}
      <div class="empty"></div>
    {/if}

    {#each { length: y } as _, j}
      {#if $prefs.show.outer}
        <Cell kind="outer" x={0} y={j+1} />
      {/if}
      {#each { length: x } as _, i}
        <Cell kind="inner" x={i+1} y={j+1} />
      {/each}
      {#if $prefs.show.outer}
        <Cell kind="outer" x={x+1} y={y+1} />
      {/if}
    {/each}
    
    {#if $prefs.show.outer}
      <div class="empty"></div>
      {#each { length: x } as _, i}
        <Cell kind="outer" x={i+1} y={y+1} />
      {/each}
      <div class="empty"></div>
    {/if}
  </div>
  
  <button class="new column">+</button>

  <div class="empty"></div>
  <button class="new row">+</button>
  <div class="empty"></div>
</div>


<style lang="scss">

.lattice-container {
  width: max-content;
  display: grid;
  grid-template-columns: repeat(3, auto);
  gap: 1rem;
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
