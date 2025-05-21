<script lang="ts">

import { current } from "#scripts/stores";
import { HighlightCols } from "#scripts/config";

import Tool from "#parts/ui/tool.svelte";
import Clicky from "#parts/ui/clicky.svelte";
import ColourOptions from "#parts/ui/options.cols.svelte";


</script>


<h2> Control Pane </h2>

<div>
  <section class="tools">
    <Tool
      text="Select Multiple"
      text_active="Selecting Multiple"
      bind:value={current.multiselecting}
    />

    <Tool
      text="Marks Only"
      text_active="Marking"
      bind:value={current.marking}
    />

    <Tool
      text="Show Marks"
      text_active="Marks Shown"
      bind:value={current.show_marks}
    />

    <Tool
      text="Edit Grid"
      text_active="Editing Grid"
      bind:value={current.editing}
    />
  </section>

  <section>
    <ColourOptions
      bind:value={
        () => (
          (current.lattice.selected.size === 1) && current.lattice.selected.values().next().value!.highlight
          || null
        ),
        (value) => {
          for (let cell of current.lattice.selected) {
            cell.highlight = value;
          }
        }
      }
      cols={[null].concat(HighlightCols)}
      disabled={current.lattice.selected.size === 0}
    />
  </section>

  <section>
    <Clicky text="Clear Work" action={current.lattice.clear_work} />
    <Clicky text="Clear Marks Only" action={current.lattice.clear_marks} />
    <Clicky text="Clear All" action={current.lattice.clear_all} />
    <Clicky text="New" action={() => {
      if (window.confirm("Reset the grid?")) {
        alert("This feature hasn’t been implemented yet!");
      }
    }} />
  </section>
</div>


<style lang="scss">

@use './tab-view' as *;


section {
  padding-top: 2rem;
  margin-top: 2rem;
  display: flex;
  flex-flow: column nowrap;
  align-items: start;
  gap: 0.5rem;
  border-top: 1px solid $col-grey-light;
}

</style>
