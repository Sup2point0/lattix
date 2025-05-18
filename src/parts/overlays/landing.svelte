<!-- @component Landing

The landing overlay.
-->

<script lang="ts">

import { current } from "#scripts/stores";
import { tips } from "#scripts/flavour";

import { draw, fade, slide } from "svelte/transition";
import { expoInOut, quintInOut } from "svelte/easing";
import { onMount } from "svelte";


let timeout: number | null = null;
let tip = $state("");

onMount(() => {
  tip = tips[Math.floor(Math.random() * tips.length)];

  timeout = setTimeout(() => {
    current.landing = 4;  // trigger svg animations
    timeout = setTimeout(() => {
      current.landing = 3;  // trigger svg transitions
      timeout = setTimeout(() => {
        current.landing = 2;  // reveal title
        timeout = setTimeout(() => {
          current.landing = 1;  // hide overlay
          timeout = setTimeout(() => {
            current.landing = 0;  // reveal window
          }, 200);
        }, 2000);  // hide overlay
      }, 500);  // reveal title
    }, 1);  // trigger svg transitions
  }, 1);  // trigger svg animations
});

</script>


<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<aside class="overlay-container"
  onclick={() => {
    current.landing = 0;
    if (timeout) clearTimeout(timeout);
  }}
  transition:fade={{ duration: 350 }}
