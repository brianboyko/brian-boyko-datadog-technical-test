import { useMemo } from "react";
import { getHeavyCpuLoadIntervals } from "../logic/heavyCpuLoad";

const TWO_MINUTES = 1000 * 60 * 2;

export const useChartDataFormatter = ({ loggedData, state }) => {
  const combinedData = [...loggedData.map((l) => ({ ...l, logged: true }))]
    .concat([...state.data])
    .slice(-60); // only get the last 60 results
  const intervals = getHeavyCpuLoadIntervals(combinedData);

  const alerts = intervals.filter(
    (entry) => entry.endTime - entry.startTime > TWO_MINUTES
  );

  return useMemo(() => ({ combinedData, alerts }), [combinedData, alerts]);
};
export default useChartDataFormatter;
