<!-- @component Options

A selector for picking between 2 or more options.
-->

<script lang="ts">

interface Props {
  value: any;
  options: string[];
}

let { value = $bindable(), options }: Props = $props();


function cycle_options()
{
  value = options[(options.indexOf(value) +1) % options.length];
}

</script>


<!-- hidden element for tab navigation -->
<button class="shadow"
  onclick={cycle_options}
>-</button>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<div class="options"
  role="listbox"
  tabindex="0"
  onkeydown={e => {
    (e.key === " " || e.key === "Enter") && cycle_options();
  }}
>
  {#each options as option}
    <button class:selected={value === option}
      onclick={e => {
        value = option;
        e.stopPropagation();
      }}
    >
      {option}
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
  gap: 0.2rem;
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
  min-width: 5em;
  padding: 0.4em 0.6em;
  font-size: 100%;
  background: none;
  border: none;
  border-radius: 0.25rem;
  transition: all 0.1s ease-out;

  &:not(.selected) {
    &:hover, &:focus-visible {
      cursor: pointer;
      background: color.change($col-grey-light, $alpha: 40%);
    }

    &:active {
      background: $col-grey-light;
    }
  }

  &.selected {
    color: white;
    background: $col-blue;
  }
}

button.shadow {
  display: none;
}

</style>
