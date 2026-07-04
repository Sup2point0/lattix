<script lang="ts">
  
import { prefs } from "#scripts/stores";
import { HighlightCols } from "#scripts/config";

import ColourOptions from "#parts/ui/options.cols.svelte";

</script>


<h2> Colours </h2>

<div>
  <label style:flex-wrap="wrap">
    <section>
      <h4> Default Highlight Colour </h4>
      <p> The default colour to pick when using ALT+click or ALT+H </p>
    </section>

    <ColourOptions bind:value={$prefs.cols.highlight} cols={HighlightCols} />
  </label>
</div>


<style lang="scss">

@use './tab-view' as *;

</style>
