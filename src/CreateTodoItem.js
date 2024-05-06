import * as React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

export default function CreateTodoItem() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={10}>
        <TextField
          label="Enter new task here..."
          id="fullWidth"
          variant="standard"
          sx={{ width: "100%", height: "100%" }}
        />
      </Grid>
      <Grid item xs={2}>
        <Button variant="contained">Add</Button>
      </Grid>
    </Grid>
  );
}
