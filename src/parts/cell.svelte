<!-- @component Cell

A cell in the grid.
-->

<script module>

let total = 0;

</script>

<script lang="ts">

import { current } from "#scripts/stores";

import { Cell, type int } from "#scripts/types";

interface Props {
  kind?: "inner" | "outer";
  x: int;
  y: int;
}

let { kind = "inner", x, y }: Props = $props();


total++;
let cell = new Cell(total, kind, x, y);

let self: HTMLElement;


function onclick(e: MouseEvent)
{
  cell.focused = true;
  current.cell = cell;
  current.cell_button = self;
}

function onfocusout()
{
  cell.focused = false;
}


const ignored = ["CONTROL", "SHIFT", "ALT", "TAB"];
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const alpha = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "U", "T", "V", "W", "X", "Y", "Z"];
const punct = [",", ".", "!", "?", "+", "-", "*", "/", "=", "<", ">", "_", "~", "#"];

function onkeydown(e: KeyboardEvent)
{
  if (cell.fixed) return;

  let key = e.key.toUpperCase();

  if (ignored.includes(key)) return;

  switch (key) {
    case "ARROWLEFT":
      break;

    default:
      if (numbers.includes(key) || alpha.includes(key) || punct.includes(key)) {
        cell.entered = key;
      }
  }
}

</script>


<button class="cell {kind}"
  class:focused={cell.focused}
  class:fixed={cell.fixed}
  bind:this={self}
  {onclick}
  {onfocusout}
  {onkeydown}
>
  <div class="content">
    {#if cell.fixed}
      <span class="fixed"> {cell.fixed} </span>
    {/if}

    <!-- <span class="entered"> {x}.{y} </span> -->

    {#if cell.entered}
      <span class="entered"> {cell.entered} </span>
    {/if}
  </div>
</button>


<style lang="scss">

@use 'sass:color';


button.cell {
  width: var(--size, 5rem);
  aspect-ratio: 1;
  background: none;
  border: none;
  outline: none;
}

.content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  border: 2px solid $col-grey;
  border-radius: 1rem;
  outline: 0px solid color.change($col-blue, $alpha: 20%);

  transition: all 0.1s ease-out;
}

span {
  &.fixed {
    font-size: calc(var(--size) * 0.5);
    color: var(--col-text);
  }

  &.entered {
    font-size: calc(var(--size) * 0.5);
    color: $col-blue;
  }
}

button.cell.outer .content {
  border: 2px dotted $col-grey;
}


button.cell:not(.fixed) {
  &:hover, &:focus-visible {
    .content {
      border-style: solid;
      border-color: $col-blue;
      outline-width: 3.5px;
    }
  }

  &:active {
    .content {
      transform: scale(0.96);
    }
  }

  &:active, &.focused {
    .content {
      border-style: solid;
      border-color: $col-red;
      outline-width: 3.5px;
      outline-color: color.change($col-red, $alpha: 20%);
    }
  }
}

</style>
