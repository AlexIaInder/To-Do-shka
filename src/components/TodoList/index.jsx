import React, { useEffect, useState } from "react";
import { Checkbox, Box, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";
import { Reorder } from "framer-motion";
import { useDebounce } from "../../hooks/useDebounce";

const TodoList = ({ todo, setTodo }) => {
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const debouncedEditValue = useDebounce(editValue, 500);

  const deleteItem = (id) => {
    let newTodo = [...todo].filter((item) => item.id !== id);
    setTodo(newTodo);
  };

  const checkItem = (id) => {
    setTodo(
      todo.reduce((acc, item) => {
        const newItem =
          item.id === id ? { ...item, status: !item.status } : item;

        return [...acc, newItem];
      }, [])
    );
  };

  const editItem = (id, value) => {
    setTodo(
      todo.reduce((acc, item) => {
        const newItem = item.id === id ? { ...item, title: value } : item;

        return [...acc, newItem];
      }, [])
    );
  };

  useEffect(() => {
    if (debouncedEditValue && editId) {
      editItem(editId, debouncedEditValue);
    }
  }, [debouncedEditValue]);

  return (
    <Box>
      <Reorder.Group
        as="ul"
        axys="y"
        values={todo}
        onReorder={setTodo}
        style={{ paddingLeft: "0px" }}
      >
        {todo.map((item) => (
          <Reorder.Item
            value={item}
            key={item.id}
            style={{
              display: "flex",
              border: "solid",
              borderRadius: "15px",
              marginBottom: "10px",
              padding: "0px 10px",
              alignItems: "center",
            }}
            whileDrag={{ scale: 1.2 }}
          >
            <Typography
              contentEditable
              suppressContentEditableWarning
              maxWidth={480}
              onInput={(e) => {
                setEditId(item.id);
                setEditValue(e.target.innerText);
              }}
              variant="h5"
              sx={{
                mr: "auto",
                textDecoration: item.status ? "line-through" : "",
              }}
            >
              {item.title}
            </Typography>

            <Checkbox
              checked={item.status}
              onChange={() => {
                checkItem(item.id);
              }}
              color="success"
            />

            <IconButton aria-label="calendar">
              <InsertInvitationIcon sx={{ color: "#4b61c0" }} />
            </IconButton>

            <IconButton aria-label="delete" onClick={() => deleteItem(item.id)}>
              <DeleteIcon sx={{ color: "#ff3d00" }} />
            </IconButton>
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </Box>
  );
};

export default TodoList;
