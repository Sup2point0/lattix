<script lang="ts">

import "#styles/essence.scss";

import { current, prefs } from "#scripts/stores";
import { tips } from "#scripts/flavour";

import Lattice from "#parts/lattice.svelte";
import Controls from "#parts/controls.svelte";

import { fade, slide } from "svelte/transition";
import { expoInOut } from "svelte/easing";
import { onMount } from "svelte";
import { base } from "$app/paths";


let overlay = $state(3);


let timeout: number | null = null;

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
  });

  timeout = setTimeout(() => {
    overlay = 2;
    timeout = setTimeout(() => {
      overlay = 1;
      timeout = setTimeout(() => {
        overlay = 0;
      }, 200);
    }, 2000);
  }, 50);
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

{#if overlay}
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <aside class="overlay-container"
    onclick={() => {
      overlay = 0;
      if (timeout) clearTimeout(timeout);
    }}
    transition:fade={{ duration: 350 }}
  >
    {#if overlay > 1}
      <div class="overlay" out:fade={{ duration: 350 }}>
        <div class="upper">
          <img alt="" src="{base}/lattix-icon.svg">

          {#if overlay < 3}
            <div transition:slide={{ duration: 1000, easing: expoInOut, axis: "x" }}>
              <p class="lattix"> lattix </p>
              <p class="caption"> by Sup#2.0 </p>
            </div>
          {/if}
        </div>
          
        <div class="lower">
          <p class="tip"> {@html tips[Math.floor(tips.length * Math.random())]} </p>
        </div>
      </div>
    {/if}
  </aside>
{/if}


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
