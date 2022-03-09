import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  ReferenceArea,
  Legend,
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

  return (
    <LineChart
      width={600}
      height={480}
      data={formattedData}
      margin={{ top: 5, right: 20, bottom: 80, left: 0 }}
    >
      <Line type="monotone" dataKey="load" stroke="#8884d8" />
      <ReferenceLine y={1} stroke="red" />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis
        label={{ value: "Time", dy: 70 }}
        dataKey="timeStamp"
        tickFormatter={(time) => format(time, "kk:mm:ss")}
        angle={120}
        dy={35}
      />
      <YAxis
        label={{
          value: "Avg. CPU load over 1m intervals",
          angle: -90,
          dx: -20,
        }}
      />
      <Tooltip
        labelFormatter={(label) => format(label, "kk:mm:ss")}
        formatter={(data) => data.toFixed(3)}
      />
      {strains.map((strain) => (
        <ReferenceArea
          key={strain.startTime}
          x1={strain.startTime}
          x2={strain.endTime}
          stroke="red"
          strokeOpacity={0.4}
          fill="red"
          fillOpacity={0.05}
          label={{value: "HIGH LOAD", opacity: 0.8, dy: 140}}
          
        />
      ))}
      {recoveries.map((recovery) => (
        <ReferenceArea
          key={recovery.startTime}
          x1={recovery.startTime}
          x2={recovery.endTime}
          stroke="green"
          strokeOpacity={0.4}
          fill="green"
          fillOpacity={0.05}
          label={{value: "RECOVERY", opacity: 0.8, dy: 140}}
        />
      ))}
    </LineChart>
  );
};
