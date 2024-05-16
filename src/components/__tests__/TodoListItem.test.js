import { render, screen, within, fireEvent } from "@testing-library/react";
import TodoListItem from "../TodoListItem";
import "@testing-library/jest-dom";

jest.mock("../../apis/TodoServiceAPI", () => {
  return {
    updateTodoItemById: (todoItemId, todoItemData, onTodoItemUpdated) =>
      onTodoItemUpdated(todoItemData),
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

test("should mark todo item as completed", async () => {
  const uncheckedTodoItem = {
    ...sampleTodoItem,
    completed: false,
  };

  render(<TodoListItem todoItem={uncheckedTodoItem} actions={actions} />);

  const listItemCheckbox = await findTaskListItemCheckbox();
  expect(listItemCheckbox.checked).toBeFalsy();

  await fireEvent.click(listItemCheckbox);

  expect(actions.handleUpdateTodoItem.mock.calls).toHaveLength(1);
  expect(actions.handleUpdateTodoItem.mock.calls[0][0]).toEqual({
    ...sampleTodoItem,
    completed: true,
  });
});

test("should mark todo item as uncompleted", async () => {
  const checkedTodoItem = {
    ...sampleTodoItem,
    completed: true,
  };

  render(<TodoListItem todoItem={checkedTodoItem} actions={actions} />);

  const listItemCheckbox = await findTaskListItemCheckbox();
  expect(listItemCheckbox.checked).toBeTruthy();

  await fireEvent.click(listItemCheckbox);

  expect(actions.handleUpdateTodoItem.mock.calls).toHaveLength(1);
  expect(actions.handleUpdateTodoItem.mock.calls[0][0]).toEqual({
    ...sampleTodoItem,
    completed: false,
  });
});

test("should enter edit state", async () => {
  render(<TodoListItem todoItem={sampleTodoItem} actions={actions} />);

  await clickEditButton();

  const editField = await findEditTextField();

  expect(editField.value).toEqual(sampleTodoItem.name);
});

test("should edit todo item", async () => {
  render(<TodoListItem todoItem={sampleTodoItem} actions={actions} />);

  await clickEditButton();
  const editField = await findEditTextField();
  await setValueInTextField(editField, "Clean the garage");
  await clickCheckButton();

  expect(actions.handleUpdateTodoItem.mock.calls).toHaveLength(1);
  expect(actions.handleUpdateTodoItem.mock.calls[0][0]).toEqual({
    ...sampleTodoItem,
    name: "Clean the garage",
  });
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

async function clickEditButton() {
  const editButton = await findEditButton();

  fireEvent.click(editButton);
}

async function findEditButton() {
  return await screen.findByRole("button", { name: "edit" });
}

async function clickDeleteButton() {
  const deleteButton = await findDeleteButton();

  fireEvent.click(deleteButton);
}

async function findDeleteButton() {
  return await screen.findByRole("button", { name: "delete" });
}

async function findEditTextField() {
  return await within(
    await screen.findByLabelText("todo-item-new-name")
  ).findByRole("textbox");
}

async function setValueInTextField(textField, newValue) {
  await fireEvent.change(textField, {
    target: { value: newValue },
  });
}

async function clickCheckButton() {
  const checkButton = await findCheckButton();
  await fireEvent.click(checkButton);
}

async function findCheckButton() {
  return await screen.findByRole("button", { name: "check" });
}
