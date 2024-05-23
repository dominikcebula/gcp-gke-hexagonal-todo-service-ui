import { render, screen } from "@testing-library/react";
import TodoApp from "../TodoApp";

const sampleTodoItems = [
  {
    id: "9af9499f-d7eb-458d-94d0-02ce809dc904",
    name: "Buy groceries",
    completed: true,
  },
  {
    id: "8003ab58-5d8e-4244-b564-4915f1c18cb5",
    name: "Pay utility bills",
    completed: false,
  },
  {
    id: "d758a2d0-433c-4ce2-a21b-6dc1a84813b1",
    name: "Clean the garage",
    completed: true,
  },
];

jest.mock("../../apis/TodoServiceAPI", () => {
  return {
    getTodoItems: (fn) => {
      fn(sampleTodoItems);
    },
  };
});

const actions = {
  handleTodoItemsRetrieved: jest.fn(),
};

it("should display app with todo items", async () => {
  render(<TodoApp todoItems={sampleTodoItems} actions={actions} />);

  const todoItems = await queryAllTaskListItems();
  const todoItemsTextContent = getTextContent(todoItems);

  expect(todoItemsTextContent).toEqual([
    "Buy groceries",
    "Pay utility bills",
    "Clean the garage",
  ]);
});

it("should display create todo item field", async () => {
  render(<TodoApp todoItems={sampleTodoItems} actions={actions} />);

  const createTodoItemTextField = await queryForCreateTodoItemTextField();

  expect(createTodoItemTextField).toBeDefined();
});

it("should display top bar", async () => {
  render(<TodoApp todoItems={sampleTodoItems} actions={actions} />);

  const topBar = await queryForTopBar();

  expect(topBar).toBeDefined();
});

async function queryAllTaskListItems() {
  return screen.queryAllByLabelText("task-list-item-text");
}

function getTextContent(todoItem) {
  return todoItem.map((item) => item.textContent);
}

async function queryForCreateTodoItemTextField() {
  return await screen.queryByLabelText("Enter new task here...");
}

async function queryForTopBar() {
  return await screen.queryByText("Todo App");
}
