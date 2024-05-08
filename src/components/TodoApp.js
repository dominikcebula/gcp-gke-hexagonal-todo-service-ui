import Container from "@mui/material/Container";
import AppTopBar from "./AppTopBar";
import CreateTodoItem from "./CreateTodoItem";
import TodosList from "./TodosList";

export default function TodoApp({ todoItems, actions }) {
  return (
    <>
      <AppTopBar />
      <Container maxWidth="sm" sx={{ marginTop: "1rem" }}>
        <CreateTodoItem actions={actions} />
        <TodosList todoItems={todoItems} actions={actions} />
      </Container>
    </>
  );
}
