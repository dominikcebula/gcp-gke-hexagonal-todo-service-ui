import { screen, render, within, fireEvent } from "@testing-library/react";
import TodoListItemEdit from "../TodoListItemEdit";

const sampleTodoItem = {
  id: "9af9499f-d7eb-458d-94d0-02ce809dc904",
  name: "Buy groceries",
  completed: true,
};

const handleFinishEditingTodoItemClicked = jest.fn();

it("should render text field for todo item", async () => {
  render(
    <TodoListItemEdit
      labelId={sampleTodoItem.id}
      todoItem={sampleTodoItem}
      handleFinishEditingTodoItemClicked={handleFinishEditingTodoItemClicked}
    />
  );

  const editField = await findEditTextField();

  expect(editField.value).toEqual(sampleTodoItem.name);
});

it("should change text field value", async () => {
  render(
    <TodoListItemEdit
      labelId={sampleTodoItem.id}
      todoItem={sampleTodoItem}
      handleFinishEditingTodoItemClicked={handleFinishEditingTodoItemClicked}
    />
  );

  const editField = await findEditTextField();
  await setValueInTextField(editField, "Clean the garage");
  await clickCheckButton();

  expect(editField.value).toEqual("Clean the garage");
});

it("should finishing editing without changing the value", async () => {
  render(
    <TodoListItemEdit
      labelId={sampleTodoItem.id}
      todoItem={sampleTodoItem}
      handleFinishEditingTodoItemClicked={handleFinishEditingTodoItemClicked}
    />
  );

  const editField = await findEditTextField();
  await clickCheckButton();

  expect(editField.value).toEqual(sampleTodoItem.name);
  expect(handleFinishEditingTodoItemClicked.mock.calls).toHaveLength(1);
  expect(handleFinishEditingTodoItemClicked.mock.calls[0][0]).toBe(
    sampleTodoItem.name
  );
});

it("should finishing editing with changing the value", async () => {
  render(
    <TodoListItemEdit
      labelId={sampleTodoItem.id}
      todoItem={sampleTodoItem}
      handleFinishEditingTodoItemClicked={handleFinishEditingTodoItemClicked}
    />
  );

  const editField = await findEditTextField();
  await setValueInTextField(editField, "Clean the garage");
  await clickCheckButton();

  expect(editField.value).toEqual("Clean the garage");
  expect(handleFinishEditingTodoItemClicked.mock.calls).toHaveLength(1);
  expect(handleFinishEditingTodoItemClicked.mock.calls[0][0]).toBe(
    "Clean the garage"
  );
});

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
