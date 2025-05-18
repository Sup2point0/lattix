<!-- @component Corner

Help and changelog buttons in the corner of the window.
-->

<script lang="ts">

import { Overlay } from "#scripts/config";
import { current } from "#scripts/stores";

import Clicky from "#parts/ui/clicky.svelte";

</script>


<aside>
  <Clicky text="?" action={() => { current.overlay = Overlay.CHANGELOG }} />
</aside>


<style lang="scss">

aside {
  position: fixed;
  top: 1rem;
  right: 1rem;
  display: flex;
  flex-flow: column nowrap;
  align-items: end;
}

</style>
