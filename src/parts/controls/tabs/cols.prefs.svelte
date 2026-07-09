<script lang="ts">
  
import { prefs } from "#scripts/stores";
import { HighlightCols } from "#scripts/config";

import Toggle from "#parts/ui/toggle.svelte";
import ColourOptions from "#parts/ui/options.cols.svelte";

</script>


<h2> Colours </h2>

<div>
  <label style:flex-wrap="wrap">
    <section>
      <h4> Default Highlight Colour (inner) </h4>
      <p> The default colour to pick when using <code>ALT</code>+<code>click</code> or <code>ALT</code>+<code>H</code> to highlight an <em>inner</em> cell. </p>
    </section>

    <ColourOptions bind:value={$prefs.cols.highlight_inner} cols={HighlightCols} />
  </label>
  
  <label style:flex-wrap="wrap">
    <section>
      <h4> Default Highlight Colour (outer) </h4>
      <p> The default colour to pick when using <code>ALT</code>+<code>click</code> or <code>ALT</code>+<code>H</code> to highlight an <em>outer</em> cell. </p>
    </section>

    <ColourOptions bind:value={$prefs.cols.highlight_outer} cols={HighlightCols} />
  </label>
  
  <label>
    <section>
      <h4> Auto-Highlight Lane Peaks </h4>
      <p> Automatically highlight cells containing an N digit in an N×N square grid. This uses the colour set by <span>Default Highlight Colour (inner)</span>. </p>
    </section>

    <Toggle bind:value={$prefs.cols.highlight_peaks} />
  </label>
  
  <label>
    <section>
      <h4> Auto-Highlight Conflicts </h4>
      <p> Automatically flag cells in the same column or row that have the same digit (which violates the rules of Sudoku-like puzzles). </p>
    </section>

    <Toggle bind:value={$prefs.cols.highlight_conflicts} />
  </label>

  <label>
    <section>
      <h4> Invert Contrast </h4>
      <p> Make fixed digits coloured and entered digits black. </p>
    </section>

    <Toggle bind:value={$prefs.cols.invert} />
  </label>
</div>


<style lang="scss">

@use './tab-view' as *;

</style>
