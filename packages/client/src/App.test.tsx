import App from "./App";
import { render, screen } from "@testing-library/react";

test("Example test", async () => {
  render(<App />);
  expect(screen.getByTestId("app")).toBeDefined();
});
