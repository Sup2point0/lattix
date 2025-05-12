<script lang="ts">

import { prefs } from "#scripts/stores";
import { Font } from "#scripts/types";

import Options from "#parts/ui/options.svelte";
import Slider from "#parts/ui/slider.svelte";


let text = $prefs.text;

</script>


<h2> Text </h2>

<div>
  <label style:flex-wrap="wrap">
    <section>
      <h4> Typeface </h4>
      <p> Change the display font of the interface. </p>
    </section>

    <Options bind:value={text.font} options={Object.values(Font)} />
  </label>

  <label style:flex-wrap="wrap">
    <section>
      <h4> Size </h4>
      <p> Scale the size of entered digits in the grid. </p>
    </section>

    <Slider bind:value={text.size} />
  </label>
</div>


<style lang="scss">

@use './tab-view' as *;

</style>
