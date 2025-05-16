<!-- @component Cell

A cell in the grid.
-->

<script module>

let total = 0;

</script>

<script lang="ts">

import { current, prefs } from "#scripts/stores";
import { Keys } from "#scripts/config";
import { Cell } from "#scripts/types";
import type { int, Key } from "#scripts/types";

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


onMount(() => {
  cell.button = self;
  current.lattice.cells[x.toString() + y.toString()] = cell;
});
 

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
  cell.select();
  cell.animate_press();
}

function onclick(e: MouseEvent)
{
  e.stopPropagation();
  self.focus();
}

function onkeydown(e: KeyboardEvent)
{  
  if (cell.fixed && !current.editing) return;

  let key = e.key.toUpperCase();

  if (Keys.Ignored.includes(key)) return;

  if (Keys.Arrows.includes(key)) {
    e.preventDefault();
    if (current.dragselecting) return;

    let next: Cell;
    if (current.held_keys.has("ALT")) {
      next = arrow_jump(key);
    } else {
      next = arrow_move(key);
    }

    if (!next) return;

    next.button?.focus();
    next.select(false);
    return;
  }

  if (key === " " || key === "BACKSPACE" || key === "DELETE") {
    e.stopPropagation();
    for (let each of current.lattice.selected) {
      each.animate_press();
      each.enter(null);
    }
    return;
  }

  if (current.held_keys.has("ALT") && key === "H") {
    current.lattice.selected.forEach(each => each.animate_press());
    highlight_multi();
    current.lattice.selected.clear();
    return;
  }

  if (
    Keys.Numbers.includes(key) || Keys.Alpha.includes(key) || Keys.Punct.includes(key)
  ) {  
    current.lattice.selected.forEach(each => each.animate_press());
    process_digit(key);
    return;
  }
}

/** Handle moving in the grid with the arrow keys. */
function arrow_move(key: Key): Cell
{
  let X = x, Y = y;
  let move_outer = (current.editing || $prefs.cells.nav_outer) ? 1 : 0;

  switch (key) {
    case "ARROWLEFT":
      if (X === 1 - move_outer) {
        X = current.lattice.x + move_outer;
      } else {
        X--;
      }
      break;

    case "ARROWRIGHT":
      if (X === current.lattice.x + move_outer) {
        X = 1 - move_outer;
      } else {
        X++;
      }
      break;

    case "ARROWUP":
      if (Y === 1 - move_outer) {
        Y = current.lattice.y + move_outer;
      } else {
        Y--;
      }
      break;

    case "ARROWDOWN":
      if (Y === current.lattice.y + move_outer) {
        Y = 1 - move_outer;
      } else {
        Y++;
      }
      break;
  }

  return current.lattice.cells[X.toString() + Y.toString()];
}

/** Handle jump moving in the grid with the arrow keys. */
function arrow_jump(key: Key): Cell
{  
  let X = x, Y = y;
  let jump_outer = (current.editing || $prefs.cells.nav_outer) ? 1 : 0;

  switch (key) {
    case "ARROWLEFT":
      X = 1 - jump_outer;
      break;

    case "ARROWRIGHT":
      X = current.lattice.x + jump_outer;
      break;

    case "ARROWUP":
      Y = 1 - jump_outer;
      break;

    case "ARROWDOWN":
      Y = current.lattice.y + jump_outer;
      break;
  }

  return current.lattice.cells[X.toString() + Y.toString()];
}

/** Handle entering or marking digits in the cell. */
function process_digit(key: Key)
{
  if (current.editing) {    
    fix_multi(key);
    return;
  }

  if (current.marking) {
    if (current.lattice.selected.size === 1) {
      alt_single(key);
    } else {
      mark_multi(key);
    }
  }
  else {
    if ($prefs.marks.auto) {
      if (current.lattice.selected.size === 1) {        
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

function alt_single(key: Key)
{
  if (cell.marks.has(key)) {
    cell.marks.delete(key);
  } else {
    cell.marks.add(key);
  }
}

/** Handle ambiguous digit input when a *single* cell is selected and auto-marking is enabled. */
function noalt_auto_single(key: Key)
{
  /** If marks have been made, add or remove from the marks */
  if (cell.marks.size) {
    /** Make the mark the entered only if there's 1 digit and it's the same as the input key */
    if (cell.marks.size === 1 && cell.marks.has(key)) {
      cell.enter(cell.marks.values().next().value!);
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
    cell.enter(key);
  }
}

/** Handle ambiguous digit input when *multiple* cells are selected and auto-marking is enabled. */
function mark_multi(key: Key)
{
  let added = 0;

  for (let each of current.lattice.selected) {
    each.entered = null;
    if (!each.marks.has(key)) {
      each.marks.add(key);
      added++;
    }
  }

  /** If all of the selected cells already had the input digit, delete it from them instead */
  if (added) return;

  for (let each of current.lattice.selected) {
    each.marks.delete(key);
  }
}

/** Handle ambiguous digit input when auto-marking is disabled. */
function noalt_manual(key: Key)
{
  for (let each of current.lattice.selected) {
    each.enter(key);
  }
}

/** Handle digit input while editing the fixed grid. */
function fix_multi(key: Key)
{
  let added = 0;

  for (let each of current.lattice.selected) {
    each.fix(key);
    added++;
  }

  if (added) return;

  for (let each of current.lattice.selected) {
    each.fix(null);
  }
}

/** Handle highlighting multiple cells. */
function highlight_multi()
{
  let added = 0;

  for (let each of current.lattice.selected) {
    if (each.highlight !== $prefs.cols.highlight) {
      each.highlight = $prefs.cols.highlight;
      added++;
    }
  }

  if (added) return;

  for (let each of current.lattice.selected) {
    each.highlight = null;
  }
}

</script>


<button
  bind:this={self}
  class="{kind}"
  class:fixed={cell.fixed !== null}
  class:highlight={cell.highlight}
  class:editing={current.editing}
  class:focused={cell.focused}
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


button {
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

button.outer {
  .content {
    border-color: transparent;
  }

  &.editing .content {
    border: 2px dotted $col-grey-light;
  }
}

</style>
