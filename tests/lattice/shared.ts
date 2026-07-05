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

/** Check that 2 grids `left` and `right` have the same `.entered` values in their cells. */
export function expect_equal(left: Lattice, right: Lattice)
{
  left.for_each_cell(cell => {
    expect(right.at(cell.x, cell.y)).toBeDefined();
    expect(right.at(cell.x, cell.y)!.entered).toBe(cell.entered);
  });
}

/** Create a deep copy of `lattice` with all `.entered` values copied over. */
export function copy_lattice(lattice: Lattice): Lattice
{
  let out = new Lattice();
  out.init(lattice.inner_width, lattice.inner_height);

  out.for_each_cell(cell => {
    cell.entered = lattice.at(cell.x, cell.y)!.entered;
  });

  return out;
}
