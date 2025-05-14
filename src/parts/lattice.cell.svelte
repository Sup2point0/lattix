<!-- @component Cell

A cell in the grid.
-->

<script module>

let total = 0;

</script>

<script lang="ts">

import { current, prefs } from "#scripts/stores";

import { Cell, type int } from "#scripts/types";

import { SvelteSet as Set } from "svelte/reactivity";
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
  cell.button = self;
  current.lattice_cells[x.toString() + y.toString()] = cell;
});


/** Trigger a press animation for the cell. */
function animate_press()
{
  self.classList.add("clicked");
  setTimeout(() => {
    self.classList.remove("clicked");
  }, 30);
}

/** If dragselecting, select the cell. */
function onmouseenter(e: MouseEvent)
{  
  if (current.dragselecting) {
    onmousedown(e);
  }
}

/** Select the cell. */
function onmousedown(e: MouseEvent)
{
  e.stopPropagation();
  animate_press();
  cell.select();
}

function onclick(e: MouseEvent)
{
  e.stopPropagation();
  self.focus();
}

function onkeydown(e: KeyboardEvent)
{  
  if (cell.fixed || !cell.focused) return;

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

    next.button?.focus();
    next.select(false);
    return;
  }

  if (key === " " || key === "BACKSPACE" || key === "DELETE") {
    animate_press();
    e.stopPropagation();
    for (let each of current.selected_cells) {
      each.entered = null;
      each.marks.clear();
    }
    return;
  }

  if (numbers.includes(key) || alpha.includes(key) || punct.includes(key)) {    
    animate_press();
    process_digit(key);
    return;
  }
}

/** Handle entering or marking digits in the cell. */
function process_digit(key: string)
{
  if (current.marking) {
    if (current.selected_cells.size === 1) {
      alt_single(key);
    } else {
      mark_multi(key);
    }
  }
  else {
    if ($prefs.marks.auto) {
      if (current.selected_cells.size === 1) {        
        noalt_auto_single(key);
      } else {
        mark_multi(key);
      }
    }
    else {
      noalt_manual(key);
    }
  }
}

function alt_single(key: string)
{
  if (cell.marks.has(key)) {
    cell.marks.delete(key);
  } else {
    cell.marks.add(key);
  }
}

/** Handle ambiguous digit input when a *single* cell is selected and auto-marking is enabled. */
function noalt_auto_single(key: string)
{
  /** If marks have been made, add or remove from the marks */
  if (cell.marks.size) {
    /** Make the mark the entered only if there's 1 digit and it's the same as the input key */
    if (cell.marks.size === 1 && cell.marks.has(key)) {
      cell.entered = cell.marks.values().next().value!;
      cell.marks.clear();
    }
    else {
      if (cell.marks.has(key)) {
        cell.marks.delete(key);
      } else {
        cell.marks.add(key);
      }
    }
  }
  /** If a digit has already been entered in this cell, turn it into a mark */
  else if (cell.entered) {          
    if (cell.entered === key) {
      /** Entering same key does nothing */
    } else {
      cell.marks = new Set([cell.entered, key]);
      cell.entered = null;
    }
  }
  /** Otherwise, just input the digit */
  else {          
    cell.entered = key;
  }
}

/** Handle ambiguous digit input when *multiple* cells are selected and auto-marking is enabled. */
function mark_multi(key: string)
{
  let added = 0;

  for (let each of current.selected_cells) {
    each.entered = null;
    if (!each.marks.has(key)) {
      each.marks.add(key);
      added++;
    }
  }

  /** If all of the selected cells already had the input digit, delete it from them instead */
  if (added) return;

  for (let each of current.selected_cells) {
    each.marks.delete(key);
  }
}

/** Handle ambiguous digit input when auto-marking is disabled. */
function noalt_manual(key: string)
{
  if (current.selected_cells.size === 1) {
    cell.entered = key;
    cell.marks.clear();
  }
  else {
    for (let each of current.selected_cells) {
      each.entered = key;
      each.marks.clear();
    }
  }
}

</script>


<button
  class="{kind}"
  class:fixed={cell.fixed}
  class:focused={cell.focused}
  class:highlight={cell.highlight}
  bind:this={self}
  {onmouseenter}
  {onmousedown}
  {onclick}
  {onkeydown}
  style:--col="var(--col-{cell.highlight})"
>
  <div class="content">
    {#if cell.fixed}
      <div class="fixed"> {cell.fixed} </div>
    {/if}

    {#if cell.entered}
      <div class="entered"> {cell.entered} </div>
    {:else}
      {#if current.show_marks && cell.marks.size}
        <div class="marks"> {@html [...cell.marks].sort().join("&ZeroWidthSpace;")} </div>
      {/if}
    {/if}
  </div>
</button>


<style lang="scss">

@use 'sass:color';


button {
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
  
  background: color-mix(in oklch, var(--col, none), transparent 92%);
  border: 2px solid var(--col, $col-grey-light);
  border-radius: 1rem;
  // split for compatibility with older browsers
  outline-width: 0px;
  outline-style: solid;
  outline-color: transparent;

  transition: all 0.1s ease-out;

  div {
    max-width: 100%;
    
    &.fixed {
      font-size: calc(var(--size) * 0.5);
      color: var(--col-text);
    }

    &.entered {
      font-size: calc(var(--size) * 0.5);
      color: $col-blue;
    }

    &.marks {
      font-size: calc(var(--size) * 0.25);
      color: $col-blue;
    }
  }
}

button.outer .content {
  border: 2px dotted $col-grey-light;
}


button:not(.fixed) {
  &:hover, &:focus-visible {
    cursor: pointer;

    .content {
      border-color: $col-blue;
      outline-width: 3.5px;
      outline-color: color.change($col-blue, $alpha: 20%);
    }
  }

  &:active, &.clicked {
    .content {
      border-color: $col-purp;
      outline-width: 3.5px;
      outline-color: color.change($col-purp, $alpha: 20%);
      transform: scale(97%);
    
      .entered, .marks {
        color: $col-purp;
      }
    }
  }
}

button.focused {
  &, &:hover, &:focus-visible, &:active {
    .content {
      border-color: $col-purp;
      outline-width: 3.5px;
      outline-color: color.change($col-purp, $alpha: 20%);

      .entered, .marks {
        color: $col-purp;
      }
    }
  }
}

button.highlight {
  &:not(.focused) {
    .content {
      .entered, .marks {
        color: var(--col);
      }
    }

    &:hover, &:focus-visible {
      .content {
        border-color: var(--col, $col-purp);
        outline-color: color-mix(in oklch, var(--col, $col-blue), transparent 80%);
      }
    }
  }

  &.focused {
    .content {
      background: color.change($col-purp, $alpha: 8%);
    }
  }
}

</style>
