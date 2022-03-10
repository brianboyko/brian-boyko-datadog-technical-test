import { useState, createContext, useCallback, useEffect } from "react";
import intervalToDuration from "date-fns/intervalToDuration";
import styled from "styled-components";
import formatDuration from "date-fns/formatDuration";
import format from "date-fns/format";
import { MdWarning, MdDoneOutline } from "react-icons/md";

const StyledAlertContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 640px;
  margin: 1.5rem 0;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #888888;
  box-shadow: 5px 5px 15px -2px #000000;
`;
const StyledAlertHeader = styled.h3`
  text-align: center;
`;

const StyledAlert = styled.div<{ isStrain: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => (props.isStrain ? "#cc3e3e" : "#00a72c")};
  padding: 1rem;
  margin: 0.25rem 0;
  border-radius: 1rem;
  color: white;
  box-shadow: 5px 5px 15px -2px #000000;
`;

const StyledAlertText = styled.div`
  margin-left: 1rem;
`;
const StyledAlertDismissButton = styled.button<{ isStrain: boolean }>`
  background-color: ${(props) => (props.isStrain ? "#fdecef" : "#ccf1c7")};
  border: 2px solid ${(props) => (props.isStrain ? "#e99ea0" : "#aae7a2")};
  color: black;
  padding: 0.5rem 1rem;
  margin-left: 2rem;
  font-weight: 700;
  border-radius: 0.5rem;
  &:hover {
    background-color: ${(props) => (props.isStrain ? "#e99ea0" : "#aae7a2")};
    border: 2px solid white;
    color: ${(props) => (props.isStrain ? "white" : "black")};
  }
`;

const StyledAlertInner = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const AlertContext = createContext({
  dismissed: new Set(),
  dismiss: (_startTime: string) => {},
});
const AlertProvider = ({ children }) => {
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  const dismiss = useCallback(
    (uniqueTime) => () => {
      setDismissed((state) => new Set(state.add(uniqueTime)));
    },
    []
  );
  return (
    <AlertContext.Provider value={{ dismissed, dismiss }}>
      {children}
    </AlertContext.Provider>
  );
};

export const Alert = ({ alert, dismiss, isStrain }) => {
  const duration = formatDuration(
    intervalToDuration({ end: alert.endTime, start: alert.startTime })
  );
  const startOfDuration = format(alert.startTime, "kk:mm:ss");

  return (
    <StyledAlert isStrain={isStrain}>
      <StyledAlertInner>
        {isStrain ? <MdWarning size="2rem" /> : <MdDoneOutline size="2rem" />}
        <StyledAlertText>
          There was a period of {isStrain ? "high load" : "recovery"} starting
          at {startOfDuration} lasting for {duration}
        </StyledAlertText>
        <StyledAlertDismissButton isStrain={isStrain} onClick={dismiss}>
          Dismiss
        </StyledAlertDismissButton>
      </StyledAlertInner>
    </StyledAlert>
  );
};

export const Alerts = ({ alerts }) => {
  return (
    <AlertProvider>
      <StyledAlertContainer>
        <StyledAlertHeader>Alerts</StyledAlertHeader>
        {alerts.map((alert) => (
          <AlertContext.Consumer key={alert.startTime}>
            {({ dismiss, dismissed }) => {
              const uniqueTime = JSON.stringify({
                startTime: alert.startTime,
              });
              return !dismissed.has(uniqueTime) ? (
                <Alert
                  alert={alert}
                  isStrain={alert.isHeavyLoad}
                  dismiss={dismiss(uniqueTime)}
                />
              ) : null;
            }}
          </AlertContext.Consumer>
        ))}
      </StyledAlertContainer>
    </AlertProvider>
  );
};

export default Alerts;
