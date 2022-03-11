import { getLoadTimes, startLog, getLog } from "./loadLog";

const delay = (time: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, time);
  });

jest.setTimeout(35000);


describe("getLoadTimes", () => {
  it("gets the load from the CPU", () => {
    const loadTime = getLoadTimes();
    expect(Object.keys(loadTime).sort()).toEqual(
      ["timeStamp", "min1", "min5", "min15"].sort()
    );
  });
});
// this passes but takes 21 seconds to run.
// so I have disabled this test for now. 
describe("startLog/getLog", () => {
  it("starts and gets and retains a log", async () => {
    startLog();
    const log1 = getLog()
    expect(log1).toHaveLength(1);
    await delay(11000);
    const log2 = getLog()
    expect(log2).toHaveLength(2);
    await delay(10000);
    const log3 = getLog();
    expect(log3).toHaveLength(3);

    expect(log3.slice(0, 2)).toEqual(log2);
    expect(log3.slice(0, 1)).toEqual(log1)
  });
});
