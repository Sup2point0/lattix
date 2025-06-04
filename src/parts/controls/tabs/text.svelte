<script lang="ts">

import { prefs } from "#scripts/stores";
import { Font } from "#scripts/types";

import Toggle from "#parts/ui/toggle.svelte";
import Slider from "#parts/ui/slider.svelte";
import Options from "#parts/ui/options.svelte";


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

  <label>
    <section>
      <h4> Invert Contrast </h4>
      <p> Make fixed digits coloured and entered digits black. </p>
    </section>

    <Toggle bind:value={text.invert} />
  </label>
</div>


<style lang="scss">

@use './tab-view' as *;

</style>
