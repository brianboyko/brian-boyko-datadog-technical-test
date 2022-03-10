import { format } from "date-fns";
import { useMemo } from "react";
import { getHeavyCpuLoadIntervals } from "../logic/heavyCpuLoad";

const TWO_MINUTES = 1000 * 60 * 2;

export const useChartDataFormatter = ({ loggedData, state }) => {
  const combinedData = state.data.concat(
    loggedData
      .map((l) => ({ ...l, logged: true })) // label logged data vs. live data (for debugging purposes);
      .slice(-60) // only get the last 60 results
  );

  const intervals = getHeavyCpuLoadIntervals(combinedData);

  const strains = intervals.filter(
    (entry) =>
      entry.isHeavyLoad && entry.endTime - entry.startTime > TWO_MINUTES
  );
  const recoveries = intervals.filter(
    (entry) =>
      !entry.isHeavyLoad && entry.endTime - entry.startTime > TWO_MINUTES
  );
  return useMemo(
    () => ({ combinedData, strains, recoveries }),
    [combinedData, strains, recoveries]
  );
};
export default useChartDataFormatter;
