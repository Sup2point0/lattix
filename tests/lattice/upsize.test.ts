import { Lattice } from "#scripts/types";

import { for_sizes } from "./shared";


test("left", () =>
{
  let lattice = new Lattice();

  for_sizes(lattice, (width, height) => {
    lattice.upsize("right");
    expect(lattice.width).toBe(width + 1);

    for (let cell of lattice.cells[0]) {
      expect(lattice.is_outer_cell(cell)).toBe(true);
    }
    for (let cell of lattice.cells.at(-1)!) {
      expect(lattice.is_outer_cell(cell)).toBe(true);
    }
  });
});

test("right", () =>
{
  let lattice = new Lattice();

  for_sizes(lattice, (width, height) => {
    lattice.fill_random();

    lattice.upsize("left");
    expect(lattice.width).toBe(width + 1);

    for (let cell of lattice.cells[0]) {
      expect(lattice.is_outer_cell(cell)).toBe(true);
    }
    for (let cell of lattice.cells.at(-1)!) {
      expect(lattice.is_outer_cell(cell)).toBe(true);
    }
  });
});
