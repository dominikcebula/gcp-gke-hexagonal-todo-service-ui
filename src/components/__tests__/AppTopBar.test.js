import AppTopBar from "../AppTopBar";
import { render, screen } from "@testing-library/react";

test("should render top bar correctly", async () => {
  render(<AppTopBar />);

  const topBar = await screen.findByText("Todo App");

  expect(topBar).toBeDefined();
});
