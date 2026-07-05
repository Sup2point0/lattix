import { Cell, Lattice } from "#scripts/types";

import { for_square_sizes } from "./shared";


test("from: down", () =>
{
  let lattice = new Lattice();

  for_square_sizes(lattice, size => {
    lattice.fill_random();
    lattice.downsize("down");

    expect(lattice.inner_height).toBe(size - 1);

    for (let cell of lattice.cells[0]) {
      expect(lattice.is_outer_cell(cell)).toBe(true);
      expect(cell.entered).toBeNull();
    }
    for (let cell of lattice.cells.at(-1)!) {
      expect(lattice.is_outer_cell(cell)).toBe(true);
      expect(cell.entered).toBeNull();
    }
    for (let row of lattice.iter_inner_rows()) {
      expect(lattice.is_outer_cell(row.at(0)!)).toBe(true);
      expect(lattice.is_outer_cell(row.at(-1)!)).toBe(true);
      expect(row.at(0)!.entered).toBeNull();
      expect(row.at(-1)!.entered).toBeNull();
    }
    
    for (let row of lattice.inner_rows()) {
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
    lattice.downsize("top");

    expect(lattice.inner_height).toBe(size - 1);

    for (let cell of lattice.cells[0]) {
      expect(lattice.is_outer_cell(cell)).toBe(true);
      expect(cell.entered).toBeNull();
    }
    for (let cell of lattice.cells.at(-1)!) {
      expect(lattice.is_outer_cell(cell)).toBe(true);
      expect(cell.entered).toBeNull();
    }
    for (let row of lattice.iter_inner_rows()) {
      expect(lattice.is_outer_cell(row.at(0)!)).toBe(true);
      expect(lattice.is_outer_cell(row.at(-1)!)).toBe(true);
      expect(row.at(0)!.entered).toBeNull();
      expect(row.at(-1)!.entered).toBeNull();
    }

    for (let row of lattice.inner_rows()) {
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
    lattice.downsize("right");

    expect(lattice.inner_width).toBe(size - 1);

    for (let cell of lattice.cells[0]) {
      expect(lattice.is_outer_cell(cell)).toBe(true);
      expect(cell.entered).toBeNull();
    }
    for (let cell of lattice.cells.at(-1)!) {
      expect(lattice.is_outer_cell(cell)).toBe(true);
      expect(cell.entered).toBeNull();
    }
    for (let row of lattice.iter_inner_rows()) {
      expect(lattice.is_outer_cell(row.at(0)!)).toBe(true);
      expect(lattice.is_outer_cell(row.at(-1)!)).toBe(true);
      expect(row.at(0)!.entered).toBeNull();
      expect(row.at(-1)!.entered).toBeNull();
    }

    for (let row of lattice.iter_inner_rows()) {
      for (let cell of row.slice(1, -1)) {
        expect(cell.entered).toBeTruthy();
      }
    }
  });
});

test("from: left", () =>
{
  let lattice = new Lattice();

  for_square_sizes(lattice, size => {
    lattice.fill_random();
    lattice.downsize("left");

    expect(lattice.inner_width).toBe(size - 1);

    for (let cell of lattice.cells[0]) {
      expect(lattice.is_outer_cell(cell)).toBe(true);
      expect(cell.entered).toBeNull();
    }
    for (let cell of lattice.cells.at(-1)!) {
      expect(lattice.is_outer_cell(cell)).toBe(true);
      expect(cell.entered).toBeNull();
    }
    for (let row of lattice.iter_inner_rows()) {
      expect(lattice.is_outer_cell(row.at(0)!)).toBe(true);
      expect(lattice.is_outer_cell(row.at(-1)!)).toBe(true);
      expect(row.at(0)!.entered).toBeNull();
      expect(row.at(-1)!.entered).toBeNull();
    }

    for (let row of lattice.iter_inner_rows()) {      
      for (let cell of row.slice(1, -1)) {
        expect(cell.entered).toBeTruthy();
      }
    }
  });
});
