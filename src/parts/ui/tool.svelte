<!-- @component Tool

A button with text which toggles a state on or off.
-->

<script lang="ts">

interface Props {
  text: string;
  text_active?: string;
  value: any;
}

let { text, text_active, value = $bindable() }: Props = $props();

</script>


<button
  class:active={value}
  onclick={() => { value = !value; }}
>
  {#if value && text_active}
    {text_active}
  {:else}
    {text}
  {/if}
</button>


<style lang="scss">

@use 'sass:color';

button {
  padding: 0.5em 1em;
  background: none;
  border: 1px solid $col-grey-light;
  border-radius: 0.5rem;
  outline-width: 0px;
  outline-style: solid;
  outline-color: color.change($col-blue, $alpha: 20%);
  box-shadow: 0 0.5px 1px $col-grey-light;

  transition: all 0.1s ease-out;

  &:hover {
    cursor: pointer;
    color: $col-blue;
    border-color: $col-blue;
    outline-width: 2px;
  }

  &:active {
    color: $col-purp;
    border-color: $col-purp;
    outline-color: color.change($col-purp, $alpha: 20%);
    transform: scale(97%);
  }

  &.active {
    color: white;
    background: $col-blue;
    border-color: $col-blue;

    &:active {
      background: $col-purp;
    }
  }
}

</style>
