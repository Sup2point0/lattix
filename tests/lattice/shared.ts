import { Lattice, type int } from "#scripts/types";


const MIN_TEST_SIZE = 2;
const MAX_TEST_SIZE = 10;


/** Run a test over many sizes of grid, including non-square sizes. */
export function for_sizes(lattice: Lattice, test: (width: int, height: int) => void)
{
  for (let width = MIN_TEST_SIZE; width < MAX_TEST_SIZE; width++) {
    for (let height = MIN_TEST_SIZE; height < MAX_TEST_SIZE; height++) {
      lattice.init(width, height);
      test(width, height);
    }
  }
}

/** Run a test over many *square* sizes of grid. */
export function for_square_sizes(lattice: Lattice, test: (size: int) => void)
{
  for (let size = MIN_TEST_SIZE; size < MAX_TEST_SIZE; size++) {
    lattice.init(size, size);
    test(size);
  }
}
