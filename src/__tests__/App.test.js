import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { resetState, handlers } from "../mocks/handlers";
import { setupServer } from "msw/node";
import App from "../App";

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => {
  resetState();
  server.resetHandlers();
});
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

  await createNewTodoItem("Finish report for work presentation");

  const todoTaskItemsData = await getTodoTaskItemsData();

  expect(todoTaskItemsData).toEqual([
    { name: "Buy groceries", completed: true },
    { name: "Pay utility bills", completed: false },
    { name: "Clean the garage", completed: true },
    { name: "Finish report for work presentation", completed: false },
  ]);
});

test("should create multiple new tasks", async () => {
  render(<App />);

  await createNewTodoItem("Schedule car maintenance appointment");
  await createNewTodoItem("Review notes for upcoming exam");
  await createNewTodoItem("Water indoor plants");

  const todoTaskItemsData = await getTodoTaskItemsData();

  expect(todoTaskItemsData).toEqual([
    { name: "Buy groceries", completed: true },
    { name: "Pay utility bills", completed: false },
    { name: "Clean the garage", completed: true },
    { name: "Schedule car maintenance appointment", completed: false },
    { name: "Review notes for upcoming exam", completed: false },
    { name: "Water indoor plants", completed: false },
  ]);
});

test("should mark task as completed", async () => {
  render(<App />);

  await markTaskAsCompleted("Pay utility bills");

  const todoTaskItemsData = await getTodoTaskItemsData();

  expect(todoTaskItemsData).toEqual([
    { name: "Buy groceries", completed: true },
    { name: "Pay utility bills", completed: true },
    { name: "Clean the garage", completed: true },
  ]);
});

async function findTaskList() {
  return await screen.findByRole("list");
}

async function findTaskListItems(todoTasksList) {
  const { findAllByRole } = within(todoTasksList);
  const todoTaskItems = await findAllByRole("listitem");
  return todoTaskItems;
}

async function createNewTodoItem(newTodoItemName) {
  const createTodoItemTextField = await screen.findByLabelText(
    "Enter new task here..."
  );
  const createTodoItemButton = await screen.findByText("Add");

  await fireEvent.change(createTodoItemTextField, {
    target: { value: newTodoItemName },
  });
  await fireEvent.click(createTodoItemButton);
}

async function markTaskAsCompleted(todoTaskName) {
  const todoItem = await screen.findByText(todoTaskName);
  const todoItemCheckbox = await within(todoItem.parentNode.parentNode).findByRole(
    "checkbox"
  );

  await fireEvent.click(todoItemCheckbox);
}

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

async function toTodoTaskItemData(todoTask) {
  const { findByRole } = within(todoTask);

  const todoTaskCheckbox = await findByRole("checkbox");

  return {
    name: todoTask.textContent,
    completed: todoTaskCheckbox.checked,
  };
}
