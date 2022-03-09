import { LoadEntry } from "../types/load";

interface CpuInterval {
  startTime: number;
  endTime: number;
  isHeavyLoad: boolean;
}

export const markHeavyCpuLoad = (loadEntries: LoadEntry[]): LoadEntry[] =>
  loadEntries.map((entry) => ({
    ...entry,
    ...{ meta: { isHeavyLoad: entry.min1 > 1 } },
  }));

export const getHeavyCpuLoadIntervals = (
  loadEntries: LoadEntry[]
): CpuInterval[] => {
  const markedLoadEntries = markHeavyCpuLoad(loadEntries);
  const intervals: CpuInterval[] = [];
  let isHeavyLoad: boolean = markedLoadEntries[0].meta.isHeavyLoad;
  let lastChange: number = markedLoadEntries[0].timeStamp;
  for (let i = 1, l = markedLoadEntries.length; i < l; i++) {
    const entry = markedLoadEntries[i];
    if (entry.meta.isHeavyLoad !== isHeavyLoad) {
      intervals.push({
        isHeavyLoad,
        startTime: lastChange,
        endTime: entry.timeStamp,
      });
      isHeavyLoad = entry.meta.isHeavyLoad;
      lastChange = entry.timeStamp;
    }
  }
  // get the last interval
  intervals.push({ isHeavyLoad, startTime: lastChange, endTime: Date.now() });
  return intervals;
};
