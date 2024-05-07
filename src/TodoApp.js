import Container from "@mui/material/Container";
import AppTopBar from "./AppTopBar";
import CreateTodoItem from "./CreateTodoItem";
import TodosList from "./TodosList";

export default function TodoApp() {
  return (
    <>
      <AppTopBar />
      <Container maxWidth="sm" sx={{ marginTop: "1rem" }}>
        <CreateTodoItem />
        <TodosList />
      </Container>
    </>
  );
}
