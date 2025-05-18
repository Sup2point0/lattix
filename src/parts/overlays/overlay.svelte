<!-- @component Overlay

Displays the currently active overlay.
-->

<script lang="ts">

import { current } from "#scripts/stores";
import { Overlay } from "#scripts/config";

import Keybinds from "./keybinds.svelte";

import { scale } from "svelte/transition";
import { expoOut } from "svelte/easing";

</script>


<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<aside class="overlay-container"
  onclick={() => { current.overlay = null; }}
  transition:scale={{ duration: 500, easing: expoOut, start: 0.97 }}
>
  {#if current.overlay === Overlay.KEYBINDS}
    <Keybinds />
  {/if}
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

</style>
