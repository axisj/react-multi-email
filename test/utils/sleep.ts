export function sleep(period: number) {
  return new Promise((resolve, _reject) => {
    setTimeout(resolve, period);
  });
}
