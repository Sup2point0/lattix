import { Lattice } from "#scripts/types";

import { for_sizes } from "./shared";


test("init()", () =>
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

test("fill-random()", () =>
{
  let lattice = new Lattice();

  for (let size = 4; size < 10; size++) {
    lattice.init(size, size);
    lattice.fill_random();

    expect(lattice.width).toBe(size);
    expect(lattice.height).toBe(size);

    for (let column of lattice.inner_cols()) {
      let seen_digits = new Set();

      for (let cell of column.slice(1, -1)) {
        let digit = Number(cell.entered);
        expect(digit).toBeGreaterThan(0);
        expect(digit).toBeLessThanOrEqual(size);
        seen_digits.add(digit);
      }

      expect(seen_digits.size, `saw: ${[...seen_digits]}`).toBe(size);
    }

    for (let row of lattice.iter_inner_rows()) {
      let seen_digits = new Set();

      for (let cell of row.slice(1, -1)) {
        let digit = Number(cell.entered);
        expect(digit).toBeGreaterThan(0);
        expect(digit).toBeLessThanOrEqual(size);
        seen_digits.add(digit);
      }

      expect(seen_digits.size, `saw: ${[...seen_digits]}`).toBe(size);
    }
  }
});
