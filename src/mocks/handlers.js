import { rest } from "msw";
import { randomUUID } from "crypto";
import { stat } from "fs";

const initialState = [
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

let state = initialState;

export function resetState() {
  state = initialState;
}

export const handlers = [
  rest.get("/todos", async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(state));
  }),
  rest.post("/todos", async (req, res, ctx) => {
    const body = await req.json();
    const newTodoItem = {
      ...body,
      id: randomUUID(),
    };

    appendTodoItem(newTodoItem);

    return res(ctx.status(201), ctx.json(newTodoItem));
  }),
  rest.put("/todos/:todoId", async (req, res, ctx) => {
    const todoId = req.params.todoId;
    const body = await req.json();

    if (containsTodoItemId(todoId)) {
      updateExistingItem(body, todoId);

      return res(ctx.status(200), ctx.json(body));
    } else {
      const newTodoItem = {
        ...body,
        id: todoId,
      };

      appendTodoItem(newTodoItem);

      return res(ctx.status(201), ctx.json(body));
    }
  }),
];

function containsTodoItemId(todoItemId) {
  return state.map((item) => item.id).includes(todoItemId);
}

function appendTodoItem(newTodoItem) {
  state = [...state, newTodoItem];
}

function updateExistingItem(body, todoId) {
  state = state.map((item) => {
    if (item.id === body.id) {
      return {
        ...body,
        id: todoId,
      };
    } else {
      return item;
    }
  });
}
