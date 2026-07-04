import { test, expect } from "vitest";

import { Lattice, type int } from "#scripts/types";


/** Run a test over many sizes of grid. */
function for_sizes(lattice: Lattice, test: (width: int, height: int) => void)
{
  for (let width = 4; width < 10; width++) {
    for (let height = 4; height < 10; height++) {
      lattice.init(width, height);
      test(width, height);
    }
  }
}


test("lattice / init", () =>
{
  let lattice = new Lattice();
  
  for_sizes(lattice, (width, height) => {
    expect(lattice.width).toBe(width);
    expect(lattice.height).toBe(height);
    
    for (let x = 0; x < lattice.width + 2; x++) {
      for (let y = 0; y < lattice.height + 2; y++) {
        let cell = lattice.cells[x][y];
        expect(cell.x).toBe(x);
        expect(cell.y).toBe(y);
      }
    }
  });
});

test("lattice / is-outer", () =>
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


// == UPSIZING == //

test("lattice / upsize / left", () =>
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

test("lattice / upsize / right", () =>
{
  let lattice = new Lattice();

  for_sizes(lattice, (width, height) => {
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
