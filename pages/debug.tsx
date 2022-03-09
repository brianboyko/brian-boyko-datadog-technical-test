import { useMemo } from "react";
import { CpuLoadChart } from "../Components/CpuLoadChart";
import useProbe from "../hooks/useProbe";
import testData from "../testData/testLoad.json";

const test = testData.map((entry) => ({ ...entry, min1: entry.min1 + 0.5 }));

export default function Debug({ loggedData }) {
  const state = useProbe();
  const fullMeasure = useMemo(
    () => state.data.concat(loggedData.map((l) => ({ ...l, logged: true }))),
    [loggedData, state.data]
  );
  return (
    <div>
      <CpuLoadChart data={test}/>
      <pre>{JSON.stringify({ fullMeasure }, null, 2)}</pre>
    </div>
  );
}
export const getServerSideProps = async ({ req }) => {
  // this code runs serverside so we need different ways of getting the localhost.
  const protocol = req.headers["x-forwarded-proto"] || "http";
  const baseUrl = req ? `${protocol}://${req.headers.host}` : "";
  const {data} = await fetch(`${baseUrl}/api/load/log`).then((d) => d.json());

  return { props: { loggedData: data || []} };
};
