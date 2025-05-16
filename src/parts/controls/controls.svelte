<!-- @component Controls

The right controls pane for configuring options.
-->

<script lang="ts">

import { current } from "#src/scripts/stores";
import { ControlTab } from "#scripts/config";

import Tab from "./tab.svelte";
import Core from "./tabs/core.svelte";
import Cols from "./tabs/cols.svelte";
import Text from "./tabs/text.svelte";
import Marks from "./tabs/marks.svelte";
import Cells from "./tabs/cells.svelte";
import Stats from "./tabs/stats.svelte";

import { slide, scale } from "svelte/transition";
import { expoOut } from "svelte/easing";

</script>


<div class="controls-container">
  {#if current.show_controls}
    <div transition:slide={{ duration: 500, easing: expoOut, axis: "x" }}>
    {#key current.control_tab}
      <form in:scale={{ duration: 500, easing: expoOut, start: 0.97 }}>
        {#if current.control_tab === ControlTab.CORE}
          <Core />
        {:else if current.control_tab === ControlTab.COLS}
          <Cols />
        {:else if current.control_tab === ControlTab.TEXT}
          <Text />
        {:else if current.control_tab === ControlTab.MARKS}
          <Marks />
        {:else if current.control_tab === ControlTab.CELLS}
          <Cells />
        {:else if current.control_tab === ControlTab.STATS}
          <Stats />
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
  margin-right: 1rem;
  overflow-y: auto;
}

</style>
