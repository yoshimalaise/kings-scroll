export function shuffleArray(arr: any[]): any[] {
  return arr.map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);
}

export function noBetween(lower: number, upper: number) {
  return lower + Math.floor(Math.random() * ((upper + 1) - lower));
}

export function getRandomElementFromArr(arr: any[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}