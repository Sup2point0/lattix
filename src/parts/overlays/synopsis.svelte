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
      Welcome to <span>lattix</span>!
    </p>
    
    <p>
      This is an all-purpose tool for solving any kind of gridded puzzle. Try it out by selecting a cell in the grid and typing a number!
    </p>

    <p>
      You’ll probably want to start with <span>Edit Grid</span> to resize and layout the grid to your puzzle. Try out features like <span>Select Multiple</span>, <span>Highlight</span> and <span>Pencilmarking</span>.
    </p>

    <p>
      Extensive keyboard support is available. Use <code>ALT</code>+<code>G</code> to edit the grid, arrow keys to move around, and <code>SPACE</code> to clear a cell. To view all keybinds, hit <code>ALT</code>+<code>/</code>.
    </p>

    <p>
      All sorts of customisations are available in the <span>Control Panel</span> on your right.
    </p>

    <p>
      Enjoy!
    </p>

    <div style:height="2rem"></div>

    <small> lattix is built with <a target="_blank" href="https://svelte.dev/">Svelte 5</a> / <a target="_blank" href="https://svelte.dev/docs/kit">SvelteKit</a>. The source code is available on <a target="_blank" href="https://github.com/Sup2point0/lattix">GitHub</a> and is licensed under the <a target="blank" href="https://github.com/Sup2point0/lattix/blob/main/LICENSE">MIT Licence</a>. </small>
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

    span {
      color: $col-blue-dark;
    }
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

  code {
    padding: 0.1em 0.6em;
    margin: 0 0.1em;
    display: inline-block;
    @include font-code;
    font-size: 80%;
    background: white;
    border: 1px solid $col-grey-light;
    border-radius: 0.5em;
    box-shadow: 0 0.5px 1px $col-grey-light;
  }
}

.buttons {
  display: flex;
  flex-flow: row wrap;
  justify-content: end;
  gap: 0.5rem;
}

</style>
