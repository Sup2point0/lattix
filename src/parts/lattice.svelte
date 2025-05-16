<!-- @component Lattice

The grid.
-->

<script lang="ts">

import { current, prefs } from "#scripts/stores";

import Cell from "#parts/lattice.cell.svelte";

interface Props {
  x: number;
  y: number;
  cellsize?: number;
}

let { x, y, cellsize = $prefs.cells.size }: Props = $props();


let expand = $derived(current.editing ? 2 : 0);
let xsize = $derived(x + expand);
let ysize = $derived(y + expand);

</script>


<div class="lattice-container"
  style:gap={current.editing ? "1rem" : "0"}
>
  {#if current.editing}
    <div class="empty"></div>

    <button class="new row" onclick={() => {
      current.lattice.y++;
    }}>
      +
    </button>

    <div class="empty"></div>
  {/if}

  {#if current.editing}
    <button class="new column" onclick={() => {
      current.lattice.x++;
    }}>
      +
    </button>
  {/if}

  <div class="lattice"
    style:--x={xsize}
    style:--y={ysize}
    style:--size="calc({cellsize} * 100vh / {Math.max(x, y)})"
  >
    {#if current.editing}
      <div class="empty"></div>

      {#each { length: x } as _, i}
        <Cell kind="outer" x={i+1} y={0} />
      {/each}

      <div class="empty"></div>
    {/if}

    {#each { length: y } as _, j}
      {#if current.editing}
        <Cell kind="outer" x={0} y={j+1} />
      {/if}

      {#each { length: x } as _, i}
        <Cell kind="inner" x={i+1} y={j+1} />
      {/each}

      {#if current.editing}
        <Cell kind="outer" x={x+1} y={j+1} />
      {/if}
    {/each}
    
    {#if current.editing}
      <div class="empty"></div>

      {#each { length: x } as _, i}
        <Cell kind="outer" x={i+1} y={y+1} />
      {/each}

      <div class="empty"></div>
    {/if}
  </div>
  
  {#if current.editing}
    <button class="new column" onclick={() => {
      current.lattice.x++;
    }}>
      +
    </button>
  {/if}

  {#if current.editing}
    <div class="empty"></div>

    <button class="new row" onclick={() => {
      current.lattice.y++;
    }}>
      +
    </button>

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
