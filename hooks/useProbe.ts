import { useCallback, useEffect } from "react";
import { useImmerReducer } from "use-immer";

const probeReducer = (state, action) => {
  if (action.type === "ADD_ENTRY") {
    state.data.push(action.payload);
  }
  return state;
};

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
