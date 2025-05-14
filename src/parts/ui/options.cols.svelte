<!-- @component ColourOptions

A selector for picking between 2 or more colours.
-->

<script lang="ts">

import { current } from "#scripts/stores";
import { ThemeCol } from "#scripts/config";

interface Props {
  value: ThemeCol | null;
  cols?: (ThemeCol | null)[];
  disabled?: boolean;
}

let {
  value = $bindable(),
  cols = Object.values(ThemeCol),
  disabled = false,
}: Props = $props();


function cycle_options()
{
  if (disabled) return;

  let idx = value ? ((cols.indexOf(value) +1) % cols.length) : 0;
  return cols[idx];
}

</script>


<!-- hidden element for tab navigation -->
<button class="shadow"
  onclick={cycle_options}
  disabled={disabled}
>-</button>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<div class="options"
  role="listbox"
  tabindex="0"
  onkeydown={e => {
    (e.key === " " || e.key === "Enter") && cycle_options();
  }}
>
  {#each cols as col}
    <button class:selected={value === col}
      class:none={col === null}
      disabled={disabled || undefined}
      onclick={e => {
        value = col;
        current.selected_cells.clear();
        e.stopPropagation();
      }}
      style:--col="var(--col-{col})"
    >
      {#if col === null}
        <span>/</span>
      {/if}
    </button>
  {/each}
</div>


<style lang="scss">

@use 'sass:color';


.options {
  padding: 0.4rem 0.5rem;
  display: flex;
  flex-flow: row nowrap;
  align-items: stretch;
  gap: 0.5rem;

  border: 1px solid $col-grey-light;
  border-radius: 0.5rem;
  outline-width: 0px;
  outline-style: solid;
  outline-color: color.change($col-blue, $alpha: 20%);
  box-shadow: 0 0.5px 1px $col-grey-light;
  transition: all 0.1s ease-out;

  &:focus-visible {
    border-color: $col-blue;
    outline-width: 2px;
  }
}

button {
  width: 3rem;
  height: 3rem;
  background: color-mix(in oklch, var(--col), transparent 75%);
  &[disabled] { background: color-mix(in oklch, var(--col), transparent 90%); }
  border: 0px solid transparent;
  border-radius: 0.5rem;
  transition: all 0.1s ease-out;

  &:not(.none).selected {
    background: color-mix(in oklch, var(--col), transparent 40%);
    border: 2px solid var(--col);
  }
  
  &.none {
    border: 2px solid $col-grey-light;
    
    span {
      display: block;
      @include font-code;
      font-weight: bold;
      font-size: 150%;
      color: $col-grey-light;
      transform: skew(-20deg);
    }

    &:not([disabled]).selected {
      border-color: $col-blue;

      span {
        color: $col-blue;
      }
    }
  }
}

button:not([disabled]) {
  &:hover, &:focus-visible {
    cursor: pointer;
    background: var(--col);
  }

  &:active {
    transform: scale(94%);

    &::after {
      filter: brightness(92%);
    }
  }
}

button.shadow {
  display: none;
}

</style>
