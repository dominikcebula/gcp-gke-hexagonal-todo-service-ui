import { render, screen } from "@testing-library/react";
import TodosList from "../TodosList";

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

const actions = {
  handleTodoItemsRetrieved: jest.fn(),
};

jest.mock("../../apis/TodoServiceAPI", () => {
  return {
    getTodoItems: (fn) => {
      fn(sampleTodoItems);
    },
  };
});

it("should display todo items", async () => {
  render(<TodosList todoItems={sampleTodoItems} actions={actions} />);

  const todoItems = await queryAllTaskListItems();
  const todoItemsTextContent = getTextContent(todoItems);

  expect(todoItemsTextContent).toEqual([
    "Buy groceries",
    "Pay utility bills",
    "Clean the garage",
  ]);
});

it("should not display any todo items", async () => {
  render(<TodosList todoItems={[]} actions={actions} />);

  const todoItems = await queryAllTaskListItems();
  const todoItemsTextContent = getTextContent(todoItems);

  expect(todoItemsTextContent).toHaveLength(0);
});

it("should initialize todo items on load", async () => {
  render(<TodosList todoItems={[]} actions={actions} />);

  expect(actions.handleTodoItemsRetrieved.mock.calls).toHaveLength(1);
});

async function queryAllTaskListItems() {
  return screen.queryAllByLabelText("task-list-item-text");
}

function getTextContent(todoItem) {
  return todoItem.map((item) => item.textContent);
}
