import { enqueueSnackbar, closeSnackbar } from "notistack";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export function getTodoItems(onTodoItemsRetrieved) {
  axios
    .get("/todos")
    .then((response) => expectStatusCode(response, 200))
    .then((response) => onTodoItemsRetrieved(response.data))
    .catch((error) => {
      handleError("Error occurred while fetching todo items.", error);
    });
}

export function createTodoItem(todoItem, onTodoItemCreated) {
  axios
    .post("/todos", todoItem)
    .then((response) => expectStatusCode(response, 201))
    .then((response) => onTodoItemCreated(response.data))
    .catch((error) => {
      handleError("Error occurred while creating todo item.", error);
    });
}

export function updateTodoItemById(
  todoItemId,
  todoItemData,
  onTodoItemUpdated
) {
  axios
    .put(`/todos/${todoItemId}`, todoItemData)
    .then((response) => expectOneOfStatusCodes(response, [200, 201]))
    .then((response) => onTodoItemUpdated(response.data))
    .catch((error) => {
      handleError("Error occurred while updating todo item.", error);
    });
}

export function deleteTodoItemById(todoItemId, onTodoItemDeleted) {
  axios
    .delete(`/todos/${todoItemId}`)
    .then((response) => expectStatusCode(response, 204))
    .then((response) => onTodoItemDeleted(todoItemId))
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
