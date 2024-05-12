import React from "react";
import { render, screen, waitFor, within } from "@testing-library/react";
import { getHandlers } from "../mocks/handlers";
import { setupServer } from "msw/node";
import App from "../App";

const server = setupServer(...getHandlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("should load and display sample tasks correctly", async () => {
  render(<App />);

  const todoTaskItemsData = await getTodoTaskItemsData();

  expect(todoTaskItemsData).toEqual([
    { name: "Buy groceries", completed: true },
    { name: "Pay utility bills", completed: false },
    { name: "Clean the garage", completed: true },
  ]);
});

async function getTodoTaskItemsData() {
  const todoTasksList = await findTaskList();
  const todoTaskItems = await findTaskListItems(todoTasksList);

  const todoTaskItemsData = await Promise.all(
    todoTaskItems.map(async (task) => {
      return await toTodoTaskItemData(task);
    })
  );

  return todoTaskItemsData;
}

async function findTaskList() {
  return await screen.findByRole("list");
}

async function findTaskListItems(todoTasksList) {
  const { findAllByRole } = within(todoTasksList);
  const todoTaskItems = await findAllByRole("listitem");
  return todoTaskItems;
}

async function toTodoTaskItemData(todoTask) {
  const { findByRole } = within(todoTask);

  const todoTaskCheckbox = await findByRole("checkbox");

  return {
    name: todoTask.textContent,
    completed: todoTaskCheckbox.checked,
  };
}
