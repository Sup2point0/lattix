<!-- @component Cell

A cell in the grid.
-->

<script module>

let total = 0;

</script>

<script lang="ts">

import { current } from "#scripts/stores";

import { Cell, type int } from "#scripts/types";

import { scale } from "svelte/transition";
import { expoOut } from "svelte/easing";
import { onMount } from "svelte";

interface Props {
  kind?: "inner" | "outer";
  x: int;
  y: int;
}

let { kind = "inner", x, y }: Props = $props();


total++;
let cell = new Cell(total, kind, x, y);

let self: HTMLButtonElement;


const ignored = ["CONTROL", "SHIFT", "ALT", "TAB"];
const arrows = ["ARROWLEFT", "ARROWRIGHT", "ARROWUP", "ARROWDOWN"];
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const alpha = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "U", "T", "V", "W", "X", "Y", "Z"];
const punct = [",", ".", "!", "?", "+", "-", "*", "/", "=", "<", ">", "_", "~", "#"];


onMount(() => {
  current.lattice_cells[x.toString() + y.toString()] = self;
})


function onclick(e: MouseEvent)
{
  e.stopPropagation();
  
  if (!current.multiselecting) {
    current.selected_cells.clear();
  }

  current.selected_cells.add(cell.shard);
  current.selected_cells = current.selected_cells;

  self.classList.add("clicked");
  setTimeout(() => {
    self.classList.remove("clicked");
  }, 30);
}

function onfocusout()
{
  if (!current.multiselecting) {
    current.selected_cells.delete(cell.shard);
  }
}

function onkeydown(e: KeyboardEvent)
{
  if (cell.fixed) return;

  let key = e.key.toUpperCase();

  if (ignored.includes(key)) return;

  if (arrows.includes(key)) {
    e.preventDefault();
    let X = x, Y = y;

    switch (key) {
      case "ARROWLEFT":
        if (X === 0) {
          X = current.lattice_x +1;
        } else {
          X--;
        }
        break;

      case "ARROWRIGHT":
        if (X === current.lattice_x +1) {
          X = 0;
        } else {
          X++;
        }
        break;

      case "ARROWUP":
        if (Y === 0) {
          Y = current.lattice_y +1;
        } else {
          Y--;
        }
        break;

      case "ARROWDOWN":
        if (Y === current.lattice_y +1) {
          Y = 0;
        } else {
          Y++;
        }
        break;
    }

    let next = current.lattice_cells[X.toString() + Y.toString()];
    if (!next) return;

    next.focus();
    next.click();

    if (e.ctrlKey) {

    }
    return;
  }

  if (numbers.includes(key) || alpha.includes(key) || punct.includes(key)) {
    cell.entered = key;
    return;
  }
}

</script>


<button class="cell {kind}"
  class:fixed={cell.fixed}
  class:focused={current.selected_cells.has(cell.shard)}
  bind:this={self}
  {onclick}
  {onfocusout}
  {onkeydown}
  transition:scale={{ duration: 500, easing: expoOut }}
>
  <div class="content">
    {#if cell.fixed}
      <span class="fixed"> {cell.fixed} </span>
    {/if}

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
  border: 2px solid $col-grey-light;
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
  border: 2px dotted $col-grey-light;
}


button.cell:not(.fixed) {
  &:hover, &:focus-visible {
    cursor: pointer;

    .content {
      border-style: solid;
      border-color: $col-blue;
      outline-width: 3.5px;
    }
  }

  &:active, &.clicked {
    .content {
      transform: scale(0.97);
    }
  }

  &:active, &.focused {
    .content {
      border-style: solid;
      border-color: $col-purp;
      outline-width: 3.5px;
      outline-color: color.change($col-purp, $alpha: 20%);
    }
    
    span.entered {
      color: $col-purp;
    }
  }
}

</style>
