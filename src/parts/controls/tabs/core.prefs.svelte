<script lang="ts">

import { current, MarkMode } from "#scripts/stores";
import { HighlightCols } from "#scripts/config";

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
      text="Edit Grid"
      text_active="Editing Grid"
      bind:value={current.editing}
    />
    <Tool
      text="Show Pencilmarks"
      text_active="Pencilmarks Shown"
      bind:value={current.show_marks}
    />
  </div>

  <div class="clickies">
    <Clicky square
      hover-text="Rotate Grid (Clockwise)"
      action={() => current.lattice.rotate_clockwise()}
    >
      <span class="material-symbols-rounded"> rotate_right </span>
    </Clicky>
    
    <Clicky square
      hover-text="Rotate Grid (Counter-Clockwise)"
      action={() => current.lattice.rotate_counter_clockwise()}
    >
      <span class="material-symbols-rounded"> rotate_left </span>
    </Clicky>

    <Clicky square
      hover-text="Flip Grid (Horizontal)"
      action={() => current.lattice.flip_horizontal()}
    >
      <span class="material-symbols-rounded"> swap_horiz </span>
    </Clicky>
    
    <Clicky square
      hover-text="Flip Grid (Vertical)"
      action={() => current.lattice.flip_vertical()}
    >
      <span class="material-symbols-rounded"> swap_vert </span>
    </Clicky>
    
    <Clicky square
      hover-text="Transpose Grid"
      action={() => current.lattice.transpose()}
    >
      <span class="material-symbols-rounded"> open_in_full </span>
    </Clicky>
  </div>

  <label style:flex-wrap="wrap">
    <section>
      <h4> Pencilmarking </h4>
    </section>

    <Options bind:value={current.mark_mode} options={Object.values(MarkMode)} />
  </label>
  
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <label
    style:flex-wrap="wrap"
    onclick={() => {
      current.lattice.highlight_selected();
      current.lattice.selected.clear();
    }}
  >
    <section>
      <h4> Highlight </h4>
    </section>

    <ColourOptions
      bind:value={
        () => {
          let cols = new Set(current.lattice.selected.values().map(cell => cell.highlight));
          return (cols.size === 1) ? cols.values().next().value! : null;
        },
        value => {
          for (let cell of current.lattice.selected) {
            cell.highlight = value ?? null;
          }
        }
      }
      cols={[null].concat(HighlightCols)}
      disabled={current.lattice.selected.size === 0}
    />
  </label>

  <div>
    <Clicky text="Clear Work" action={() => current.lattice.clear_work()} />
    <Clicky text="Reset Grid" action={() => current.lattice.reset_grid()} />
    <Clicky text="Clear Pencilmarks" action={() => current.lattice.clear_marks()} />
    <Clicky text="Clear Highlights" action={() => current.lattice.clear_highlights()} />
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

.clickies {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
}

</style>
