<!-- @component Keybinds

An overlay showing the available keybinds.
-->

<script lang="ts">
  
import { current } from "#scripts/stores";
import { keybinds } from "#scripts/keybinds";

import { scale } from "svelte/transition";
import { expoOut } from "svelte/easing";

</script>


<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<aside class="keybinds-container"
  onclick={() => { current.overlays.keybinds = false; }}
  transition:scale={{ duration: 500, easing: expoOut, start: 0.97 }}
>
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <div class="keybinds"
    onclick={e => e.stopPropagation()}
  >
    <h2> Keybinds </h2>
    <p> Keybinds to help you ever more optimise your workflow. Hopefully they should be pretty intuitive! </p>
    
    <table><tbody>
      {#each keybinds as keybind}
        <tr>
          <th>
            {#each keybind.keys as key}
              {#if key === null}
                <span class="separator">/</span>
              {:else}
                <code> {@html key} </code>
              {/if}
            {/each}
          </th>
          <td> {keybind.desc} </td>
        </tr>
      {/each}
    </tbody></table>
  </div>
</aside>


<style lang="scss">

aside.keybinds-container {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
}

.keybinds {
  width: 80%;
  height: 80%;
  padding: 3rem 5rem;
  overflow-y: auto;
  background: light-dark(white, black);
  border-radius: 1rem;
  box-shadow: 0 0 8px $col-grey-light;

  h2 {
    font-weight: 500;
    padding-bottom: 1em;
  }

  table {
    margin-top: 3rem;
    font-size: 100%;
    border-collapse: collapse;
  }
}

tr {
  border-top: 1px solid $col-grey-light;
  border-bottom: 1px solid $col-grey-light;
}

th {
  padding: 1.5rem 2rem 1.5rem 0;
  margin: 0;
  font-weight: normal;
  text-align: left;
}

td {
  width: 100%;
  padding: 0 2rem;
  margin: 0;
}

code {
  padding: 0.4em 0.6em;
  margin: 0 0.1em;
  @include font-code;
  font-size: 90%;
  background: white;
  border: 1px solid $col-grey-light;
  border-radius: 0.5em;
  box-shadow: 0 0.5px 1px $col-grey-light;
}

span.separator {
  padding: 0 0.5em;
  color: $col-grey-dark;
}

</style>
