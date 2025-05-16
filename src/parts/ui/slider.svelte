<!-- @component Slider

A draggable slider for setting a numerical value.
-->

<script lang="ts">

interface Props {
  value: any;
  min?: number;
  max?: number,
}

let { value = $bindable(), min = 0, max = 1 }: Props = $props();


let track: HTMLButtonElement | null = null;
let left: number;
let width: number;

let dragging = $state(false);


function onmousedown()
{
  dragging = true;
  if (track) {
    ({ left , width } = track.getBoundingClientRect());
  }
}

function onmousemove(e: MouseEvent)
{
  if (!(dragging && track && left && width)) return;

  value = (e.clientX - left) / width;

  if (value < 0) value = 0;
  else if (value > 1) value = 1;  
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
  transition: all 0.1s ease-out;

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
