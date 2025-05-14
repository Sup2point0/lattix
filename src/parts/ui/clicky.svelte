<!-- @component Clicky

A button which runs a callback when clicked.
-->

<script lang="ts">

interface Props {
  text: string;
  action: () => void;
}

let { text, action }: Props = $props();

</script>


<button onclick={action}>
  {text}
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
}

</style>
