import * as React from "react";

const initialState = [
  { id: 1, name: "Buy groceries", completed: false },
  { id: 2, name: "Finish report for work presentation", completed: true },
  { id: 3, name: "Renew library books", completed: false },
  { id: 4, name: "Pay utility bills", completed: true },
  { id: 5, name: "Clean the garage", completed: false },
];

function todosReducer(state, action) {
  switch (action) {
    default:
      return state;
  }
}

export function useTodosReducer() {
  return React.useReducer(todosReducer, initialState);
}
