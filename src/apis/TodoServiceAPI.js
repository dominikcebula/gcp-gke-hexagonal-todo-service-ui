import { enqueueSnackbar, closeSnackbar } from "notistack";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export function getTodoItems(onTodoItemsRetrieved) {
  fetch("/todos")
    .then((response) => expectStatusCode(response, 200))
    .then((response) => response.json())
    .then((data) => onTodoItemsRetrieved(data))
    .catch((error) => {
      handleError("Error occurred while fetching todo items.", error);
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
    .then((response) => expectStatusCode(response, 201))
    .then((response) => response.json())
    .then((data) => onTodoItemCreated(data))
    .catch((error) => {
      handleError("Error occurred while creating todo item.", error);
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
    .then((response) => expectOneOfStatusCodes(response, [200, 201]))
    .then((response) => response.json())
    .then((data) => onTodoItemUpdated(data))
    .catch((error) => {
      handleError("Error occurred while updating todo item.", error);
    });
}

export function deleteTodoItemById(todoItemId, onTodoItemDeleted) {
  fetch(`/todos/${todoItemId}`, {
    method: "DELETE",
  })
    .then((response) => expectStatusCode(response, 204))
    .then((data) => onTodoItemDeleted(todoItemId))
    .catch((error) => {
      handleError("Error occurred while deleting todo item.", error);
    });
}

function expectStatusCode(response, statusCode) {
  if (response.status !== statusCode)
    throw new Error(
      `Expected status code ${statusCode}, got ${response.statusCode}`
    );

  return response;
}

function expectOneOfStatusCodes(response, statusCodes) {
  if (!statusCodes.includes(response.status))
    throw new Error(
      `Expected status code to be one of ${statusCodes}, got ${response.statusCode}`
    );

  return response;
}

function handleError(errorMessage, error) {
  const action = (snackbarId) => (
    <>
      <IconButton aria-label="delete" onClick={() => closeSnackbar(snackbarId)}>
        <CloseIcon />
      </IconButton>
    </>
  );

  console.error(errorMessage, error);
  enqueueSnackbar(errorMessage, { variant: "error", action });
}
