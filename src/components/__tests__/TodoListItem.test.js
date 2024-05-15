import { render, screen, within, fireEvent } from "@testing-library/react";
import TodoListItem from "../TodoListItem";
import "@testing-library/jest-dom";

jest.mock("../../apis/TodoServiceAPI", () => {
  return {
    deleteTodoItemById: (todoItemId, onTodoItemDeleted) =>
      onTodoItemDeleted(todoItemId),
  };
});

const sampleTodoItem = {
  id: "9af9499f-d7eb-458d-94d0-02ce809dc904",
  name: "Buy groceries",
  completed: true,
};

const actions = {
  handleUpdateTodoItem: jest.fn(),
  handleRemoveTodoItem: jest.fn(),
};

test("should display todo item name", async () => {
  render(<TodoListItem todoItem={sampleTodoItem} actions={actions} />);

  const listItemText = await findTaskListItem();

  expect(listItemText.textContent).toEqual(sampleTodoItem.name);
});

test("should have todo item id", async () => {
  render(<TodoListItem todoItem={sampleTodoItem} actions={actions} />);

  const listItemText = await findTaskListItem();

  expect(listItemText.id).toEqual(`todo-item-${sampleTodoItem.id}`);
});

test("should have todo item with checked checkbox", async () => {
  render(<TodoListItem todoItem={sampleTodoItem} actions={actions} />);

  const listItemCheckbox = await findTaskListItemCheckbox();

  expect(listItemCheckbox.checked).toBeTruthy();
});

test("should have todo item with unchecked checkbox", async () => {
  const uncheckedTodoItem = {
    ...sampleTodoItem,
    completed: false,
  };

  render(<TodoListItem todoItem={uncheckedTodoItem} actions={actions} />);

  const listItemCheckbox = await findTaskListItemCheckbox();

  expect(listItemCheckbox.checked).toBeFalsy();
});

test("should delete todo item", async () => {
  render(<TodoListItem todoItem={sampleTodoItem} actions={actions} />);

  await clickDeleteButton();

  expect(actions.handleRemoveTodoItem.mock.calls).toHaveLength(1);
  expect(actions.handleRemoveTodoItem.mock.calls[0][0]).toBe(sampleTodoItem.id);
});

async function findTaskListItem() {
  return await screen.findByLabelText("task-list-item-text");
}

async function findTaskListItemCheckbox() {
  return await within(
    await screen.findByLabelText("task-list-item-checkbox")
  ).findByRole("checkbox");
}

async function clickDeleteButton() {
  const deleteButton = await findDeleteButton();

  fireEvent.click(deleteButton);
}

async function findDeleteButton() {
  return await screen.findByRole("button", { name: "delete" });
}
