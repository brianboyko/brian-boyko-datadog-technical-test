import { render, screen, fireEvent } from "@testing-library/react";
import Debug from "./Debug";

describe("Debug page", () => {
  it("renders as the main page would, but with fixed data", async () => {
    await render(<Debug styles={{}} />);
    const alerts = await screen.findAllByTestId("alert");
    expect(alerts).toHaveLength(2);
    expect(alerts[0].textContent).toBe(
      "There was a period of high load starting at 15:08:32 lasting for 3 minutes 50 secondsDismiss"
    );
    expect(alerts[1].textContent).toBe(
      "There was a period of high load starting at 15:14:42 lasting for 2 minutesDismiss"
    );
    const decrement = await screen.findByTestId("decrement-button");
    fireEvent.click(decrement);
    const alerts2 = await screen.findAllByTestId("alert");
    expect(alerts2).toHaveLength(2);
    expect(alerts2[0].textContent).toBe(
      "There was a period of high load starting at 15:08:32 lasting for 2 minutes 40 secondsDismiss"
    );
    expect(alerts2[1].textContent).toBe(
      "There was a period of recovery starting at 15:16:22 lasting for 2 minutesDismiss"
    );
  });
});
