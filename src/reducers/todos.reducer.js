import * as React from "react";

const initialState = [
  { id: 1, name: "Buy groceries", completed: false },
  { id: 2, name: "Finish report for work presentation", completed: true },
  { id: 3, name: "Renew library books", completed: false },
  { id: 4, name: "Pay utility bills", completed: true },
  { id: 5, name: "Clean the garage", completed: false },
];

const actions = {
  TODO_ITEM_ADDED: "TODO_ITEM_ADDED",
};

function todosReducer(state, action) {
  switch (action.id) {
    case actions.TODO_ITEM_ADDED:
      return todoItemAdded(state, action);
    default:
      return state;
  }
}

function todoItemAdded(state, action) {
  return state;
}

export function useTodosReducer() {
  const [state, dispatch] = React.useReducer(todosReducer, initialState);

  function handleAddTodoItem(todoItemName) {
    dispatch({
      id: actions.TODO_ITEM_ADDED,
      todoItemName: todoItemName,
    });
  }

  return {
    todoItems: state,
    actions: {
      handleAddTodoItem,
    },
  };
}
