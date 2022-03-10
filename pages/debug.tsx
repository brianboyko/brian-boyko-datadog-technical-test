import CpuLoadChart from "../components/CpuLoadChart";
import testData from "../testData/testLoad.json";
import useChartDataFormatter from "../hooks/useChartDataFormatter";
import styles from "../styles/Home.module.css";
import Alerts from "../components/Alerts";
import { useCallback, useState } from "react";
/* We dont need to persist data on the backend in a 
   database, but it makes a lot of sense that we should
   at least be able to persist the data if the page refreshes,
   so long as the server is running. 

   So, 'getServerSideProps' makes a server-side request
   to the Node backend for the last 10 minutes of logs...
   (and if there are no logs, the request itself starts)
   the process of storing them. 

   We combine those with live client-side requests every 10
   seconds via useProbe(), and concat the logged data with the
   incoming live data. 
*/

export default function Home() {
  const [intensity, setIntensity] = useState<number>(6);
  const increment = useCallback(
    () => setIntensity((i) => i + 1),
    [setIntensity]
  );
  const decrement = useCallback(
    () => setIntensity((i) => i - 1),
    [setIntensity]
  );
  const { combinedData, alerts } = useChartDataFormatter({
    loggedData: testData.map((entry) => ({
      ...entry,
      min1: entry.min1 + intensity / 10,
    })),
    state: { data: [] },
  });

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <CpuLoadChart
          data={combinedData}
          strains={alerts.filter((entry) => entry.isHeavyLoad)}
          recoveries={alerts.filter((entry) => !entry.isHeavyLoad)}
        />

        <Alerts alerts={alerts} />
        <div>
          <button onClick={increment}>Increase load</button>
          <button onClick={decrement}>Decrease load</button>
          <div>Current load: {intensity / 10}</div>
        </div>
      </main>
    </div>
  );
}
