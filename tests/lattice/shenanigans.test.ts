import { Lattice } from "#scripts/types";

import { for_square_sizes } from "./shared";


test("fill-random()", () =>
{
  let lattice = new Lattice();

  for_square_sizes(lattice, size => {
    lattice.fill_random();

    expect(lattice.inner_width).toBe(size);
    expect(lattice.inner_height).toBe(size);

    for (let row of lattice.iter_inner_rows()) {
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

      for (let cell of column) {
        let digit = Number(cell.entered);
        expect(digit).toBeGreaterThan(0);
        expect(digit).toBeLessThanOrEqual(size);
        seen_digits.add(digit);
      }

      expect(seen_digits.size).toBe(size);
    }
  });
});
