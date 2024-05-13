import CreateTodoItem from "../CreateTodoItem";
import { render, screen, fireEvent } from "@testing-library/react";
import * as api from "../../apis/TodoServiceAPI";

jest.mock("../../apis/TodoServiceAPI");
api.createTodoItem.mockImplementation((todoItem, onTodoItemCreated) =>
  onTodoItemCreated({
    ...todoItem,
    id: 12,
  })
);
const mockActions = {
  handleAddTodoItemMock: jest.fn(),
};

test("should render create todo item", async () => {
  render(<CreateTodoItem actions={mockActions} />);

  const createTodoItemTextField = await findCreateTodoItemTextField();
  const createTodoItemButton = await findCreateTodoItemButton();

  expect(createTodoItemTextField).toBeDefined();
  expect(createTodoItemButton).toBeDefined();
});

test("should set name of the new task in text field", async () => {
  render(<CreateTodoItem actions={mockActions} />);

  const createTodoItemTextField = await findCreateTodoItemTextField();

  await fireEvent.change(createTodoItemTextField, {
    target: { value: "Pay utility bills" },
  });

  expect(createTodoItemTextField.value).toEqual("Pay utility bills");
});

test("should create a new todo item", async () => {
  render(<CreateTodoItem actions={mockActions} />);

  const createTodoItemTextField = await findCreateTodoItemTextField();
  const createTodoItemButton = await findCreateTodoItemButton();

  await fireEvent.change(createTodoItemTextField, {
    target: { value: "Pay utility bills" },
  });
  await fireEvent.click(createTodoItemButton);

  expect(api.createTodoItem.mock.calls).toHaveLength(1);
  expect(api.createTodoItem.mock.calls[0][0]).toEqual({
    name: "Pay utility bills",
    completed: false,
  });
});

async function findCreateTodoItemTextField() {
  return await screen.findByLabelText("Enter new task here...");
}

async function findCreateTodoItemButton() {
  return await screen.findByText("Add");
}
