import type { Scalar } from "../types";


/** Interpolate quadratically between 3 control points corresponding to input values of `0.0`, `0.5` and `1.0`. */
export function interp3(
  t: Scalar,
  points: {
    lower: number,
    preset: number,
    upper: number
  },
)
{
  /** Simplifed lagrange polynomial for x = { 0 / 0.5 / 1 }. */
  return (
    points.lower * (2*t - 1)*(t - 1) -
    points.preset * 4*t*(t - 1) +
    points.upper * t*(2*t - 1)
    // points.lower * ((t - 0.5)*(t - 1)) / ((0 - 0.5)*(0 - 1)) +
    // points.preset * ((t - 0)*(t - 1)) / ((0.5 - 0)*(0.5 - 1)) +
    // points.upper * ((t - 0)*(t - 0.5)) / ((1 - 0)*(1 - 0.5))
  );
}
