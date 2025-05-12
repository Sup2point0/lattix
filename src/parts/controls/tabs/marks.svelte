<script lang="ts">

import { prefs } from "#scripts/stores";

import Toggle from "#parts/ui/toggle.svelte";


let marks = $prefs.marks;

</script>


<h2> Marks </h2>

<div>
  <label>
    <section>
      <h4> Auto-Marking </h4>
      <p> Entering more than 1 digit into a cell automatically turns them into marks. </p>
    </section>

    <Toggle bind:value={marks.auto} />
  </label>
</div>


<style lang="scss">

@use './tab-view' as *;

</style>
