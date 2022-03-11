import { markHeavyCpuLoad, getHeavyCpuLoadIntervals } from "./heavyCpuLoad.ts";
import TEST_DATA from "../testData/testLoad.json";

const MODIFIED_TEST_DATA = TEST_DATA.map((entry) => {
  entry.min1 += 0.6;
  return entry;
});

describe("markHeavyCpuLoad", () => {
  it("marks elements during periods of heavy loads with a boolean", () => {
    const marked = markHeavyCpuLoad(MODIFIED_TEST_DATA);
    expect(marked).toHaveLength(96);
    expect(marked.every((elem) => elem.meta.isHeavyLoad !== undefined)).toBe(
      true
    );
    expect(marked.filter((elem) => elem.meta.isHeavyLoad)).toHaveLength(61);
    expect(marked.filter((elem) => !elem.meta.isHeavyLoad)).toHaveLength(35);
  });
});

describe("getHeavyCpuLoadIntervals", () => {
  it("finds intervals of heavy load and recovery", () => {
    const intervals = getHeavyCpuLoadIntervals(MODIFIED_TEST_DATA);
    expect(intervals).toEqual([
      {
        endTime: 1646838332921,
        isHeavyLoad: false,
        startTime: 1646838152905,
      },
      {
        endTime: 1646838362924,
        isHeavyLoad: true,
        startTime: 1646838332921,
      },
      {
        endTime: 1646838372927,
        isHeavyLoad: false,
        startTime: 1646838362924,
      },
      {
        endTime: 1646838742964,
        isHeavyLoad: true,
        startTime: 1646838372927,
      },
      {
        endTime: 1646838752965,
        isHeavyLoad: false,
        startTime: 1646838742964,
      },
      {
        endTime: 1646838842972,
        isHeavyLoad: true,
        startTime: 1646838752965,
      },
      {
        endTime: 1646838882978,
        isHeavyLoad: false,
        startTime: 1646838842972,
      },
      {
        endTime: 1646839002989,
        isHeavyLoad: true,
        startTime: 1646838882978,
      },
      {
        endTime: 1646839103002,
        isHeavyLoad: false,
        startTime: 1646839002989,
      },
    ]);
  });
});
