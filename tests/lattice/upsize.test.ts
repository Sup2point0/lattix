import { Cell, Lattice } from "#scripts/types";

import { for_square_sizes } from "./shared";


test("from: down", () =>
{
  let lattice = new Lattice();

  for_square_sizes(lattice, size => {
    lattice.fill_random();
    lattice.upsize("down");

    expect(lattice.inner_height).toBe(size + 1);

    for (let cell of lattice.cells[0]) {
      expect(lattice.is_outer_cell(cell)).toBe(true);
    }
    for (let cell of lattice.cells.at(-1)!) {
      expect(lattice.is_outer_cell(cell)).toBe(true);
    }
    
    for (let cell of lattice.cells.at(-2)!) {
      expect(cell.entered).toBeNull();
    }
    for (let row of lattice.cells.slice(1, -3)) {
      for (let cell of row.slice(1, -1)) {
        expect(cell.entered).toBeTruthy();
      }
    }
  });
});

test("from: top", () =>
{
  let lattice = new Lattice();

  for_square_sizes(lattice, size => {
    lattice.fill_random();
    lattice.upsize("top");

    expect(lattice.inner_height).toBe(size + 1);

    for (let cell of lattice.cells[0]) {
      expect(lattice.is_outer_cell(cell)).toBe(true);
    }
    for (let cell of lattice.cells.at(-1)!) {
      expect(lattice.is_outer_cell(cell)).toBe(true);
    }

    for (let cell of lattice.cells.at(1)!) {
      expect(cell.entered).toBeNull();
    }
    for (let row of lattice.cells.slice(2, -2)) {
      for (let cell of row.slice(1, -1)) {
        expect(cell.entered).toBeTruthy();
      }
    }
  });
});
