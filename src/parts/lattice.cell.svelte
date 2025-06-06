<!-- @component Cell

A cell in the grid.
-->

<script module>

let total = 0;

</script>

<script lang="ts">

import { current, prefs } from "#scripts/stores";
import * as keybinds from "#scripts/keybinds";
import { Keys } from "#scripts/config";
import { interp3 } from "#scripts/utils";
import { Cell } from "#scripts/types";
import type { int, Key } from "#scripts/types";

import { SvelteSet as Set } from "svelte/reactivity";
import { untrack } from "svelte";

interface Props {
  kind?: "inner" | "outer";
  x: int;
  y: int;
}

let { kind = "inner", x, y }: Props = $props();


total++;
let cell = new Cell(total, kind, x, y);

let self: HTMLButtonElement;
let input: HTMLTextAreaElement;


$effect(() => {
  cell.button = self;
  cell.input = input;

  let cord = x.toString() + y.toString();
  untrack(() => {
    current.lattice.cells[cord] = cell;
  });
});
 

/** If dragselecting, select the cell by simulating a `mousedown`. */
function onmouseenter(e: MouseEvent)
{  
  if (current.dragselecting) {
    onmousedown(e);
  }
}

function onmousedown(e: MouseEvent)
{
  e.stopPropagation();
  cell.animate_press();
  cell.select();
}

function onclick(e: MouseEvent)
{
  e.stopPropagation();
  if (current.multiselecting && cell.selected) {
    current.lattice.selected.delete(cell);
  } else {
    input.focus();
  }
}

function onkeydown(e: KeyboardEvent)
{
  let key = e.key.toUpperCase();

  if (Keys.Ignored.includes(key)) return;

  if (Keys.Arrows.includes(key)) {
    e.preventDefault();
    if (current.dragselecting) return;

    let next: Cell;
    if (e.altKey) {
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
    if (cell.fixed && current.lattice.selected.size === 1) return;

    e.stopPropagation();
    for (let each of current.lattice.selected) {
      each.animate_press();
      each.enter(null);
    }
    return;
  }

  if (e.altKey && key === "H") {
    current.lattice.selected.forEach(each => each.animate_press());
    highlight_multi();
    current.lattice.selected.clear();
    return;
  }

  if (
    Keys.Numbers.includes(key) || Keys.Alpha.includes(key) || Keys.Punct.includes(key)
  ) {
    let was_keybind = keybinds.keydown(e);
    if (was_keybind || e.ctrlKey) return;

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
  } else {
    if (cell.fixed && current.lattice.selected.size === 1) {
      return;
    }
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
    if (each.fixed) continue;
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


<textarea
  bind:this={input}
  tabindex="-1"
  {onkeydown}
></textarea>

<button
  bind:this={self}
  class={[kind, {
    fixed: cell.fixed !== null,
    highlight: cell.highlight,
    editing: current.editing,
    selected: cell.selected,
    invert: $prefs.text.invert,
  }]}
  disabled={(kind === "outer" && !current.editing && !cell.entered && !cell.marks.size && !cell.fixed) ? true : undefined}
  {onmouseenter}
  {onmousedown}
  {onclick}
  {onkeydown}
  style:--col="var(--col-{cell.highlight})"
  style:--cell-size={
    interp3($prefs.cells.size, { lower: 0.75, preset: 1, upper: 1.5 })}
  style:--cell-rounding={
    interp3($prefs.cells.rounding, { lower: 0, preset: 1, upper: 2.5 })}
  style:--cell-opacity={
    interp3($prefs.cells.opacity, { lower: 1, preset: 0.75, upper: 0 })}
  style:--text-size={
    interp3($prefs.text.size, { lower: 0.75, preset: 1, upper: 1.5 })}
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
  width: calc(var(--size) * var(--cell-size, 1));
  aspect-ratio: 1;
  background: none;
  border: none;
  outline: none;
}

button .content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  
  background: color-mix(in oklch, var(--col, none), transparent 92%);
  border: 2px solid var(--col,
    color-mix(in oklch, black, transparent calc(100% * var(--cell-opacity, 50%)))
  );
  border-radius: calc(0.2 * var(--size) * var(--cell-rounding, 1));
  // split for compatibility with older browsers
  outline-width: 0px;
  outline-style: solid;
  outline-color: transparent;

  transition: all 0.1s ease-out;

  div {
    max-width: 100%;
    
    &.fixed {
      font-size: calc(0.5 * var(--size) * var(--text-size, 1));
      color: var(--col-text);
    }

    &.entered {
      font-size: calc(0.5 * var(--size) * var(--text-size, 1));
      color: $col-blue;
    }

    &.marks {
      font-size: calc(0.25 * var(--size) * var(--text-size, 1));
      color: $col-blue;
    }
  }
}


button:not(.outer[disabled]) {
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

button:not(.outer[disabled]).selected {
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
  &:not(.selected) {
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

  &.selected {
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


textarea {
  position: fixed;
  left: -2px;
  width: 0;
  resize: none;
  opacity: 0;
}


button.invert .content {
  .fixed {
    color: $col-blue;
  }

  .entered {
    color: var(--col-text);
  }

  .marks {
    color: var(--col-text);
  }
}

</style>
