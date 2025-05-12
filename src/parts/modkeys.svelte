<!-- @component ModKeys

Tags for showing which modkeys are active.
-->

<script lang="ts">

import { current } from "#scripts/stores";

</script>


<ul class="modkeys">
  {#if current.held_keys.has("CONTROL")}
    <li class="status" id="ctrl"> CTRL </li>
  {/if}

  {#if current.held_keys.has("ALT")}
    <li class="status" id="alt"> ALT </li>
  {/if}

  {#if current.held_keys.has("SHIFT")}
    <li class="status" id="shift"> SHIFT </li>
  {/if}
</ul>


<style lang="scss">

@use 'sass:color';


ul {
  width: 100%;
  height: 3rem;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  gap: 1rem;
  list-style: none;
}

li.status {
  height: max-content;
  padding: 0.5em 1em;
  display: block;
  border-radius: 0.5em;
  animation: pop-in 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;

  &#ctrl {
    color: $col-blue;
    background: color.change($col-blue, $alpha: 10%);
  }

  &#alt {
    color: $col-purp;
    background: color.change($col-purp, $alpha: 15%);
  }

  &#shift {
    color: $col-red;
    background: color.change($col-red, $alpha: 15%);
  }
}

@keyframes pop-in {
  from {
    transform: scale(0.8);
  }
  to {
    transform: none;
  }
}

</style>
