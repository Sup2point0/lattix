<!-- @component Toast

A popup message in the corner of the screen.
-->

<script lang="ts">

import { current } from "#scripts/stores";

import { slide, scale } from "svelte/transition";
import { expoOut } from "svelte/easing";

</script>


<aside>
  {#each current.toasts as toast (toast.id)}
    <div class="toast-container"
      in:slide={{ duration: 500, easing: expoOut }}
      out:slide={{ duration: 500, easing: expoOut, delay: 250 }}
    >
      <button
        onclick={() => {
          current.toasts.splice(current.toasts.indexOf(toast), 1);
        }}
        in:scale={{ duration: 500, easing: expoOut, start: 0.5, delay: 200 }}
        out:scale={{ duration: 500, easing: expoOut, start: 0.9 }}
      >
        {toast.text}
        <code> × </code>
      </button>
    </div>
  {/each}
</aside>


<style lang="scss">

@use 'sass:color';


aside {
  position: fixed;
  right: 2rem;
  bottom: 2rem;
  display: flex;
  flex-flow: column nowrap;
  align-items: end;
}

.toast-container {
  padding: 0.5rem 0;
}

button {
  min-width: 12em;
  padding: 0.75em 1.5em;
  @include font-ui;
  font-size: 100%;
  color: black;
  text-align: right;
  background: white;
  border: 1px solid $col-grey-light;
  border-radius: 0.5rem;
  box-shadow: 0 4px 8px -2px color.change($col-grey-dark, $alpha: 50%);
  transition: all 0.1s ease-out;

  &:hover {
    cursor: pointer;

    code {
      color: $col-blue;
    }
  }

  &:active {
    transform: scale(96%);
  }
}

code {
  padding-left: 0.4em;
  @include font-code;
  transition: all 0.1s ease-out;
}

</style>
