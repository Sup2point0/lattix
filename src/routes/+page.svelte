<script lang="ts">

import "#styles/essence.scss";

import { current, prefs } from "#scripts/stores";
import { set_keybinds } from "#scripts/keybinds";
import { tips } from "#scripts/flavour";
import { FontSizes } from "#scripts/config";

import Lattice from "#parts/lattice.svelte";
import Modkeys from "#parts/modkeys.svelte";
import Controls from "#parts/controls/controls.svelte";
import Keybinds from "#parts/keybinds.svelte";

import { fade, slide } from "svelte/transition";
import { expoInOut } from "svelte/easing";
import { onMount } from "svelte";
import { base } from "$app/paths";


// set on `<body>` so font is globally set
$effect(() => {
  document.body.style.setProperty("--font", $prefs.text.font);
  document.body.style.setProperty("--font-size", FontSizes[$prefs.text.font]);
});


let timeout: number | null = null;
let tip = $state("");

$inspect(current.selected_cells);

onMount(() => {
  tip = tips[Math.floor(Math.random() * tips.length)];

  set_keybinds(window);

  window.addEventListener("mouseup", () => {    
    if (current.dragselecting) {
      current.dragselecting = false;
    }
  });

  timeout = setTimeout(() => {
    current.overlays.landing = 2;

    timeout = setTimeout(() => {
      current.overlays.landing = 1;

      timeout = setTimeout(() => {
        current.overlays.landing = 0;
      }, 200);  // release
    }, 2000);  // sustain
  }, 50);  // attack
})

</script>


<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<main
  onmousedown={e => {
    if (document.elementFromPoint(e.clientX, e.clientY)?.tagName !== "BUTTON") {
      current.selected_cells.clear();
    }
  }}
>
  <div class="layout">
    <div class="left">
      <Lattice x={current.lattice_x} y={current.lattice_y} />

      <Modkeys />
    </div>

    <Controls />
  </div>
</main>

{#if current.overlays.landing}
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <aside class="overlay-container"
    onclick={() => {
      current.overlays.landing = 0;
      if (timeout) clearTimeout(timeout);
    }}
    transition:fade={{ duration: 350 }}
  >
    {#if current.overlays.landing > 1}
      <div class="overlay" out:fade={{ duration: 350 }}>
        <div class="upper">
          <img alt="" src="{base}/lattix-icon.svg">

          {#if current.overlays.landing < 3}
            <div transition:slide={{ duration: 1000, easing: expoInOut, axis: "x" }}>
              <p class="lattix"> lattix </p>
              <p class="caption"> by Sup#2.0 </p>
            </div>
          {/if}
        </div>
          
        <div class="lower">
          <p class="tip"> {@html tip} </p>
        </div>
      </div>
    {/if}
  </aside>
{/if}

{#if current.overlays.keybinds}
  <Keybinds />
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
  gap: 4vw;

  .left {
    display: flex;
    flex-flow: column nowrap;
    gap: 3rem;
  }
}

aside.overlay-container {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  background: light-dark(white, black);
}

.overlay {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  gap: 10vh;
}

.upper {
  height: 12rem;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;

  img {
    height: 8rem;
    margin-right: 1rem;
  }

  div {
    white-space: nowrap;
    
    p.lattix {
      font-family: 'Shantell Sans', system-ui, sans-serif;
      font-size: 500%;
      color: $col-blue;
    }

    p.caption {
      font-family: 'Sora', system-ui, sans-serif;
      font-size: 150%;
      color: $col-grey-light;
    }
  }
}

.lower {
  p {
    font-family: 'Sora', system-ui, sans-serif;
    font-size: 120%;
    animation: fade-in 0.8s forwards;
    animation-delay: 0.5s;
    opacity: 0;
    
    :global(code) {
      padding: 0.2em 0.5em;
      margin: 0 0.2em;
      font-family: unset;
      font-size: 90%;
      background: white;
      border: 1px solid $col-grey-light;
      border-radius: 0.5em;
    }

    :global(span) {
      color: $col-blue-dark;
    }
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

</style>
