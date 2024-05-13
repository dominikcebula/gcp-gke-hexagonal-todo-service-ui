import React from "react";
import {
  render,
  screen,
  fireEvent,
  within,
  waitForElementToBeRemoved,
  waitFor,
} from "@testing-library/react";
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

test("should update task name", async () => {
  render(<App />);

  await updateTaskName(
    "Pay utility bills",
    "Schedule car maintenance appointment"
  );

  const todoTaskItemsData = await getTodoTaskItemsData();

  expect(todoTaskItemsData).toEqual([
    { name: "Buy groceries", completed: true },
    { name: "Schedule car maintenance appointment", completed: false },
    { name: "Clean the garage", completed: true },
  ]);
});

test("should mark task as completed", async () => {
  render(<App />);

  await clickTaskCheckbox("Pay utility bills");

  const todoTaskItemsData = await getTodoTaskItemsData();

  expect(todoTaskItemsData).toEqual([
    { name: "Buy groceries", completed: true },
    { name: "Pay utility bills", completed: true },
    { name: "Clean the garage", completed: true },
  ]);
});

test("should mark task as uncompleted", async () => {
  render(<App />);

  await clickTaskCheckbox("Clean the garage");

  const todoTaskItemsData = await getTodoTaskItemsData();

  expect(todoTaskItemsData).toEqual([
    { name: "Buy groceries", completed: true },
    { name: "Pay utility bills", completed: false },
    { name: "Clean the garage", completed: false },
  ]);
});

test("should reverse all tasks completion state", async () => {
  render(<App />);

  await clickTaskCheckbox("Buy groceries");
  await clickTaskCheckbox("Pay utility bills");
  await clickTaskCheckbox("Clean the garage");

  const todoTaskItemsData = await getTodoTaskItemsData();

  expect(todoTaskItemsData).toEqual([
    { name: "Buy groceries", completed: false },
    { name: "Pay utility bills", completed: true },
    { name: "Clean the garage", completed: false },
  ]);
});

test("should delete single task", async () => {
  render(<App />);

  await deleteTask("Pay utility bills");

  const todoTaskItemsData = await getTodoTaskItemsData();

  expect(todoTaskItemsData).toEqual([
    { name: "Buy groceries", completed: true },
    { name: "Clean the garage", completed: true },
  ]);
});

test("should delete multiple tasks", async () => {
  render(<App />);

  await deleteTask("Pay utility bills");
  await deleteTask("Clean the garage");

  const todoTaskItemsData = await getTodoTaskItemsData();

  expect(todoTaskItemsData).toEqual([
    { name: "Buy groceries", completed: true },
  ]);
});

test("should delete all tasks", async () => {
  render(<App />);

  await deleteTask("Buy groceries");
  await deleteTask("Pay utility bills");
  await deleteTask("Clean the garage");

  const taskList = await queryForTaskList();

  expect(taskList).toBeNull();
});

async function findTaskList() {
  return await screen.findByRole("list", { name: "tasks-list" });
}

async function queryForTaskList() {
  return await screen.queryByText("list", { name: "tasks-list" });
}

async function findNewTaskNameTextField() {
  return await screen.findByLabelText("Enter new task here...");
}

async function findTaskListItem(todoTasksList, taskName) {
  return await within(todoTasksList).findByText(taskName);
}

async function findTaskListItems(todoTasksList) {
  return await within(todoTasksList).findAllByRole("listitem");
}

async function findTaskCheckbox(todoTask) {
  return await within(todoTask).findByRole("checkbox");
}

async function findAddButton() {
  return await screen.findByText("Add");
}

async function findEditButton(task) {
  return await within(task.parentNode.parentNode.parentNode).findByRole(
    "button",
    { name: "edit" }
  );
}

async function findCheckButton(task) {
  return await within(task).findByRole("button", { name: "check" });
}

async function findDeleteButton(task) {
  return await within(task.parentNode.parentNode.parentNode).findByRole(
    "button",
    { name: "delete" }
  );
}

async function createNewTodoItem(newTodoItemName) {
  await setNewTaskNameTextFieldValue(newTodoItemName);

  await clickAddButton();

  await waitForNewTodoItemAdded(newTodoItemName);
}

async function setNewTaskNameTextFieldValue(newTodoItemName) {
  const createTodoItemTextField = await findNewTaskNameTextField();
  await fireEvent.change(createTodoItemTextField, {
    target: { value: newTodoItemName },
  });
}

async function clickAddButton() {
  const createTodoItemButton = await findAddButton();
  await fireEvent.click(createTodoItemButton);
}

async function waitForNewTodoItemAdded(newTodoItemName) {
  await waitFor(() => screen.queryAllByDisplayValue(newTodoItemName));
}

async function updateTaskName(oldName, newName) {
  const todoTasksList = await findTaskList();
  const todoTaskItem = await findTaskListItem(todoTasksList, oldName);

  await clickEditButton(todoTaskItem);

  const taskNameEditTextField = await setTaskNameInTextField(oldName, newName);

  await clickCheckButton(taskNameEditTextField);
}

async function deleteTask(taskName) {
  const task = await screen.findByText(taskName);

  await clickDeleteButton(task);

  await waitForElementToBeRemoved(() => screen.queryByText(taskName));
}

async function clickTaskCheckbox(todoTaskName) {
  const todoItem = await screen.findByText(todoTaskName);
  const todoItemCheckbox = await within(
    todoItem.parentNode.parentNode
  ).findByRole("checkbox");

  await fireEvent.click(todoItemCheckbox);
}

async function clickEditButton(todoTaskItem) {
  const editButton = await findEditButton(todoTaskItem);
  await fireEvent.click(editButton);
}

async function clickDeleteButton(task) {
  const deleteButton = await findDeleteButton(task);
  await fireEvent.click(deleteButton);
}

async function setTaskNameInTextField(oldName, newName) {
  const taskNameEditTextField = await screen.getByDisplayValue(oldName);
  await fireEvent.change(taskNameEditTextField, {
    target: { value: newName },
  });
  return taskNameEditTextField;
}

async function clickCheckButton(taskNameEditTextField) {
  const checkButton = await findCheckButton(
    taskNameEditTextField.parentElement.parentElement.parentElement
  );
  await fireEvent.click(checkButton);
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
  const todoTaskCheckbox = await findTaskCheckbox(todoTask);

  return {
    name: todoTask.textContent,
    completed: todoTaskCheckbox.checked,
  };
}
