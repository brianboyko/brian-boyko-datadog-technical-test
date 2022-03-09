export interface LoadEntry {
  min1: number,
  min5: number,
  min15: number,
  timeStamp: number,
  meta?: {
    isHeavyLoad?: boolean;
  }
}