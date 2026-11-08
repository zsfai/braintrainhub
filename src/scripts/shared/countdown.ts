export function runCountdown(
  labelEl: HTMLElement,
  seconds: number,
  onDone: () => void,
): () => void {
  let left = seconds;
  let timer = 0;
  const tick = () => {
    if (left <= 0) {
      labelEl.textContent = '';
      onDone();
      return;
    }
    labelEl.textContent = String(left);
    left -= 1;
    timer = window.setTimeout(tick, 1000);
  };
  labelEl.textContent = String(left);
  timer = window.setTimeout(tick, 1000);
  return () => clearTimeout(timer);
}

export async function runCountdownAsync(seconds: number, onTick?: (n: number) => void): Promise<void> {
  for (let n = seconds; n > 0; n--) {
    onTick?.(n);
    await new Promise((r) => setTimeout(r, 1000));
  }
}
