export function getTodoItems(onTodoItemsRetrieved) {
  fetch("/todos")
    .then((response) => response.json())
    .then((data) => onTodoItemsRetrieved(data))
    .catch((error) => {
      console.error("Error occurred while fetching todo items.", error);
    });
}

export function createTodoItem(todoItem, onTodoItemCreated) {
  fetch("/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todoItem),
  })
    .then((response) => response.json())
    .then((data) => onTodoItemCreated(data))
    .catch((error) => {
      console.error("Error occurred while creating todo item.", error);
    });
}

export function updateTodoItemById(
  todoItemId,
  todoItemData,
  onTodoItemUpdated
) {
  fetch(`/todos/${todoItemId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todoItemData),
  })
    .then((response) => response.json())
    .then((data) => onTodoItemUpdated(data))
    .catch((error) => {
      console.error("Error occurred while updating todo item.", error);
    });
}

export function deleteTodoItemById(todoItemId, onTodoItemDeleted) {
  fetch(`/todos/${todoItemId}`, {
    method: "DELETE",
  })
    .then((data) => onTodoItemDeleted(todoItemId))
    .catch((error) => {
      console.error("Error occurred while deleting todo item.", error);
    });
}
