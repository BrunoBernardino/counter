type GetTotalSecondsToCountTo = (number: number) => number;

export const getTotalSecondsToCountTo: GetTotalSecondsToCountTo = (number) => {
  // Exceptions for smaller numbers
  if (number <= 10) {
    return Math.ceil(number * 0.7);
  }
  if (number < 30) {
    return Math.ceil(number * 0.85);
  }
  if (number < 40) {
    return Math.ceil(number * 0.95);
  }
  if (number < 50) {
    return Math.ceil(number * 1.05);
  }
  if (number < 60) {
    return Math.ceil(number * 1.2);
  }
  if (number < 70) {
    return Math.ceil(number * 1.3);
  }
  if (number < 80) {
    return Math.ceil(number * 1.4);
  }
  if (number < 90) {
    return Math.ceil(number * 1.5);
  }
  if (number < 100) {
    return Math.ceil(number * 1.6);
  }
  if (number < 1000) {
    return Math.floor(0.9 * number * 2);
  }

  const numberOfDigits = number.toString(10).split('').length;

  // Every x10 we add 1.8 more seconds per number on average, starting on 1000 with 3.5
  const secondsOnAverage = 1.8 * (numberOfDigits - 3) + 2;

  const estimate = Math.floor(0.9 * secondsOnAverage * number);

  return estimate;
};

export default {
  getTotalSecondsToCountTo,
};
