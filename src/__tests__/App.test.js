import React from "react";
import { render, screen } from "@testing-library/react";
import { getHandlers } from "../mocks/handlers";
import { setupServer } from "msw/node";
import App from "../App";

const server = setupServer(...getHandlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("Loads and displays application correctly", async () => {
  render(<App />);
});
