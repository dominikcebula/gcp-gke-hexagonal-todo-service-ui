import { render, screen, fireEvent, within } from "@testing-library/react";
import TodoListItemText from "../TodoListItemText";

const sampleTodoItem = {
  id: "9af9499f-d7eb-458d-94d0-02ce809dc904",
  name: "Buy groceries",
  completed: true,
};

const handleEditTodoItemClicked = jest.fn();
const handleDeleteTodoItemClicked = jest.fn();
const toggleTodoItemCompletedState = jest.fn();

it("should reder todo item text", async () => {
  render(
    <TodoListItemText
      labelId={sampleTodoItem.id}
      todoItem={sampleTodoItem}
      handleEditTodoItemClicked={handleEditTodoItemClicked}
      handleDeleteTodoItemClicked={handleDeleteTodoItemClicked}
      toggleTodoItemCompletedState={toggleTodoItemCompletedState}
    />
  );

  const todoItemText = await findTaskListItem();

  expect(todoItemText.textContent).toEqual(sampleTodoItem.name);
});

it("should have checked todo item", async () => {
  const todoItem = {
    ...sampleTodoItem,
    completed: true,
  };

  render(
    <TodoListItemText
      labelId={todoItem.id}
      todoItem={todoItem}
      handleEditTodoItemClicked={handleEditTodoItemClicked}
      handleDeleteTodoItemClicked={handleDeleteTodoItemClicked}
      toggleTodoItemCompletedState={toggleTodoItemCompletedState}
    />
  );

  const listItemCheckbox = await findTaskListItemCheckbox();

  expect(listItemCheckbox.checked).toBeTruthy();
});

it("should have unchecked todo item", async () => {
  const todoItem = {
    ...sampleTodoItem,
    completed: false,
  };

  render(
    <TodoListItemText
      labelId={todoItem.id}
      todoItem={todoItem}
      handleEditTodoItemClicked={handleEditTodoItemClicked}
      handleDeleteTodoItemClicked={handleDeleteTodoItemClicked}
      toggleTodoItemCompletedState={toggleTodoItemCompletedState}
    />
  );

  const listItemCheckbox = await findTaskListItemCheckbox();

  expect(listItemCheckbox.checked).toBeFalsy();
});

it("should check todo item", async () => {
  const todoItem = {
    ...sampleTodoItem,
    completed: false,
  };

  render(
    <TodoListItemText
      labelId={todoItem.id}
      todoItem={todoItem}
      handleEditTodoItemClicked={handleEditTodoItemClicked}
      handleDeleteTodoItemClicked={handleDeleteTodoItemClicked}
      toggleTodoItemCompletedState={toggleTodoItemCompletedState}
    />
  );

  await clickCheckButton();

  expect(toggleTodoItemCompletedState.mock.calls).toHaveLength(1);
  expect(toggleTodoItemCompletedState.mock.calls[0][0]).toBe(todoItem);
});

it("should edit todo item", async () => {
  render(
    <TodoListItemText
      labelId={sampleTodoItem.id}
      todoItem={sampleTodoItem}
      handleEditTodoItemClicked={handleEditTodoItemClicked}
      handleDeleteTodoItemClicked={handleDeleteTodoItemClicked}
      toggleTodoItemCompletedState={toggleTodoItemCompletedState}
    />
  );

  await clickEditButton();

  expect(handleEditTodoItemClicked.mock.calls).toHaveLength(1);
});

it("should delete todo item", async () => {
  render(
    <TodoListItemText
      labelId={sampleTodoItem.id}
      todoItem={sampleTodoItem}
      handleEditTodoItemClicked={handleEditTodoItemClicked}
      handleDeleteTodoItemClicked={handleDeleteTodoItemClicked}
      toggleTodoItemCompletedState={toggleTodoItemCompletedState}
    />
  );

  await clickDeleteButton();

  expect(handleDeleteTodoItemClicked.mock.calls).toHaveLength(1);
  expect(handleDeleteTodoItemClicked.mock.calls[0][0]).toEqual(
    sampleTodoItem.id
  );
});

async function findTaskListItem() {
  return await screen.findByLabelText("task-list-item-text");
}

async function clickCheckButton() {
  const checkButton = await findTaskListItemCheckbox();
  await fireEvent.click(checkButton);
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
