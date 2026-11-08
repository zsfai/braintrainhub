export function bindKeys(
  map: Record<string, () => void>,
  opts?: { preventDefault?: boolean },
): () => void {
  const handler = (e: KeyboardEvent) => {
    const key = e.key.toLowerCase();
    const fn = map[key] ?? map[e.code];
    if (!fn) return;
    if (opts?.preventDefault !== false) e.preventDefault();
    fn();
  };
  window.addEventListener('keydown', handler);
  return () => window.removeEventListener('keydown', handler);
}

export function median(nums: number[]): number {
  if (!nums.length) return 0;
  const s = [...nums].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
}

export function mean(nums: number[]): number {
  if (!nums.length) return 0;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}

export function stdDev(nums: number[]): number {
  if (nums.length < 2) return 0;
  const m = mean(nums);
  const v = nums.reduce((acc, x) => acc + (x - m) ** 2, 0) / (nums.length - 1);
  return Math.sqrt(v);
}
