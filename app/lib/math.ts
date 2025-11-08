// Math utilities
export const map = (value: number, start1: number, stop1: number, start2: number, stop2: number) => {
  return ((value - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
};

export const clamp = (min: number, max: number, value: number) => {
  return Math.max(min, Math.min(max, value));
};

export const lerp = (a: number, b: number, t: number) => {
  return a + (b - a) * t;
};
