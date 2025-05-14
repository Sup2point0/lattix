<script lang="ts">

import { current } from "#scripts/stores";

import Tool from "#parts/ui/tool.svelte";
import ColourOptions from "#parts/ui/options.cols.svelte";
    import { ThemeCol } from "#src/scripts/config";


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
        ThemeCol.GREEN,
        ThemeCol.BLUE,
        // ThemeCol.GREY_LIGHT,
        ThemeCol.GREY_DARK,
      ]}
      disabled={current.selected_cells.size === 0}
    />
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
