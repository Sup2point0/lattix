<script lang="ts">

import "#styles/essence.scss";

import { current, prefs } from "#scripts/stores";

import Lattice from "#parts/lattice.svelte";
import Controls from "#parts/controls.svelte";

import { onMount } from "svelte";


const modifier_keys = ["Control", "Shift", "Alt"];

onMount(() => {
  window?.addEventListener("keydown", e => {
    if (e.key === $prefs.keybinds.multiselect) {
      current.multiselecting = true;
    }
  });

  window?.addEventListener("keyup", e => {
    if (e.key === $prefs.keybinds.multiselect) {
      current.multiselecting = false;
    }
  })
})

</script>


<main
  style:--font="Sora"
>
  <div class="layout">
    <Lattice x={current.lattice_x} y={current.lattice_y} />

    <Controls />
  </div>
</main>


<style lang="scss">

main {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  padding: 1rem;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  background: var(--col-back);
}

.layout {
  width: max-content;
  padding: 1rem;
  display: flex;
  flex-flow: row wrap;
  gap: 8vw;
}

</style>
