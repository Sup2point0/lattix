<!-- @component Changelog

The overlay showing the changelog.
-->

<script lang="ts">

import Content from "../../../changelog.md";

</script>


<div class="changelog">
  <a target="_blank" href="https://github.com/Sup2point0/lattix" aria-label="GitHub">
    <svg width="2.5rem" height="2.5rem" viewBox="0 0 98 96" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" fill="currentColor"/></svg>
  </a>

  <Content />
</div>


<style lang="scss">

@use 'sass:color';


.changelog {
  :global(.changelog-layout) {
    display: grid;
    grid-template-columns: max-content 1fr;
    column-gap: 1em;
    row-gap: 1em;
  }

  :global(h2) {
    grid-column-start: 1;
    grid-column-end: 3;
    padding: 2em 0 0.5em;
    margin-bottom: 0.25em;
    @include font-ui;
    font-size: 1.25em;
    font-weight: normal;
    border-bottom: 1px solid $col-grey-light;
  }

  :global(p) {
    display: block;
    line-height: 1.5;
  }

  :global(p:has(code)) {
    line-height: 2;
  }

  :global(h3) {
    padding-top: 0.5em;
    display: block;
    @include font-ui;
    font-size: 0.8em;
    font-weight: normal;
    text-transform: uppercase;
  }

  :global(h3 strong) {
    padding: 0.2em 0.5em;
    font-weight: normal;
    color: $col-green;
    background: color.change($col-green, $alpha: 15%);
  }

  :global(h3 em) {
    padding: 0.2em 0.5em;
    font-style: normal;
    color: $col-purp;
    background: color.change($col-purp, $alpha: 15%);
  }

  :global(h3:has(em) + p) {
    color: $col-grey-dark;
  }

  :global(code) {
    padding: 0.4em 0.6em;
    margin: 0 0.1em;
    @include font-code;
    font-size: 80%;
    background: white;
    border: 1px solid $col-grey-light;
    border-radius: 0.5em;
    box-shadow: 0 0.5px 1px $col-grey-light;
  }
}

a {
  float: right;

  svg {
    height: 2.5rem;
    color: #24292f;
    border-radius: 1.25rem;
    // outline: 3.5px solid transparent;
    transition: all 0.1s ease-out;

    &:hover {
      color: $col-blue;
      // outline-color: color.change($col-blue, $alpha: 20%);
    }
  }
}

</style>
