import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { updateTodoItemById } from "../apis/TodoServiceAPI";
import { deleteTodoItemById } from "../apis/TodoServiceAPI";

export default function TodoListItem({ todoItem, actions }) {
  const labelId = `todo-item-${todoItem.id}`;

  function onTodoItemUpdated(todoItem) {
    actions.handleUpdateTodoItem(todoItem);
  }

  function toggleTodoItemCompletedState(todoItem) {
    const updatedTodoItem = {
      ...todoItem,
      completed: !todoItem.completed,
    };

    updateTodoItemById(todoItem.id, updatedTodoItem, onTodoItemUpdated);
  }

  function onTodoItemDeleted(todoItemId) {
    actions.handleRemoveTodoItem(todoItemId);
  }

  function handleDeleteTodoItemClicked(todoItemId) {
    deleteTodoItemById(todoItemId, onTodoItemDeleted);
  }

  return (
    <ListItem
      key={todoItem.id}
      onClick={() => toggleTodoItemCompletedState(todoItem)}
      secondaryAction={
        <>
          <IconButton edge="end" aria-label="edit">
            <EditIcon />
          </IconButton>
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => handleDeleteTodoItemClicked(todoItem.id)}
          >
            <DeleteIcon />
          </IconButton>
        </>
      }
      disablePadding
    >
      <ListItemButton role={undefined} dense>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={todoItem.completed}
            tabIndex={-1}
            disableRipple
            inputProps={{ "aria-labelledby": labelId }}
          />
        </ListItemIcon>
        <ListItemText id={labelId} primary={todoItem.name} />
      </ListItemButton>
    </ListItem>
  );
}
