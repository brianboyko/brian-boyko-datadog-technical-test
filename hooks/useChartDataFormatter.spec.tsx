import useChartDataFormatter from "./useChartDataFormatter";
import { render } from "@testing-library/react";
import TEST_DATA from "../testData/testLoad.json";

const MODIFIED_TEST_DATA = TEST_DATA.map((elem) => {
  elem.min1 = elem.min1 * 0.6;
  return elem;
});
// trick learned from : https://kentcdodds.com/blog/how-to-test-custom-react-hooks
const useTestChart = ({ loggedData, state }) => {
  const returnVal: any = {};
  const TestComponent = () => {
    Object.assign(returnVal, useChartDataFormatter({ loggedData, state }));
    return null;
  };
  render(<TestComponent />);
  return returnVal;
};

describe("chartDataFormatter", () => {
  it("formats the chart data", () => {
    const sixtyResults = MODIFIED_TEST_DATA.slice(-60);

    const testChart = useTestChart({
      loggedData: sixtyResults.slice(0, 30),
      state: { data: sixtyResults.slice(30) },
    });

    expect(testChart.alerts).toEqual([
      {
        endTime: 1646839103002,
        isHeavyLoad: false,
        startTime: 1646838512943,
      },
    ]);
    expect(testChart.combinedData).toHaveLength(60)
  });
});
