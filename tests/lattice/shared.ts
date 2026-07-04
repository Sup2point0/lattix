import { Lattice, type int } from "#scripts/types";


const MIN_SIZE: int = 3;
const MAX_SIZE: int = 10;


/** Run a test over many sizes of grid, including non-square sizes. */
export function for_sizes(lattice: Lattice, test: (width: int, height: int) => void)
{
  for (let width = MIN_SIZE; width < MAX_SIZE; width++) {
    for (let height = MIN_SIZE; height < MAX_SIZE; height++) {
      lattice.init(width, height);
      test(width, height);
    }
  }
}

/** Run a test over many *square* sizes of grid. */
export function for_square_sizes(lattice: Lattice, test: (size: int) => void)
{
  for (let size = MIN_SIZE; size < MAX_SIZE; size++) {
    lattice.init(size, size);
    test(size);
  }
}
