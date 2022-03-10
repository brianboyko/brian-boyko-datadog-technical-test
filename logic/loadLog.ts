import os from "os";
import fs from "fs";
import { LoadEntry } from "../types/load";

const MINUTES_OF_LOGS = 10;
const LOGS_PER_MINUTE = 6; // every 10 seconds
const LOG_MAX_LENGTH = MINUTES_OF_LOGS * LOGS_PER_MINUTE;

// these can be determined at startup and not recalculated
// on every request
const cpus = os.cpus();
const numberOfCpus = cpus.length;

export const getLoadTimes = (): LoadEntry => {
  const loadAvg = os.loadavg();
  const loadAvgPerCpu = loadAvg.map((load) => load / numberOfCpus);
  const [min1, min5, min15] = loadAvgPerCpu;
  const timeStamp = Date.now();
  return { timeStamp, min1, min5, min15 };
};

let log = [];

export const getLog = (): LoadEntry[] => {
  return log.slice();
};

let startedFlag = false;
export const startLog = (): (() => void) => {
  let logInterval;
  if (!startedFlag) {
    console.info("Log is logging");
    // while server is running, get log every 10 minutes.
    const initialLoad = getLoadTimes();
    log = [initialLoad];
    logInterval = setInterval(() => {
      const loadTimes = getLoadTimes();
      log.push(loadTimes);
      while (log.length > LOG_MAX_LENGTH) {
        log.shift();
      }
    }, 10000);
    startedFlag = true;
  }
  return () => clearInterval(logInterval);
};
