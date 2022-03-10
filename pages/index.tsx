import Head from "next/head";
import { CpuLoadChart } from "../components/CpuLoadChart";
import useProbe from "../hooks/useProbe";
import useChartDataFormatter from "../hooks/useChartDataFormatter";
import styles from "../styles/Home.module.css";
import Alerts from "../components/Alerts";
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

export default function Home({ loggedData }) {
  const state = useProbe();
  const { combinedData, alerts } = useChartDataFormatter({ loggedData, state });
  return (
    <div className={styles.container}>
      <Head>
        <title>Brian Boyko - Datadog Technical Test</title>
        <meta name="description" content="Technical Test polling CPU load" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <CpuLoadChart
          data={combinedData}
          strains={alerts.filter((entry) => entry.isHeavyLoad)}
          recoveries={alerts.filter((entry) => !entry.isHeavyLoad)}
        />
        <Alerts alerts={alerts} />
      </main>
    </div>
  );
}

export const getServerSideProps = async ({ req }) => {
  // this code runs serverside so we need different ways of getting the localhost.
  const protocol = req.headers["x-forwarded-proto"] || "http";
  const baseUrl = req ? `${protocol}://${req.headers.host}` : "";
  const { data } = await fetch(`${baseUrl}/api/load/log`).then((d) => d.json());

  return { props: { loggedData: data || [] } };
};
