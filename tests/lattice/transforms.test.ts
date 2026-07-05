import { Lattice } from "#scripts/types";

import { for_sizes, expect_equal, copy_lattice } from "./shared";


describe("flip-horizontal()", () =>
{
  test("is an involution", () =>
  {
    let lattice1 = new Lattice();

    for_sizes(lattice1, (width, height) => {
      lattice1.for_each_cell(cell => { cell.entered = `${cell.x}-${cell.y}`; });
      let lattice2 = copy_lattice(lattice1);

      lattice1.flip_horizontal();
      lattice1.flip_horizontal();
      expect_equal(lattice1, lattice2);
    });
  });
});

describe("flip-vertical()", () =>
{
  test("is an involution", () =>
  {
    let lattice1 = new Lattice();

    for_sizes(lattice1, (width, height) => {
      lattice1.for_each_cell(cell => { cell.entered = `${cell.x}-${cell.y}`; });
      let lattice2 = copy_lattice(lattice1);

      lattice1.flip_vertical();
      lattice1.flip_vertical();
      expect_equal(lattice1, lattice2);
    });
  });
});

describe("transpose()", () =>
{
  test("inverts rows/columns", () =>
  {
    let lattice = new Lattice();

    for_sizes(lattice, (width, height) => {
      lattice.for_each_cell(cell => { cell.entered = `${cell.x}-${cell.y}`; });
      lattice.transpose();

      for (let [x, column] of lattice.cells.entries()) {
        for (let [y, cell] of column.entries()) {
          expect(cell.entered!.startsWith(`${x}`)).toBe(true);
          expect(cell.entered!.endsWith(`${y}`)).toBe(true);
        }
      }
    });
  });

  test("preserves inner/outer", () =>
  {
    let lattice = new Lattice();

    for_sizes(lattice, (width, height) => {
      lattice.for_each_cell(cell => { cell.entered = `${cell.x}-${cell.y}`; });
      lattice.transpose();

      for (let cell of [...lattice.cells.at(0)!, ...lattice.cells.at(-1)!]) {
        expect(lattice.is_outer_cell(cell)).toBe(true);
      }
      for (let row of lattice.inner_rows()) {
        expect(lattice.is_outer_cell(row.at(0)!)).toBe(true);
        expect(lattice.is_outer_cell(row.at(-1)!)).toBe(true);
      }
    });
  });
  
  test("is an involution", () =>
  {
    let lattice1 = new Lattice();

    for_sizes(lattice1, (width, height) => {
      lattice1.for_each_cell(cell => { cell.entered = `${cell.x}-${cell.y}`; });
      let lattice2 = copy_lattice(lattice1);

      lattice1.transpose();
      lattice1.transpose();
      expect_equal(lattice1, lattice2);
    });
  });
});

describe("rotate-clockwise()", () =>
{
  test("rotates digits", () =>
  {
    let lattice = new Lattice();

    for_sizes(lattice, (width, height) => {
      lattice.for_each_cell(cell => { cell.entered = `${cell.x}-${cell.y}`; });
      lattice.rotate_clockwise();

      for (let [x, row] of lattice.cells.entries()) {
        for (let [y, cell] of row.entries()) {
          expect(cell.entered!.startsWith(`${x}`)).toBe(true);
          expect(cell.entered!.endsWith(`${height + 1 - y}`)).toBe(true);
        }
      }
    });
  });
  
  test("is identity after 4 rotations", () =>
  {
    let lattice1 = new Lattice();

    for_sizes(lattice1, (width, height) => {
      lattice1.for_each_cell(cell => { cell.entered = `${cell.x}-${cell.y}`; });
      let lattice2 = copy_lattice(lattice1);

      lattice1.rotate_clockwise();
      lattice1.rotate_clockwise();
      lattice1.rotate_clockwise();
      lattice1.rotate_clockwise();
      expect_equal(lattice1, lattice2);
    });
  });
});

describe("rotate-counter-clockwise()", () =>
{
  // test("rotates digits", () =>
  // {
  //   let lattice = new Lattice();

  //   for_sizes(lattice, (width, height) => {
  //     lattice.for_each_cell(cell => { cell.entered = `${cell.x}-${cell.y}`; });
  //     lattice.rotate_clockwise();

  //     for (let [x, row] of lattice.cells.entries()) {
  //       for (let [y, cell] of row.entries()) {
  //         expect(cell.entered!.startsWith(`${x}`)).toBe(true);
  //         expect(cell.entered!.endsWith(`${height + 1 - y}`)).toBe(true);
  //       }
  //     }
  //   });
  // });
  
  test("is identity after 4 rotations", () =>
  {
    let lattice1 = new Lattice();

    for_sizes(lattice1, (width, height) => {
      lattice1.for_each_cell(cell => { cell.entered = `${cell.x}-${cell.y}`; });
      let lattice2 = copy_lattice(lattice1);

      lattice1.rotate_counter_clockwise();
      lattice1.rotate_counter_clockwise();
      lattice1.rotate_counter_clockwise();
      lattice1.rotate_counter_clockwise();
      expect_equal(lattice1, lattice2);
    });
  });
});

describe("transform combinations", () =>
{
  test("flips", () =>
  {
    let lattice1 = new Lattice();

    for_sizes(lattice1, (width, height) => {
      lattice1.fill_random();
      let lattice2 = copy_lattice(lattice1);
      expect_equal(lattice1, lattice2);

      lattice1.flip_horizontal();
      lattice1.flip_vertical();
      lattice1.flip_horizontal();
      lattice1.flip_vertical();
      expect_equal(lattice1, lattice2);
    });
  });

  test("rotations", () =>
  {
    let lattice1 = new Lattice();

    for_sizes(lattice1, (width, height) => {
      lattice1.fill_random();
      let lattice2 = copy_lattice(lattice1);
      expect_equal(lattice1, lattice2);

      lattice1.rotate_clockwise();
      lattice1.rotate_counter_clockwise();
      lattice1.rotate_clockwise();
      lattice1.rotate_counter_clockwise();
      expect_equal(lattice1, lattice2);
    });
  });
});
