<!-- @component Clicky

A button which runs a callback when clicked.
-->

<script lang="ts">

interface Props {
  text?: string;
  "hover-text"?: string;
  action: () => void;
  square?: boolean;
  disabled?: boolean;
  children?: any;
}

let {
  text,
  action,
  "hover-text": hover_text,
  square = false,
  disabled,
  children,
}: Props = $props();

</script>


<button
  class:square
  onclick={action}
  disabled={disabled || undefined}
>
  {#if children}
    {@render children()}
  {:else}
    {@html text}
  {/if}

  {#if hover_text}
    <div class="hover-text">
      {@html hover_text}
    </div>
  {/if}
</button>


<style lang="scss">

@use 'sass:color';

button {
  padding: 0.5em 1em;
  position: relative;
  background: none;
  border: 1px solid $col-grey-light;
  border-radius: 0.5rem;
  outline-width: 0px;
  outline-style: solid;
  outline-color: color.change($col-blue, $alpha: 20%);
  box-shadow: 0 0.5px 1px $col-grey-light;
  transition: all 0.1s ease-out;

  &.square {
    width: 2.25rem;
    height: 2.25rem;
    padding: 0.25em;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &:not([disabled]):where(:hover, :focus) {
    cursor: pointer;
    color: $col-blue;
    border-color: $col-blue;
    outline-width: 2px;
  }

  &:not([disabled]):active {
    color: $col-purp;
    border-color: $col-purp;
    outline-color: color.change($col-purp, $alpha: 20%);
    transform: scale(97%);
  }
}

.hover-text {
  width: max-content;
  padding: 0.5em 1em;
  position: absolute;
  top: 3rem;
  z-index: 5;
  text-align: center;
  color: white;
  background: rgb(black, 75%);
  border-radius: 0.5rem;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.2s ease-out;

  button:not([disabled]):where(:hover, :focus) & {
    display: block;
    visibility: visible;
    opacity: 1;
    transition-delay: 0.4s;
  }
}

</style>
