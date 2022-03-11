import { useCallback, useEffect } from "react";
import { useImmerReducer } from "use-immer";

const probeReducer = (
  state: { data: any[] },
  action: { type: string; payload: any }
) => {
  if (action.type === "ADD_ENTRY") {
    state.data.push(action.payload);
  }
  return state;
};

// Why are there no unit tests for this custom hook?
// Testing custom hooks is already hard without the complications
// that come from ALSO having to mock global fetch.
// I wanted to get this to you by EOW, so I'm just marking this as
// something I'd do different in production and be done with it.
// Shoulda used Axios. :(

export const useProbe = () => {
  const [state, dispatch] = useImmerReducer(probeReducer, { data: [] });

  const probe = useCallback(async () => {
    try {
      const { data } = await fetch(
        `http://${window.location.host}/api/load/probe`
      ).then((d) => d.json());
      dispatch({ type: `ADD_ENTRY`, payload: data });
    } catch (err) {
      console.error(err);
    }
  }, [dispatch]);

  useEffect(() => {
    probe();
    let tick = setInterval(() => {
      probe();
    }, 10000);
    return () => clearInterval(tick);
  }, [probe]);

  return state;
};

export default useProbe;
