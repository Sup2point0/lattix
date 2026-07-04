import { Lattice } from "#scripts/types";

import { for_sizes } from "./shared";


test("from: right", () =>
{
  let lattice = new Lattice();

  for_sizes(lattice, (width, height) => {
    lattice.fill_random();
    lattice.upsize("right");

    expect(lattice.width).toBe(width + 1);

    for (let cell of lattice.cells[0]) {
      expect(lattice.is_outer_cell(cell)).toBe(true);
    }
    for (let cell of lattice.cells.at(-1)!) {
      expect(lattice.is_outer_cell(cell)).toBe(true);
    }
    for (let cell of lattice.cells.at(-2)!) {
      expect(cell.entered).toBeNull();
    }
    // for (let column of lattice.cells.slice(1, -3)) {
    //   for (let cell of column.slice(1, -1)) {
    //     expect(cell.entered, `${column.map(x => x.entered)}`).toBeTruthy();
    //   }
    // }
  });
});

test("from: left", () =>
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
    for (let cell of lattice.cells.at(1)!) {
      expect(cell.entered).toBeNull();
    }
    for (let cell of lattice.cells.at(-2)!) {
      expect(cell.entered).toBeTruthy();
    }
  });
});
