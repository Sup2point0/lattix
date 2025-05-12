<!-- @component Controls

The right controls pane for configuring options.
-->

<script module lang="ts">
  
export enum ControlTab
{
  CORE = 0, TEXT, MARKS, CELLS
}

</script>

<script lang="ts">

import { current } from "#src/scripts/stores";

import Tab from "./tab.svelte";
import Core from "./tabs/text.svelte";
import Text from "./tabs/text.svelte";
import Marks from "./tabs/marks.svelte";
import Cells from "./tabs/text.svelte";

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
    {/if}
  </form>
  
  <nav>
    <Tab tab={ControlTab.CORE} text="Controls" />
    <Tab tab={ControlTab.TEXT} text="Text" />
    <Tab tab={ControlTab.MARKS} text="Marks" />
    <Tab tab={ControlTab.CELLS} text="Cells" />
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
  padding: 1rem;
}

</style>
