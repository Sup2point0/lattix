<!-- @component Overlay

Displays the currently active overlay.
-->

<script lang="ts">

import { current } from "#scripts/stores";
import { Overlay } from "#scripts/config";

import Keybinds from "./keybinds.svelte";

</script>


{#if current.overlay === Overlay.KEYBINDS}
  <Keybinds />
{/if}


<style lang="scss">



</style>
