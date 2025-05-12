<script lang="ts">

import { prefs } from "#scripts/stores";
import { Font } from "#scripts/types";

import Options from "#parts/ui/options.svelte";


let text = $prefs.text;

</script>


<h2> Text </h2>

<label style:flex-wrap="wrap">
  <section>
    <h4> Typeface </h4>
    <p> Change the display font of the interface. </p>
  </section>

  <Options bind:value={text.font} options={Object.values(Font)} />
</label>


<style lang="scss">

@use './tab-view' as *;

</style>
