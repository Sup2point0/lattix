<!-- @component Tab

A tab in the controls pane.
-->

<script lang="ts">
  
import { current } from "#scripts/stores";
import type { ControlTab } from "#scripts/config";

interface Props {
  tab: ControlTab;
  text: string;
  action?: () => void;
}

let { tab, text, action }: Props = $props();

</script>


<button class="tab"
  class:live={current.control_tab === tab}
  title={tab}
  onclick={action ?? (() => {
    current.control_tab = tab;
    current.show_controls = true;
  })}
>
  {@html text}
</button>


<style lang="scss">

@use 'sass:color';


button.tab {
  padding: 0.4rem 1rem 0.4rem 1.5rem;
  display: flex;
  align-items: center;
  color: $col-grey-dark;
  text-align: right;
  background: white;
  border: none;
  border-right: 2px solid transparent;
  outline: none;
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
