<script lang="ts">

import "#styles/essence.scss";

import { current, prefs } from "#scripts/stores";
import { set_keybinds, onblur, onbeforeunload } from "#scripts/keybinds";
import { FontSizes } from "#scripts/config";

import Lattice from "#parts/lattice.svelte";
import Modkeys from "#parts/modkeys.svelte";
import Controls from "#parts/controls/controls.svelte";

import Corner from "#parts/corner.svelte";
import Toasts from "#parts/toasts.svelte";
import Landing from "#parts/overlays/landing.svelte";
import Overlay from "#src/parts/overlays/overlay.svelte";

import { onMount } from "svelte";


// set on `<body>` so font is globally set
$effect(() => {
  document.body.style.setProperty("--font", $prefs.text.font);
  document.body.style.setProperty("--font-size", FontSizes[$prefs.text.font]);
});


onMount(() => {
  set_keybinds(window);

  window.addEventListener("mouseup", () => {    
    if (current.dragselecting) {
      current.dragselecting = false;
    }
  });
});

</script>


<svelte:window {onblur} {onbeforeunload} />

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<main
  onmousedown={e => {
    if (document.elementFromPoint(e.clientX, e.clientY)?.tagName !== "BUTTON") {
      current.lattice.selected.clear();
    }
  }}
>
  <div class="layout">
    <div class="left">
      <Lattice />

      <Modkeys />
    </div>

    <Controls />
  </div>
</main>

<Corner />
<Toasts />

{#if current.overlay}
  <Overlay />
{/if}

{#if current.landing}
  <Landing />
{/if}


<style lang="scss">

main {
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  background: var(--col-back);
}

.layout {
  width: 100%;
  max-width: 100vw;
  height: 100%;
  padding: 1rem 8vw;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  gap: 2vw;

  .left {
    display: flex;
    flex-flow: column nowrap;
    gap: 1rem;
  }
}

</style>
