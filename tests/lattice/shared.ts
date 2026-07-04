import { Lattice, type int } from "#scripts/types";


/** Run a test over many sizes of grid. */
export function for_sizes(lattice: Lattice, test: (width: int, height: int) => void)
{
  for (let width = 4; width < 10; width++) {
    for (let height = 4; height < 10; height++) {
      lattice.init(width, height);
      test(width, height);
    }
  }
}
