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


let dragging = $state(false);

function onmousemove(e: MouseEvent)
{
  if (!dragging) return;

  value += e.movementX * 0.002;
  if (value < 0) value = 0;
  else if (value > 1) value = 1;
}

</script>


<svelte:window
  {onmousemove}
  onmouseup={() => { dragging = false; }}
/>

<div class="slider-container">
  <button class="back"
    aria-label="slider"
    onmousedown={() => { dragging = true; }}>
  </button>
  <button class="knob"
    aria-label="slider-knob"
    onmousedown={() => { dragging = true; }}
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

button.back {
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
  left: calc(var(--scale, 20%) * 100%);
  // background: $col-blue;
  background: white;
  border: 1px solid $col-blue;
  border-radius: $height * 0.5;
  outline-width: 0px;
  outline-style: solid;
  outline-color: color.change($col-blue, $alpha: 20%);
  transform: scale(150%);
  transition: all 0.1s ease-out;

  &:hover, button.back:hover ~ & {
    cursor: ew-resize;
    outline-width: 2px;
  }

  &:active, button.back:active ~ & {
    cursor: ew-resize;
    border-color: $col-purp;
    outline-width: 2px;
    outline-color: color.change($col-purp, $alpha: 20%);
  }
}

</style>
