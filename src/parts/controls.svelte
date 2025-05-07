<!-- @component Controls

The right controls pane for configuring options.
-->

<script lang="ts">

import ControlTab from "#parts/controls.tab.svelte"
</script>


<div class="controls-container">
  <nav>
    <ControlTab tab="controls" text="Controls" />
    <ControlTab tab="text" text="Text" />
    <ControlTab tab="marks" text="Marks" />
    <ControlTab tab="cells" text="Cells" />
  </nav>

  <div class="controls-view">
    The quick brown fox jumps over the lazy dog.
  </div>
</div>


<style lang="scss">

.controls-container {
  height: 100%;
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

.controls-view {
  padding: 1rem;
}

</style>
