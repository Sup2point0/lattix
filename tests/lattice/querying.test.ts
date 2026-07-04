import { Lattice } from "#scripts/types";

import { for_sizes } from "./shared";


test("is-outer()", () =>
{
  let lattice = new Lattice();

  for_sizes(lattice, (width, height) => {
    for (let cell of lattice.cells[0]) {
      expect(lattice.is_outer_cell(cell)).toBe(true);
    }
    for (let cell of lattice.cells.at(-1)!) {
      expect(lattice.is_outer_cell(cell)).toBe(true);
    }
    for (let row of lattice.cells) {
      expect(lattice.is_outer_cell(row[0])).toBe(true);
      expect(lattice.is_outer_cell(row[lattice.width + 1])).toBe(true);
    }
    
    lattice.for_each_inner_cell(cell => {
      expect(lattice.is_outer_cell(cell)).toBe(false);
    });
  });
});
