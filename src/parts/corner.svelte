<!-- @component Corner

Help and changelog buttons in the corner of the window.
-->

<script lang="ts">

import { Overlay } from "#scripts/config";
import { current } from "#scripts/stores";

import Clicky from "#parts/ui/clicky.svelte";

</script>


<aside>
  <Clicky text="?" action={() => { current.overlay = Overlay.CHANGELOG }}>
    <span class="material-symbols-rounded" style="
      position: absolute;
      top: 50%;
      left: 50%;
      font-size: 1.25rem;
      transform: translateX(-50%) translateY(-50%);
    ">
      page_info
    </span>
    <div style:padding="0.75em 0.25em"></div>
  </Clicky>
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
