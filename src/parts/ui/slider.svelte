<!-- @component Slider

A draggable slider for setting a numerical value.
-->

<script lang="ts">

import type { Scalar } from "#scripts/types";


interface Props {
  value: Scalar;
  min?: number;
  max?: number,
}

let { value = $bindable(), min = 0, max = 1 }: Props = $props();


let track: HTMLButtonElement | undefined = $state();

let dragging = $state(false);
let drag_x_init = 0;
let value_snap = 0;
let width_snap = 0;


function onmousedown(e: MouseEvent)
{
  if (!track) return;

  e.preventDefault();

  dragging = true;
  drag_x_init = e.clientX;
  value_snap = value;
  width_snap = track.clientWidth;
}

function onmousemove(e: MouseEvent)
{
  if (!(dragging && track)) return;

  let delta = e.clientX - drag_x_init;
  let shift = delta / width_snap;

  value = value_snap + shift;
  if (value < 0) value = 0;
  if (value > 1) value = 1;  
}

</script>


<svelte:window
  {onmousemove}
  onmouseup={() => { dragging = false; }}
/>

<div class="slider-container">
  <button
    bind:this={track}
    class="track"
    aria-label="slider-track"
    {onmousedown}>
  </button>
  <button
    class="knob"
    aria-label="slider-knob"
    {onmousedown}
    style:--scale={value / (max - min)}
  ></button>
</div>


<style lang="scss">

@use 'sass:color';


$height: 0.8rem;

.slider-container {
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

button.track {
  width: 100%;
  height: $height;
  background: $col-grey-light;
  border: none;
  border-radius: $height * 0.5;

  &:hover {
    cursor: ew-resize;
  }
}

button.knob {
  height: $height;
  aspect-ratio: 1;
  position: absolute;
  left: calc(2% + var(--scale, 50%) * 96%);
  // background: $col-blue;
  background: white;
  border: 1px solid $col-blue;
  border-radius: $height * 0.5;
  outline-width: 0px;
  outline-style: solid;
  outline-color: color.change($col-blue, $alpha: 20%);
  transform: translateX(-50%) scale(150%);
  transition: all 0.1s ease-out, left 0s;

  &:hover, button.track:hover ~ & {
    cursor: ew-resize;
    outline-width: 2px;
  }

  &:active, button.track:active ~ & {
    cursor: ew-resize;
    border-color: $col-purp;
    outline-width: 2px;
    outline-color: color.change($col-purp, $alpha: 20%);
    transform: translateX(-50%) scale(140%);
  }
}

</style>
