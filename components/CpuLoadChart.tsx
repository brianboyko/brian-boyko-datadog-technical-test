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
import styles from "./CpuLoadChart.module.scss";
import { useState } from "react";

export const CpuLoadChart = ({ data, strains, recoveries }) => {
  const cLoad = data[data.length - 1].min1;
  return (
    <div className={styles["chart-container"]}>
      <h2>Current Load: {cLoad}</h2>
      <LineChart
        width={600}
        height={480}
        data={data.map((entry) => ({ ...entry, load: entry.min1 }))}
        margin={{ top: 5, right: 5, bottom: 80, left: 25 }}
      >
        <Line type="monotone" dataKey="load" stroke="#8884d8" />
        <ReferenceLine y={1} stroke="red" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis
          label={{ value: "Time", dy: 70 }}
          dataKey="timeStamp"
          tickFormatter={(time) => format(time, "kk:mm:ss")}
          minTickGap={10}
          angle={120}
          dy={35}
        />
        <YAxis
          label={{
            value: "Avg. CPU load over 1m intervals",
            angle: -90,
            dx: -30,
          }}
        />
        <Tooltip
          labelFormatter={(label) => format(label, "kk:mm:ss")}
          formatter={(data) => data.toFixed(3)}
        />
        {strains.map((strain) => {
          return (
            <ReferenceArea
              key={strain.startTime.toString()}
              x1={strain.startTime}
              x2={strain.endTime}
              stroke="red"
              strokeOpacity={0.4}
              fill="red"
              fillOpacity={0.05}
              label={{ value: "HIGH LOAD", opacity: 0.8, dy: 140 }}
            />
          );
        })}
        {recoveries.map((recovery) => (
          <ReferenceArea
            key={recovery.startTime}
            x1={recovery.startTime}
            x2={recovery.endTime}
            stroke="green"
            strokeOpacity={0.4}
            fill="green"
            fillOpacity={0.05}
            label={{ value: "RECOVERY", opacity: 0.8, dy: 140 }}
          />
        ))}
      </LineChart>
    </div>
  );
};

export default CpuLoadChart;
