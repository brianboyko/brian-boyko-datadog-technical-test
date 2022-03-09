import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  ReferenceArea,
} from "recharts";
import { format } from "date-fns";
import { getHeavyCpuLoadIntervals } from "../logic/heavyCpuLoad";

const TWO_MINUTES = 1000 * 60 * 2;

export const CpuLoadChart = ({ data }) => {
  const formattedData = data.map((entry) => ({
    name: format(new Date(entry.timeStamp), "kk:mm:ss"),
    timeStamp: entry.timeStamp,
    load: entry.min1,
  }));

  const intervals = getHeavyCpuLoadIntervals(data);
  const strains = intervals.filter(
    (entry) =>
      entry.isHeavyLoad && entry.endTime - entry.startTime > TWO_MINUTES
  );
  const recoveries = intervals.filter(
    (entry) =>
      !entry.isHeavyLoad && entry.endTime - entry.startTime > TWO_MINUTES
  );
  console.log(intervals);
  console.log({strains});
  console.log({recoveries});

  return (
    <LineChart
      width={600}
      height={480}
      data={formattedData}
      margin={{ top: 5, right: 20, bottom: 50, left: 0 }}
    >
      <Line type="monotone" dataKey="load" stroke="#8884d8" />
      <ReferenceLine y={1} stroke="red" label="Heavy Load Threshold" />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="name" angle={70}/>
      <YAxis />
      <Tooltip />

    </LineChart>
  );
};
