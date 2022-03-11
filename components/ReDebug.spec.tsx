import { render, act, screen, fireEvent } from "@testing-library/react";
import Debug from "../pages/debug";

describe("Debug page", () => {
  it("renders as the main page would, but with fixed data", async () => {
    await render(<Debug />);
    const alerts = await screen.findAllByTestId("alert");
    expect(alerts).toHaveLength(2);
    expect(alerts[0].textContent).toBe(
      "There was a period of high load starting at 15:08:32 lasting for 3 minutes 50 secondsDismiss"
    );
    expect(alerts[1].textContent).toBe(
      "There was a period of high load starting at 15:14:42 lasting for 2 minutesDismiss"
    );
  });
});
