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
    for (let row of lattice.iter_inner_rows()) {
      expect(lattice.is_outer_cell(row[0])).toBe(true);
      expect(lattice.is_outer_cell(row.at(-1)!)).toBe(true);
    }
    
    for (let row of lattice.inner_rows().slice(0, -1)) {
      for (let cell of row.slice(1, -1)) {
        expect(cell.entered).toBeTruthy();
      }
    }
    for (let cell of lattice.inner_rows().at(-1)!) {
      expect(cell.entered).toBeNull();
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
    for (let row of lattice.iter_inner_rows()) {
      expect(lattice.is_outer_cell(row[0])).toBe(true);
      expect(lattice.is_outer_cell(row.at(-1)!)).toBe(true);
    }

    for (let cell of lattice.inner_rows().at(0)!) {
      expect(cell.entered).toBeNull();
    }
    for (let row of lattice.inner_rows().slice(2)) {
      for (let cell of row.slice(1, -1)) {
        expect(cell.entered).toBeTruthy();
      }
    }
  });
});

test("from: right", () =>
{
  let lattice = new Lattice();

  for_square_sizes(lattice, size => {
    lattice.fill_random();
    lattice.upsize("right");

    expect(lattice.inner_width).toBe(size + 1);

    for (let cell of lattice.cells[0]) {
      expect(lattice.is_outer_cell(cell)).toBe(true);
    }
    for (let cell of lattice.cells.at(-1)!) {
      expect(lattice.is_outer_cell(cell)).toBe(true);
    }
    for (let row of lattice.iter_inner_rows()) {
      expect(lattice.is_outer_cell(row[0])).toBe(true);
      expect(lattice.is_outer_cell(row.at(-1)!)).toBe(true);
    }

    for (let row of lattice.iter_inner_rows()) {
      for (let cell of row.slice(1, -2)) {
        expect(cell.entered).toBeTruthy();
      }
      expect(row.at(-2)!).toBeNull();
    }
  });
});

test("from: left", () =>
{
  let lattice = new Lattice();

  for_square_sizes(lattice, size => {
    lattice.fill_random();
    lattice.upsize("left");

    expect(lattice.inner_width).toBe(size + 1);

    for (let cell of lattice.cells[0]) {
      expect(lattice.is_outer_cell(cell)).toBe(true);
    }
    for (let cell of lattice.cells.at(-1)!) {
      expect(lattice.is_outer_cell(cell)).toBe(true);
    }
    for (let row of lattice.iter_inner_rows()) {
      expect(lattice.is_outer_cell(row[0])).toBe(true);
      expect(lattice.is_outer_cell(row.at(-1)!)).toBe(true);
    }

    for (let row of lattice.iter_inner_rows()) {
      expect(row.at(0)!).toBeNull();
      
      for (let cell of row.slice(1)) {
        expect(cell.entered).toBeTruthy();
      }
    }
  });
});
