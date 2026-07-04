import { Lattice } from "#scripts/types";

import { for_sizes } from "./shared";


test("init()", () =>
{
  let lattice = new Lattice();
  
  for_sizes(lattice, (width, height) => {
    expect(lattice.width).toBe(width);
    expect(lattice.height).toBe(height);
    
    for (let y = 0; y < lattice.height + 2; y++) {
      for (let x = 0; x < lattice.width + 2; x++) {
        let cell = lattice.at(x, y);
        expect(cell).toBeDefined();
        expect(cell!.x).toBe(x);
        expect(cell!.y).toBe(y);
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

    for (let row of lattice.inner_rows()) {
      let seen_digits = new Set();

      for (let cell of row.slice(1, -1)) {
        let digit = Number(cell.entered);
        expect(digit).toBeGreaterThan(0);
        expect(digit).toBeLessThanOrEqual(size);
        seen_digits.add(digit);
      }

      expect(seen_digits.size).toBe(size);
    }

    for (let column of lattice.iter_inner_cols()) {
      let seen_digits = new Set();

      for (let cell of column.slice(1, -1)) {
        let digit = Number(cell.entered);
        expect(digit).toBeGreaterThan(0);
        expect(digit).toBeLessThanOrEqual(size);
        seen_digits.add(digit);
      }

      expect(seen_digits.size).toBe(size);
    }
  }
});
