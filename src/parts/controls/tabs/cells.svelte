<script lang="ts">

import { prefs } from "#scripts/stores";

import Toggle from "#parts/ui/toggle.svelte";
import Slider from "#parts/ui/slider.svelte";

</script>


<h2> Cells </h2>

<div>
  <label>
    <section>
      <h4> Outer Navigation </h4>
      <p> Arrow keys can navigate to outer cells. </p>
    </section>

    <Toggle bind:value={$prefs.cells.nav_outer} />
  </label>

  <label style:flex-wrap="wrap">
    <section>
      <h4> Size </h4>
      <p> Scale the size of grid cells. </p>
    </section>

    <Slider bind:value={$prefs.cells.size} />
  </label>

  <label style:flex-wrap="wrap">
    <section>
      <h4> Gap </h4>
      <p> Scale the size of the gap between adjacent cells. </p>
    </section>

    <Slider bind:value={$prefs.cells.gap} />
  </label>

  <label style:flex-wrap="wrap">
    <section>
      <h4> Rounding </h4>
      <p> Change how rounded the corners of cells are. </p>
    </section>

    <Slider bind:value={$prefs.cells.rounding} />
  </label>

  <label style:flex-wrap="wrap">
    <section>
      <h4> Opacity </h4>
      <p> Change how transparent the cell borders are. </p>
    </section>

    <Slider bind:value={$prefs.cells.opacity} />
  </label>
</div>


<style lang="scss">

@use './tab-view' as *;

</style>
