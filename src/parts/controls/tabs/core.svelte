<script lang="ts">

import { current } from "#scripts/stores";
import { HighlightCols } from "#scripts/config";
import { MarkMode } from "#scripts/types";

import Tool from "#parts/ui/tool.svelte";
import Clicky from "#parts/ui/clicky.svelte";
import Options from "#parts/ui/options.svelte";
import ColourOptions from "#parts/ui/options.cols.svelte";


</script>


<h2> Control Pane </h2>

<div>
  <div class="tools">
    <Tool
      text="Select Multiple"
      text_active="Selecting Multiple"
      bind:value={current.multiselecting}
    />

    <Tool
      text="Make Pencilmarks"
      text_active="Pencilmarking"
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
  </div>

  <label style:flex-wrap="wrap">
    <section>
      <h4> Pencilmarking </h4>
    </section>

    <Options bind:value={current.mark_mode} options={Object.values(MarkMode)} />
  </label>

  <div>
    <ColourOptions
      bind:value={
        () => {
          let cols = new Set(current.lattice.selected.values().map(cell => cell.highlight));
          return (cols.size === 1) ? cols.values().next().value! : undefined;
        },
        value => {
          for (let cell of current.lattice.selected) {
            cell.highlight = value;
          }
        }
      }
      cols={[null].concat(HighlightCols)}
      disabled={current.lattice.selected.size === 0}
    />
  </div>

  <div>
    <Clicky text="Clear Work" action={current.lattice.clear_work} />
    <Clicky text="Clear All" action={current.lattice.clear_all} />
    <Clicky text="Clear Pencilmarks" action={current.lattice.clear_marks} />
    <Clicky text="Clear Highlights" action={current.lattice.clear_highlights} />
    <!-- <Clicky text="New" action={() => {
      if (window.confirm("Reset the grid?")) {
        alert("This feature hasn’t been implemented yet!");
      }
    }} /> -->
  </div>
</div>


<style lang="scss">

@use './tab-view' as *;


div > div {
  padding-top: 2rem;
  margin-top: 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: stretch;
  gap: 0.5rem;
  border-top: 1px solid $col-grey-light;
}

</style>
