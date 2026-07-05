import { Lattice } from "#scripts/types";

import { for_sizes } from "./shared";


test("init()", () =>
{
  let lattice = new Lattice();
  
  for_sizes(lattice, (width, height) => {
    expect(lattice.inner_width).toBe(width);
    expect(lattice.inner_height).toBe(height);
    
    for (let y = 0; y < lattice.inner_height + 2; y++) {
      for (let x = 0; x < lattice.inner_width + 2; x++) {
        let cell = lattice.at(x, y);
        expect(cell).toBeDefined();
        expect(cell!.x).toBe(x);
        expect(cell!.y).toBe(y);
      }
    }
  });
});
