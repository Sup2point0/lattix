<!-- @component ControlTab

A tab in the controls pane.
-->

<script lang="ts">
  
import { current } from "#scripts/stores";

interface Props {
  tab: string;
  text: string;
}

let { tab, text }: Props = $props();

</script>


<button class="tab"
  class:live={current.control_tab === tab}
  onclick={() => {
    current.control_tab = tab;
  }}
>
  {text}
</button>


<style lang="scss">

@use 'sass:color';


button.tab {
  padding: 0.25rem 1.5rem;
  margin-right: -2px;
  font-size: 150%;
  color: $col-grey-dark;
  text-align: right;
  background: white;
  border: none;
  border-right: 2px solid transparent;
  transition: all 0.1s ease-out;

  &.live {
    color: $col-blue;
    border-color: $col-blue;
  }

  &:not(.live):hover {
    cursor: pointer;
    color: $col-blue;
  }
}

</style>
