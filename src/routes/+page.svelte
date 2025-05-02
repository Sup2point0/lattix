<script lang="ts">

import "#styles/essence.scss";

import { current } from "#scripts/stores";

import Lattice from "#parts/lattice.svelte";

</script>


<main>
  <div class="layout">
    <Lattice x={current.lattice_x} y={current.lattice_y} cellsize="5rem" />
  </div>
</main>


<style lang="scss">

main {
  width: 100%;
  min-height: 100vh;
  padding: 1rem;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  background: var(--col-back);
}

.layout {
  width: max-content;
  padding: 1rem;
}

</style>
