<script lang="ts">

import { prefs } from "#scripts/stores";

import Toggle from "#parts/ui/toggle.svelte";

</script>


<h2> Cells </h2>

<div>
  <label>
    <section>
      <h4> WASD navigation </h4>
      <p> Support using <code>W</code><code>A</code><code>S</code><code>D</code> in place of arrow keys for navigating around the grid. </p>
    </section>

    <Toggle bind:value={$prefs.grid.wasd_nav} />
  </label>

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

code {
  padding: 0.4em 0.6em;
  margin: 0 0.1em;
  display: inline-block;
  @include font-code;
  font-size: 80%;
  background: white;
  border: 1px solid $col-grey-light;
  border-radius: 0.5em;
  box-shadow: 0 0.5px 1px $col-grey-light;
}

</style>
