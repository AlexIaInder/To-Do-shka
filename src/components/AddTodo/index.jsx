import React, { useState } from "react";
import { TextField, Box, Button, Stack } from "@mui/material";
import { nanoid } from "nanoid";

const AddTodo = ({ todo, setTodo }) => {
  const [value, setValue] = useState("");

  function saveTodo() {
    if (value === "") {
      return;
    }
    setTodo([
      ...todo,
      {
        id: nanoid(),
        title: value,
        status: false,
      },
    ]);
    setValue("");
  }

  return (
    <Stack direction="row" mb={3}>
      <Box flexGrow={1}>
        <TextField
          fullWidth
          id="filled-basic"
          label="Task"
          variant="filled"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </Box>

      <Button variant="contained" color="success" onClick={saveTodo}>
        <span style={{ fontSize: "25px" }}>+</span>
      </Button>
    </Stack>
  );
};

export default AddTodo;
