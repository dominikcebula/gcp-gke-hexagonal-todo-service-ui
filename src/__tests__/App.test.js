import React from "react";
import { render, screen, within } from "@testing-library/react";
import { getHandlers } from "../mocks/handlers";
import { setupServer } from "msw/node";
import App from "../App";

const server = setupServer(...getHandlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("should load and display tasks correctly", async () => {
  render(<App />);

  const todoTasksList = await screen.findByRole("list");

  const { findAllByRole } = within(todoTasksList);

  const todoTaskItems = await findAllByRole("listitem");
  const todoTaskItemsData = todoTaskItems.map(toTodoTaskItemData);

  expect(todoTaskItems).toHaveLength(3);
  expect(todoTaskItemsData).toEqual([
    { name: "Buy groceries", completed: true },
    { name: "Pay utility bills", completed: false },
    { name: "Clean the garage", completed: true },
  ]);
});

function toTodoTaskItemData(task) {
  return {};
}
