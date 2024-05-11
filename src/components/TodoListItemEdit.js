import { ListItem } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import TextField from "@mui/material/TextField";

export default function TodoListItemEdit({
  labelId,
  todoItem,
  handleFinishEditingTodoItemClicked,
}) {
  return (
    <ListItem
      key={todoItem.id}
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="check"
          onClick={() => handleFinishEditingTodoItemClicked()}
        >
          <CheckIcon />
        </IconButton>
      }
      disablePadding
    >
      <TextField id={labelId} value={todoItem.name} />
    </ListItem>
  );
}
