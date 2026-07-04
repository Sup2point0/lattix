<script lang="ts">

import { prefs } from "#scripts/stores";

import Toggle from "#parts/ui/toggle.svelte";

</script>


<h2> Cells </h2>

<div>
  <label>
    <section>
      <h4> Include Corner Cells </h4>
      <p> Enable or disable the cells in the 4 corners of the grid. </p>
    </section>

    <Toggle bind:value={$prefs.grid.include_corners} />
  </label>
  
  <label>
    <section>
      <h4> Outer Navigation </h4>
      <p> Arrow keys can navigate to outer cells. </p>
    </section>

    <Toggle bind:value={$prefs.grid.nav_outer} />
  </label>
</div>


<style lang="scss">

@use './tab-view' as *;

</style>
