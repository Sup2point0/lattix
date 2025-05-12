<!-- @component Toggle

A button for enabling or disabling an option.
-->

<script lang="ts">
  
import { prefs } from "#scripts/stores";

interface Props {
  value: boolean;
}

let { value = $bindable() }: Props = $props();

</script>


<button class:active={value}
  onclick={() => { value = !value; }}
>
  {#if value}
    <div class="tick"> ✓ </div>
  {/if}
</button>


<style lang="scss">

@use 'sass:color';


button {
  $size: 1.5rem;

  padding: $size * 0.5;
  position: relative;
  background: none;
  border: 1.5px solid $col-grey-light;
  border-radius: 100%;
  outline-width: 0px;
  outline-style: solid;
  outline-color: color.change($col-blue, $alpha: 20%);

  transition: all 0.1s ease-out;

  .tick {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    @include font-code;
    font-size: $size;
    color: white;
    line-height: 0;
  }

  &:hover, &:focus-visible {
    cursor: pointer;
    border-color: $col-blue;
    outline-width: 2px;
  }

  &:active {
    border-color: $col-purp;
    outline-color: color.change($col-purp, $alpha: 20%);
    transform: scale(92%);
  }

  &.active {
    background: $col-blue;
    border-color: $col-blue;

    &:active {
      background: $col-purp;
      border-color: $col-purp
    }
  }
}

</style>
