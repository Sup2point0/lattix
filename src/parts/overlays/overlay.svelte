<!-- @component Overlay

Displays the currently active overlay.
-->

<script lang="ts">

import { current } from "#scripts/stores";
import { Overlay } from "#scripts/config";

import Keybinds from "./keybinds.svelte";
import Changelog from "./changelog.svelte";

import { scale } from "svelte/transition";
import { expoOut, quartOut } from "svelte/easing";

</script>


<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<aside class="overlay-container"
  onclick={() => { current.overlay = null; }}
  transition:scale={{ duration: 500, easing: expoOut, start: 0.97 }}
>
  {#key current.overlay}
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <div class="overlay-content"
      onclick={e => e.stopPropagation()}
      in:scale={{ duration: 500, easing: quartOut, start: 0.97 }}
    >
      {#if current.overlay === Overlay.KEYBINDS}
        <Keybinds />
      {:else if current.overlay === Overlay.CHANGELOG}
        <Changelog />
      {/if}
    </div>
  {/key}
</aside>


<style lang="scss">

aside.overlay-container {
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

.overlay-content {
  width: 80%;
  height: 80%;
  padding: 3rem 5rem;
  overflow-y: auto;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 0 8px $col-grey-light;

  :global(h1) {
    font-weight: 500;
    padding-bottom: 1em;
  }
}

</style>
