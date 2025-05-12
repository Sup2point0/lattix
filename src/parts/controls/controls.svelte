<!-- @component Controls

The right controls pane for configuring options.
-->

<script module lang="ts">
  
export enum ControlTab
{
  CORE = "Controls",
  TEXT = "Text",
  MARKS = "Marks",
  CELLS = "Cells",
  STATS = "Stats",
}

</script>

<script lang="ts">

import { current } from "#src/scripts/stores";

import Tab from "./tab.svelte";
import Core from "./tabs/core.svelte";
import Text from "./tabs/text.svelte";
import Marks from "./tabs/marks.svelte";
import Cells from "./tabs/cells.svelte";
import Stats from "./tabs/stats.svelte";

</script>


<div class="controls-container">
  <form>
    {#if current.control_tab === ControlTab.CORE}
      <Core />
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
  gap: 1rem;
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
  padding: 1rem;
}

</style>
