import React from "react";
import { render, screen, within } from "@testing-library/react";
import { getHandlers } from "../mocks/handlers";
import { setupServer } from "msw/node";
import App from "../App";

const server = setupServer(...getHandlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("should load and display application correctly", async () => {
  render(<App />);

  const todoTasksList = await screen.findByRole("list");

  const { findAllByRole } = within(todoTasksList);

  const todoTaskItems = await findAllByRole("listitem");
  const todoTaskItemsNames = todoTaskItems.map((item) => item.textContent);

  expect(todoTaskItems).toHaveLength(3);
  expect(todoTaskItemsNames).toEqual([
    "Buy groceries",
    "Pay utility bills",
    "Clean the garage",
  ]);
});
