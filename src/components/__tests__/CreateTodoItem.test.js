import CreateTodoItem from "../CreateTodoItem";
import { render, screen } from "@testing-library/react";

test("should render create todo item", async () => {
  render(<CreateTodoItem />);

  const createTodoItemTextField = await findCreateTodoItemTextField();
  const createTodoItemButton = await findCreateTodoItemButton();

  expect(createTodoItemTextField).toBeDefined();
  expect(createTodoItemButton).toBeDefined();
});

async function findCreateTodoItemTextField() {
  return await screen.findByLabelText("Enter new task here...");
}

async function findCreateTodoItemButton() {
  return await screen.findByText("Add");
}
