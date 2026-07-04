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
    for (let column of lattice.cells) {
      expect(lattice.is_outer_cell(column[0])).toBe(true);
      expect(lattice.is_outer_cell(column[lattice.height + 1])).toBe(true);
    }
    
    for (let column of lattice.cells.slice(1, -1)) {
      for (let cell of column.slice(1, -1)) {
        expect(lattice.is_outer_cell(cell)).toBe(false);
      }
    }
  });
});
