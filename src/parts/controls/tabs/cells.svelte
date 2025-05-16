<script lang="ts">

import { prefs } from "#scripts/stores";

import Toggle from "#parts/ui/toggle.svelte";


let cells = $prefs.cells;

</script>


<h2> Cells </h2>

<div>
  <label>
    <section>
      <h4> Outer Navigation </h4>
      <p> Arrow keys can navigate to outer cells. </p>
    </section>

    <Toggle bind:value={cells.nav_outer} />
  </label>
</div>


<style lang="scss">

@use './tab-view' as *;

</style>
