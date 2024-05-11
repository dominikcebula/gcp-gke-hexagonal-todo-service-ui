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
      console.error("Error occurred while fetching todo items.", error);
    });
}
