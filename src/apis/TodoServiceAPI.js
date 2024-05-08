export function getTodos(handleResponse) {
  fetch("/todos")
    .then((response) => response.json())
    .then((data) => handleResponse(data))
    .catch((error) => {
      console.error("Error occurred while fetching todo items.", error);
    });
}
