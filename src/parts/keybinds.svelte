<!-- @component Keybinds

An overlay showing the available keybinds.
-->

<script lang="ts">
  
import { scale } from "svelte/transition";
import { expoOut } from "svelte/easing";


const keybinds = [
  {
    keys: ["CTRL", "click"],
    desc: "select multiple cells"
  }, {
    keys: [
      "UP", null,
      "LEFT", null,
      "DOWN", null,
      "RIGHT"
    ],
    desc: "move in grid"
  }, {
    keys: [
      "HOME", null,
      "ALT", "LEFT"
    ],
    desc: "jump to left edge of grid"
  }, {
    keys: [
      "END", null,
      "ALT", "RIGHT"
    ],
    desc: "jump to cell furthest right"
  }, {
    keys: [
      "SHIFT", "HOME", null,
      "ALT", "UP"
    ],
    desc: "jump to cell furthest up"
  }, {
    keys: [
      "SHIFT", "END", null,
      "ALT", "DOWN"
    ],
    desc: "jump to cell furthest down"
  }, {
    keys: ["CTRL", "ARROW"],
    desc: "select multiple cells while moving"
  },
];

</script>


<aside class="keybinds-container"
  transition:scale={{ duration: 500, easing: expoOut, start: 0.97 }}
>
  <div class="keybinds">
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
                <code> {key} </code>
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
    padding-bottom: 0.5em;
  }

  table {
    margin-top: 2rem;
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
  padding: 0.25em 0.5em;
  margin: 0 0.1em;
  font-family: unset;
  font-size: 90%;
  background: white;
  border: 1px solid $col-grey-light;
  border-radius: 0.5em;
}

span.separator {
  padding: 0 0.25em;
  color: $col-grey-dark;
}

</style>
