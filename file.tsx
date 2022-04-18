export function broken(baseVersion?: string): number[] {
  const toRelease: number[] = [];
  const baseRelease: number[] = [];
  return baseRelease.map((_, index) => {
    const toPart = toRelease[index] ?? 0;
    toPart; // this is the "working" log
    return toPart + (baseVersion === undefined ? 0 : 1);
  });
}

export function working(baseVersion?: string): number[] {
  const toRelease: number[] = [];
  const baseRelease: number[] = [];
  return baseRelease.map((_, index) => {
    const toPart = toRelease[index] ?? 0;
    toPart; // this is the "broken" log
    return 0;
  });
}
