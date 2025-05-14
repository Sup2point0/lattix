<script lang="ts">

import { current } from "#scripts/stores";
import { ThemeCol } from "#scripts/config";

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
          (current.selected_cells.size === 1) && current.selected_cells.values().next().value!.highlight
          || null
        ),
        (value) => {
          for (let cell of current.selected_cells) {
            cell.highlight = value
          }
        }
      }
      cols={[
        null,
        // ThemeCol.PURP,
        ThemeCol.PINK,
        ThemeCol.RED,
        ThemeCol.ORANGE,
        ThemeCol.GREEN,
        ThemeCol.BLUE,
        // ThemeCol.GREY_LIGHT,
        ThemeCol.GREY_DARK,
      ]}
      disabled={current.selected_cells.size === 0}
    />
  </section>

  <section>
    <Clicky text="Clear Cells" action={() => {
      if (window.confirm("Clear all entered and marked digits?")) {
        for (let cell of Object.values(current.lattice_cells)) {
          cell.entered = null;
          cell.marks.clear();
        }
      }
    }} />
    <Clicky text="Clear Marks Only" action={() => {
      if (window.confirm("Clear all marked digits?")) {
        for (let cell of Object.values(current.lattice_cells)) {
          cell.marks.clear();
        }
      }
    }} />
    <Clicky text="Clear All" action={() => {
      if (window.confirm("Clear all digits from the grid?")) {
        for (let cell of Object.values(current.lattice_cells)) {
          cell.fixed = null;
          cell.entered = null;
          cell.marks.clear();
          cell.highlight = null;
        }
      }
    }} />
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
  gap: 1rem;
  border-top: 1px solid $col-grey-light;
}

</style>
