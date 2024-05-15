import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function TodoListItemText({
  labelId,
  todoItem,
  handleEditTodoItemClicked,
  handleDeleteTodoItemClicked,
  toggleTodoItemCompletedState,
}) {
  return (
    <ListItem
      aria-label="task-list-item"
      key={todoItem.id}
      secondaryAction={
        <>
          <IconButton
            edge="end"
            aria-label="edit"
            onClick={() => handleEditTodoItemClicked()}
          >
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
            aria-label="task-list-item-checkbox"
            edge="start"
            checked={todoItem.completed}
            onClick={() => toggleTodoItemCompletedState(todoItem)}
            tabIndex={-1}
            disableRipple
            inputProps={{ "aria-labelledby": labelId }}
          />
        </ListItemIcon>
        <ListItemText aria-label="task-list-item-text" id={labelId} primary={todoItem.name} />
      </ListItemButton>
    </ListItem>
  );
}