>
  {#if current.landing > 1}
    <div class="overlay" out:fade={{ duration: 350 }}>
      <div class="upper">
        <!-- <img alt="" src="{base}/lattix-icon.svg"> -->
          
        {#if current.landing < 3}
          <div class="title"
            transition:slide={{ duration: 1200, easing: expoInOut, axis: "x" }}
          >
            <p class="lattix"> lattix </p>
            <p class="caption"> by Sup#2.0 </p>
          </div>
        {/if}

        <div class="icon-anim-container" class:trans={current.landing < 4}>
          {#if current.landing < 5}
            <div class="icon-part top">
              <svg width="8rem" height="8rem" viewBox="0 0 2598 2598"
                xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" overflow="hidden">
                <g>
                  <!-- layer 1 (blue) -->
                  <path transition:fade={{ duration: 500, delay: 500 }}
                    fill="#04B4BD" fill-rule="evenodd"
                    d="M537.473 772.047C454.823 689.398 454.823 555.396 537.473 472.746L821.47 188.75C904.119 106.1 1038.12 106.1 1120.77 188.75L1404.77 472.746C1487.42 555.396 1487.42 689.398 1404.77 772.047L1120.77 1056.04C1038.12 1138.69 904.119 1138.69 821.47 1056.04Z" />
                  <!-- layer 2 (white) -->
                  <path
                    fill="#FFFFFF" fill-rule="evenodd"
                    d="M643.874 735.329C581.504 672.958 581.504 571.836 643.874 509.465L858.189 295.151C920.559 232.78 1021.68 232.78 1084.05 295.151L1298.37 509.465C1360.74 571.836 1360.74 672.958 1298.37 735.329L1084.05 949.643C1021.68 1012.01 920.559 1012.01 858.189 949.643Z" />
                  <!-- layer 3 (blue) -->
                  <path transition:fade={{ duration: 500, easing: quintInOut, delay: 600 }}
                    fill="#04B4BD" fill-rule="evenodd"
                    d="M808.127 678.645C777.062 647.58 777.062 597.213 808.127 566.148L914.872 459.404C945.937 428.338 996.303 428.338 1027.37 459.404L1134.11 566.148C1165.18 597.213 1165.18 647.58 1134.11 678.645L1027.37 785.39C996.303 816.455 945.937 816.455 914.872 785.39Z" />
                  <!-- layer 1 outline -->
                  <path transition:draw={{ duration: 800, easing: quintInOut, delay: 0 }}
                    fill="none" stroke="#04B4BD" stroke-width="1rem" fill-rule="evenodd"
                    d="M537.473 772.047C454.823 689.398 454.823 555.396 537.473 472.746L821.47 188.75C904.119 106.1 1038.12 106.1 1120.77 188.75L1404.77 472.746C1487.42 555.396 1487.42 689.398 1404.77 772.047L1120.77 1056.04C1038.12 1138.69 904.119 1138.69 821.47 1056.04Z" />
                  <!-- layer 3 outline -->
                  <path transition:draw={{ duration: 800, easing: quintInOut, delay: 75 }}
                    fill="none" stroke="#04B4BD" stroke-width="1rem" fill-rule="evenodd"
                    d="M808.127 678.645C777.062 647.58 777.062 597.213 808.127 566.148L914.872 459.404C945.937 428.338 996.303 428.338 1027.37 459.404L1134.11 566.148C1165.18 597.213 1165.18 647.58 1134.11 678.645L1027.37 785.39C996.303 816.455 945.937 816.455 914.872 785.39Z" />
                </g>
              </svg>
            </div>
            
            <div class="icon-part down">
              <svg width="8rem" height="8rem" viewBox="0 0 2598 2598"
                xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" overflow="hidden">
                <g>
                  <path transition:fade={{ duration: 500, easing: quintInOut, delay: 600 }}
                    fill="#04B4BD" fill-rule="evenodd"
                    d="M537.473 2125.43C454.824 2042.78 454.824 1908.78 537.473 1826.13L821.47 1542.13C904.12 1459.48 1038.12 1459.48 1120.77 1542.13L1404.77 1826.13C1487.42 1908.78 1487.42 2042.78 1404.77 2125.43L1120.77 2409.43C1038.12 2492.08 904.12 2492.08 821.47 2409.43Z" />
                  <path transition:draw={{ duration: 800, easing: quintInOut, delay: 25 }}
                    fill="none" stroke="#04B4BD" stroke-width="1rem" fill-rule="evenodd"
                    d="M537.473 2125.43C454.824 2042.78 454.824 1908.78 537.473 1826.13L821.47 1542.13C904.12 1459.48 1038.12 1459.48 1120.77 1542.13L1404.77 1826.13C1487.42 1908.78 1487.42 2042.78 1404.77 2125.43L1120.77 2409.43C1038.12 2492.08 904.12 2492.08 821.47 2409.43Z" />
                </g>
              </svg>
            </div>
            
            <div class="icon-part right">
              <svg width="8rem" height="8rem" viewBox="0 0 2598 2598"
                xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" overflow="hidden">
                <g>
                  <path transition:fade={{ duration: 500, easing: quintInOut, delay: 700 }}
                    fill="#04B4BD" fill-rule="evenodd"
                    d="M1214.16 1448.74C1131.52 1366.09 1131.52 1232.09 1214.16 1149.44L1498.16 865.441C1580.81 782.792 1714.81 782.792 1797.46 865.441L2081.46 1149.44C2164.11 1232.09 2164.11 1366.09 2081.46 1448.74L1797.46 1732.74C1714.81 1815.39 1580.81 1815.39 1498.16 1732.74Z" />
                  <path
                    fill="#FFFFFF" fill-rule="evenodd"
                    d="M1320.57 1412.02C1258.2 1349.65 1258.2 1248.53 1320.57 1186.16L1534.88 971.842C1597.25 909.472 1698.37 909.472 1760.74 971.842L1975.06 1186.16C2037.43 1248.53 2037.43 1349.65 1975.06 1412.02L1760.74 1626.33C1698.37 1688.71 1597.25 1688.71 1534.88 1626.33Z" />
                  <path transition:draw={{ duration: 800, easing: quintInOut, delay: 50 }}
                    fill="none" stroke="#04B4BD" stroke-width="1rem" fill-rule="evenodd"
                    d="M1214.16 1448.74C1131.52 1366.09 1131.52 1232.09 1214.16 1149.44L1498.16 865.441C1580.81 782.792 1714.81 782.792 1797.46 865.441L2081.46 1149.44C2164.11 1232.09 2164.11 1366.09 2081.46 1448.74L1797.46 1732.74C1714.81 1815.39 1580.81 1815.39 1498.16 1732.74Z" />
                </g>
              </svg>
            </div>
          {/if}
        </div>
      </div>
      
      <!-- CSS animation instead of Svelte transition here to avoid reflowing layout -->
      <div class="lower">
        <p class="tip" class:reveal={current.landing < 3}>
          {@html tip}
        </p>
      </div>
    </div>
  {/if}
</aside>


<style lang="scss">

aside.overlay-container {
  width: 100%;
  height: 100%;
  padding-top: 1rem;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  background: white;
}

.overlay {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}

.upper {
  padding-bottom: 10vh;
  height: 12rem;
  display: flex;
  flex-flow: row-reverse nowrap;
  justify-content: center;
  align-items: center;

  .icon-anim-container {
    width: 9rem;
    height: 8rem;
    position: relative;

    .icon-part {
      position: absolute;
      transition: all 1.5s cubic-bezier(0.19, 1, 0.22, 1);  // expo-out
      transition-delay: 0.25s;

      &.top { transform: translateY(-2rem); }
      &.down { transform: translateY(2rem); }
    }

    &.trans .icon-part {
      transform: none;
    }
  }

  .title {
    width: 13em;
    white-space: nowrap;
    
    p.lattix {
      font-family: 'Shantell Sans', system-ui, sans-serif;
      font-size: 500%;
      color: $col-blue;
    }

    p.caption {
      font-family: 'Sora', system-ui, sans-serif;
      font-size: 150%;
      color: $col-grey-dark;
    }
  }
}

.lower {
  p {
    font-family: 'Sora', system-ui, sans-serif;
    font-size: 120%;
    opacity: 0;

    &.reveal {
      animation: fade-in 0.8s forwards;
    }
    
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
