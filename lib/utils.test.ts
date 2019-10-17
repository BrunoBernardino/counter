import expect from 'expect';

import { getTotalSecondsToCountTo } from './utils';

describe('utils.getTotalSecondsToCountTo', () => {
  it('estimates the number of seconds as expected', () => {
    const tests = {
      // Number: Seconds
      10: 7,
      20: 17,
      30: 29,
      50: 60,
      80: 120,
      90: 144,
      100: 180,
      200: 360,
      500: 900,
      800: 1440,
      1000: 3420,
      10000: 50400,
      100000: 666000,
      1000000: 8279999,
      10000000: 99000000,
      100000000: 1152000000,
      1000000000: 13140000000,
    };

    Object.keys(tests).forEach((number) => {
      const expectedSeconds = tests[number];
      const seconds = getTotalSecondsToCountTo(parseInt(number, 10));

      expect(seconds).toEqual(
        expectedSeconds,
        `Failed estimate count at ${number}. ${seconds} != ${expectedSeconds}`,
      );
    });
  });
});
