<!-- @component Controls

The right controls pane for configuring options.
-->

<script lang="ts">

import { current } from "#scripts/stores";
import { ControlTab } from "#scripts/config";

import Tab from "./tab.svelte";
import CoreTab from "./tabs/core.svelte";
import ColsTab from "./tabs/cols.svelte";
import TextTab from "./tabs/text.svelte";
import MarksTab from "./tabs/marks.svelte";
import GridTab from "./tabs/grid.svelte";
import CellsTab from "./tabs/cells.svelte";
import StatsTab from "./tabs/stats.svelte";

import { slide, scale } from "svelte/transition";
import { expoOut } from "svelte/easing";

</script>


<div class="controls-container">
  {#if current.show_controls}
    <div transition:slide={{ duration: 500, easing: expoOut, axis: "x" }}>

      {#key current.control_tab}
        <form in:scale={{ duration: 500, easing: expoOut, start: 0.97 }}>
          {#if current.control_tab === ControlTab.CORE}
            <CoreTab />
          {:else if current.control_tab === ControlTab.COLS}
            <ColsTab />
          {:else if current.control_tab === ControlTab.TEXT}
            <TextTab />
          {:else if current.control_tab === ControlTab.MARKS}
            <MarksTab />
          {:else if current.control_tab === ControlTab.GRID}
            <GridTab />
          {:else if current.control_tab === ControlTab.CELLS}
            <CellsTab />
          {:else if current.control_tab === ControlTab.STATS}
            <StatsTab />
          {/if}
        </form>
      {/key}

    </div>
  {/if}
  
  <nav>
    {#each Object.values(ControlTab) as tab}
      <Tab tab={tab} text={tab} />
    {/each}
  </nav>
</div>


<style lang="scss">

.controls-container {
  height: 80%;
  display: flex;
  flex-flow: row nowrap;
  align-items: stretch;
}

nav {
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  gap: 1rem;
}

form {
  min-width: 20vw;
  max-height: 80vh;
  padding: 1rem;
  padding-right: 2rem;
  overflow-y: auto;
  scrollbar-width: thin;
}

</style>
