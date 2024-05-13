import { ListItem } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import TextField from "@mui/material/TextField";
import { useState } from "react";

export default function TodoListItemEdit({
  labelId,
  todoItem,
  handleFinishEditingTodoItemClicked,
}) {
  const [todoItemName, setTodoItemName] = useState(todoItem.name);

  return (
    <ListItem
      key={todoItem.id}
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="check"
          onClick={() => handleFinishEditingTodoItemClicked(todoItemName)}
        >
          <CheckIcon />
        </IconButton>
      }
      disablePadding
    >
      <TextField
        id={labelId}
        value={todoItemName}
        aria-label="todo-item-new-name"
        onChange={(event) => setTodoItemName(event.target.value)}
      />
    </ListItem>
  );
}
