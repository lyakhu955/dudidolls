/**
 * Build a wobbly vertical SVG path from bottom-center upward.
 * Returns "d" attribute for a `<path>` inside viewBox 0 0 200 1000.
 * progress ∈ [0,1]: 0 = no cut, 1 = full vertical cut from bottom to top.
 */
export function buildCutPath(progress: number): string {
  const W = 200;
  const H = 1000;
  const cx = W / 2;
  const startY = H;
  const endY = H - progress * H;
  if (progress <= 0) return `M ${cx} ${startY} L ${cx} ${startY}`;

  const points: string[] = [`M ${cx} ${startY}`];
  const step = 6;
  for (let y = startY; y >= endY; y -= step) {
    const t = (H - y) / 30;
    const wobble = Math.sin(t * 1.3) * 4 + Math.cos(t * 0.6) * 2.5 + Math.sin(t * 4.1) * 1.2;
    const x = cx + wobble;
    points.push(`L ${x} ${y}`);
  }
  return points.join(" ");
}

/**
 * Returns a frayed-edge polyline with small horizontal hairs branching from the cut.
 * Used to render the torn-thread feel along the cut.
 */
export function buildFrayHairs(progress: number): { x: number; y: number; len: number; angle: number }[] {
  const H = 1000;
  const cx = 100;
  const startY = H;
  const endY = H - progress * H;
  const hairs: { x: number; y: number; len: number; angle: number }[] = [];
  const seed = (n: number) => {
    const x = Math.sin(n * 12.9898) * 43758.5453;
    return x - Math.floor(x);
  };
  for (let y = startY; y >= endY; y -= 14) {
    const t = (H - y) / 30;
    const wobble = Math.sin(t * 1.3) * 4 + Math.cos(t * 0.6) * 2.5;
    const baseX = cx + wobble;
    const r1 = seed(y * 0.13);
    const r2 = seed(y * 0.37);
    const sideLen = 4 + r1 * 8;
    const sideAngle = -25 + r2 * 50;
    hairs.push({ x: baseX - 1, y, len: sideLen, angle: 180 + sideAngle });
    hairs.push({ x: baseX + 1, y, len: sideLen, angle: sideAngle });
  }
  return hairs;
}
