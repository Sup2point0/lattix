<!-- @component Keybinds

An overlay showing the available keybinds.
-->

<script lang="ts">
  
import { keybinds } from "#scripts/keybinds";

</script>


<h1> Keybinds </h1>
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


<style lang="scss">

table {
  margin-top: 3rem;
  font-size: 100%;
  border-collapse: collapse;
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
