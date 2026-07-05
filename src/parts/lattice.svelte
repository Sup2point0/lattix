<!-- @component Lattice

The grid.
-->

<script lang="ts">

import { current, prefs } from "#scripts/stores";
import { interp3 } from "#scripts/utils";

import Cell from "#parts/lattice.cell.svelte";

import { onMount } from "svelte";


let x = $derived(current.lattice.inner_width + 2);
let y = $derived(current.lattice.inner_height + 2);

onMount(() => {
  let { width = 5, height = 5 } = $prefs.lattice;
  current.lattice.init(width, height, current.toasts);
});

</script>


<div class="lattice-container"
  style:gap={current.editing ? "1rem" : "0"}
>
  {#if current.editing}
    <div class="empty"></div>
    <div class="resize row">
      <button class="wipe row" onclick={() => current.lattice.downsize("top")}> - </button>
      <button class="new row" onclick={() => current.lattice.upsize("top")}> + </button>
    </div>
    <div class="empty"></div>
  {/if}
  
  {#if current.editing}
    <div class="resize column">
      <button class="wipe column" onclick={() => current.lattice.downsize("left")}> - </button>
      <button class="new column" onclick={() => current.lattice.upsize("left")}> + </button>
    </div>
  {/if}

  <div class="lattice"
    style:--x={x}
    style:--y={y}
    style:--size="calc(0.7 * 100vh / {Math.max(x, y) + Number(current.editing)})"
    style:--cell-gap={interp3($prefs.cells.gap, { lower: 0, preset: 1, upper: 2 })}
  >
    {#each current.lattice.cells as column}
      {#each column as cell}
        {#if current.lattice.is_corner_cell(cell) && !$prefs.grid.include_corners}
          <div class="empty"></div>
        {:else}
          <Cell {cell} />
        {/if}
      {/each}
    {/each}
  </div>
  
  {#if current.editing}
    <div class="resize column">
      <button class="wipe column" onclick={() => current.lattice.downsize("right")}> - </button>
      <button class="new column" onclick={() => current.lattice.upsize("right")}> + </button>
    </div>
  {/if}

  {#if current.editing}
    <div class="empty"></div>
    <div class="resize row">
      <button class="wipe row" onclick={() => current.lattice.downsize("down")}> - </button>
      <button class="new row" onclick={() => current.lattice.upsize("down")}> + </button>
    </div>
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
  gap: calc(1px + 1rem * var(--cell-gap, 1));
  border-collapse: collapse;
}

.resize {
  justify-self: center;
  align-self: center;
  display: flex;
  justify-content: stretch;
  align-items: stretch;
  gap: 0.5rem;

  &.row {
    width: 50%;
    height: 2rem;
    flex-flow: row nowrap;
  }

  &.column {
    width: 2rem;
    height: 50%;
    flex-flow: column nowrap;
  }
}

.resize button {
  width: 100%;
  height: 100%;
  font-size: 150%;
  border: none;
  border-radius: 0.5rem;
  transition: all 0.1s ease-out;

  &.new {
    color: $col-blue;
    background: color-mix(in oklch, $col-blue, transparent 90%);

    &:hover { background: $col-blue; }
    &:active { background: $col-blue-dark; }
  }

  &.wipe {
    color: $col-red;
    background: color-mix(in oklch, $col-red, transparent 90%);

    &:hover { background: $col-red; }
    &:active { background: color-mix(in oklch, $col-red, black 20%); }
  }

  &.new, &.wipe {
    &:where(:hover, :focus-visible) {
      cursor: pointer;
      color: white;
    }
  }
}

</style>
