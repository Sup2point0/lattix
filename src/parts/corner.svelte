<!-- @component Corner

Help and changelog buttons in the corner of the window.
-->

<script lang="ts">

import { Overlay } from "#scripts/config";
import { current } from "#scripts/stores";

import Clicky from "#parts/ui/clicky.svelte";

</script>


<aside>
  <Clicky square text="?" hover="Help" action={() => { current.overlay = Overlay.SYNOPSIS; }}>
    <div style:transform="scale(125%) translateY(0.02em)">?</div>
  </Clicky>

  <Clicky square hover={["Keybinds", "ALT /"]} action={() => { current.overlay = Overlay.KEYBINDS; }}>
    <span class="material-symbols-rounded" style="
      position: absolute;
      top: 50%;
      left: 50%;
      font-size: 1.25rem;
      font-variation-settings: 'wght' 350;
      transform: translateX(-50%) translateY(-50%);
    ">
      keyboard_command_key
    </span>
    <div style:padding="0.75em 0.25em"></div>
  </Clicky>

  <Clicky square hover={["Changelog", "ALT Q"]} action={() => { current.overlay = Overlay.CHANGELOG; }}>
    <span class="material-symbols-rounded" style="
      position: absolute;
      top: 50%;
      left: 50%;
      font-size: 1.25rem;
      font-variation-settings: 'wght' 400;
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
  flex-flow: row nowrap;
  align-items: stretch;
  gap: 0.5rem;
}

</style>
