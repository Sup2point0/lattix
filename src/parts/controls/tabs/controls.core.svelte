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
  <section class="core">
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
      <section>
        <Clicky square hover="Rotate Grid (Clockwise)" action={() => current.lattice.rotate_clockwise()}>
          <span class="material-symbols-rounded"> rotate_right </span>
        </Clicky>
        
        <Clicky square hover="Rotate Grid (Counter-Clockwise)" action={() => current.lattice.rotate_counter_clockwise()}>
          <span class="material-symbols-rounded"> rotate_left </span>
        </Clicky>

        <Clicky square hover="Flip Grid (Horizontal)" action={() => current.lattice.flip_horizontal()}>
          <span class="material-symbols-rounded"> swap_horiz </span>
        </Clicky>
        
        <Clicky square hover="Flip Grid (Vertical)" action={() => current.lattice.flip_vertical()}>
          <span class="material-symbols-rounded"> swap_vert </span>
        </Clicky>
        
        <Clicky square hover="Transpose Grid" action={() => current.lattice.transpose()}>
          <span class="material-symbols-rounded"> open_in_full </span>
        </Clicky>
      </section>
      
      <section>
        <Clicky square hover="Restart" action={() => current.lattice.restart()}>
          <span class="material-symbols-rounded"> refresh </span>
        </Clicky>
        
        <Clicky square hover="Clear Pencilmarks" action={() => current.lattice.clear_marks()}>
          <span class="material-symbols-rounded"> reset_wrench </span>
        </Clicky>
        
        <Clicky square hover="Clear Highlights" action={() => current.lattice.clear_highlights()}>
          <span class="material-symbols-rounded"> reset_colors </span>
        </Clicky>
        
        <Clicky square hover="Reset Grid" action={() => current.lattice.reset_grid()}>
          <span class="material-symbols-rounded"> reset_focus </span>
        </Clicky>
      </section>
    </div>
  </section>
  
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

  <label style:flex-wrap="wrap">
    <section>
      <h4> Pencilmarking </h4>
    </section>

    <Options bind:value={current.mark_mode} options={Object.values(MarkMode)} />
  </label>
</div>


<style lang="scss">

@use './tab-view' as *;


section.core {
  padding-top: 2rem;
  margin-top: 2rem;
  border-top: 1px solid $col-grey-light;
}

.tools {
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: stretch;
  gap: 0.5rem;
}

.clickies {
  margin-top: 1.5rem;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;

  section {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    gap: 0.5rem;
  }
}

</style>
