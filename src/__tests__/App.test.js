import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { createHandlers } from "../mocks/handlers";
import { setupServer } from "msw/node";
import App from "../App";

const server = setupServer(...createHandlers());

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

test("should create new task", async () => {
  render(<App />);

  const createTodoItemTextField = await screen.findByLabelText(
    "Enter new task here..."
  );
  const createTodoItemButton = await screen.findByText("Add");

  await fireEvent.change(createTodoItemTextField, {
    target: { value: "Finish report for work presentation" },
  });
  await fireEvent.click(createTodoItemButton);

  const todoTaskItemsData = await getTodoTaskItemsData();

  expect(todoTaskItemsData).toEqual([
    { name: "Buy groceries", completed: true },
    { name: "Pay utility bills", completed: false },
    { name: "Clean the garage", completed: true },
    { name: "Finish report for work presentation", completed: false },
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
