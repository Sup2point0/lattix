<script lang="ts">

import { prefs } from "#scripts/stores";
import { MarkAlignment } from "#scripts/types";

import Toggle from "#parts/ui/toggle.svelte";
import Slider from "#parts/ui/slider.svelte";
import Options from "#parts/ui/options.svelte";


let marks = $prefs.marks;

</script>


<h2> Marks </h2>

<div>
  <label>
    <section>
      <h4> Auto-Marking </h4>
      <p> Entering more than 1 digit into a cell automatically turns them into pencilmarks. </p>
    </section>

    <Toggle bind:value={marks.auto} />
  </label>
  
  <label style:flex-wrap="wrap">
    <section>
      <h4> Alignment </h4>
      <p> Change how pencilmarks should be positioned inside their cell. </p>
    </section>

    <Options bind:value={marks.align} options={Object.values(MarkAlignment)} />
  </label>

  <label style:flex-wrap="wrap">
    <section>
      <h4> Size </h4>
      <p> Scale the size of pencilmarks relative to solved digits. </p>
    </section>

    <Slider bind:value={marks.size} />
  </label>

  <label style:flex-wrap="wrap">
    <section>
      <h4> Opacity </h4>
      <p> Change how transparent pencilmarks are. </p>
    </section>

    <Slider bind:value={marks.opacity} />
  </label>
</div>


<style lang="scss">

@use './tab-view' as *;

</style>
