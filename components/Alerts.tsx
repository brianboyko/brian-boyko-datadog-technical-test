import { useState, createContext, useCallback } from "react";
import intervalToDuration from "date-fns/intervalToDuration";
import styles from "./Alerts.module.scss";
import formatDuration from "date-fns/formatDuration";

const AlertContext = createContext({
  dismissed: new Set(),
  dismiss: (_startTime: string) => {},
});
const AlertProvider = ({ children }) => {
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  const dismiss = useCallback(
    (uniqueTime) => () => {
      setDismissed((state) => new Set(state.add(JSON.stringify(uniqueTime))));
    },
    []
  );

  return (
    <AlertContext.Provider value={{ dismissed, dismiss }}>
      {children}
    </AlertContext.Provider>
  );
};

export const Alert = ({ strain, dismiss }) => {
  const duration = formatDuration(intervalToDuration(
    { end: strain.endTime, start: strain.startTime }  ));
  return (
    <div className={styles["alert"]} onClick={dismiss}>
      {duration}
      {JSON.stringify(strain, null, 2)}
    </div>
  );
};

export const Alerts = ({ strains }) => {
  return (
    <AlertProvider>
      <div className={styles["alert-container"]}>
        <h3>Alerts</h3>
        {strains.map((strain) => (
          <AlertContext.Consumer key={strain.startTime}>
            {({ dismiss, dismissed }) => {
              const uniqueTime = JSON.stringify({
                startTime: strain.startTime,
                endTime: strain.endTime,
              });
              return !dismissed.has(uniqueTime) ? (
                <Alert strain={strain} dismiss={dismiss(uniqueTime)} />
              ) : null;
            }}
          </AlertContext.Consumer>
        ))}
      </div>
    </AlertProvider>
  );
};

export default Alerts;
