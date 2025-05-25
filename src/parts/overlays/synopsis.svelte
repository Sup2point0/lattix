<!-- @component Synopsis

The overlay showing a synopsis of lattix.
-->

<script lang="ts">

import { current } from "#scripts/stores";
import { Overlay } from "#scripts/config";

import Clicky from "../ui/clicky.svelte";

</script>


<div class="synopsis">
  <div class="content">
    <p>
      Welcome to lattix! This is an all-purpose tool for solving any kind of gridded puzzle. If you’re unsure where to start, try selecting a cell in the grid and typing a number.
    </p>

    lattix is built with <a target="_blank" href="https://svelte.dev/">Svelte 5</a> / <a target="_blank" href="https://svelte.dev/docs/kit">SvelteKit</a>. The source code is available on <a target="_blank" href="https://github.com/Sup2point0/lattix">GitHub</a> and is licensed under the <a target="blank" href="https://github.com/Sup2point0/lattix/blob/main/LICENSE">MIT Licence</a>.
  </div>

  <div class="buttons">
    <Clicky text="View Keybinds" action={() => { current.overlay = Overlay.KEYBINDS; }} />
    <Clicky text="View Changelog" action={() => { current.overlay = Overlay.CHANGELOG; }} />
  </div>
</div>


<style lang="scss">

.synopsis {
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
}

.content {
  p {
    padding-bottom: 1em;
    line-height: 150%;
  }

  a {
    position: relative;
    color: $col-blue;
    text-decoration: none;
      
    &::after {
      content: '';
      width: 100%;
      height: 1.5px;
      display: block;
      position: absolute;
      left: 0;
      background: $col-purp;
      opacity: 0;
      transform: scaleX(0);
      transition: opacity 0.2s ease-out, transform 0s 0.25s;
    }

    &:hover, &:focus-visible {
      color: $col-purp;

      &::after {
        opacity: 1;
        transform: scaleX(1);
        transition: transform 0.2s ease-out;
      }
    }
  }
}

.buttons {
  display: flex;
  flex-flow: row wrap;
  justify-content: end;
  gap: 0.5rem;
}

</style>
