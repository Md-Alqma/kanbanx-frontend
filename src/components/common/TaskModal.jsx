import {
  Backdrop,
  Fade,
  IconButton,
  Modal,
  Box,
  TextField,
  Typography,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import Moment from "moment";
import taskApi from "../../api/taskApi";

import "../../css/custom-editor.css";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

const modalStyle = {
  outline: "none",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  border: "0px solid #000",
  boxShadow: 24,
  p: 1,
  height: "80%",
};

let timer;
const timeout = 500;
let isModalClosed = false;

const TaskModal = (props) => {
  const boardId = props.boardId;
  const [task, setTask] = useState(props.task);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [dueDate, setDueDate] = useState(Moment(Date.now()));
  const [priority, setPriority] = useState("");
  const editorWrapperRef = useRef();

  useEffect(() => {
    setTask(props.task);
    setTitle(props.task !== undefined ? props.task.title : "");
    setContent(props.task !== undefined ? props.task.content : "");
    if (props.task !== undefined) {
      isModalClosed = false;

      updateEditorHeight();
    }
  }, [props.task]);

  const updateEditorHeight = () => {
    setTimeout(() => {
      if (editorWrapperRef.current) {
        const box = editorWrapperRef.current;
        box.querySelector(".ck-editor__editable_inline").style.height =
          box.offsetHeight - 50 + "px";
      }
    }, timeout);
  };

  const onClose = () => {
    isModalClosed = true;
    props.onUpdate(task);
    props.onClose();
  };

  const deleteTask = async () => {
    try {
      await taskApi.delete(boardId, task.id);
      props.onDelete(task);
      setTask(undefined);
    } catch (err) {
      console.error(err);
    }
  };

  const updateTitle = async (e) => {
    clearTimeout(timer);
    const newTitle = e.target.value;
    timer = setTimeout(async () => {
      try {
        await taskApi.update(boardId, task.id, { title: newTitle });
      } catch (err) {
        console.error(err);
      }
    }, timeout);

    task.title = newTitle;
    setTitle(newTitle);
    props.onUpdate(task);
  };

  const updateContent = async (e) => {
    clearTimeout(timer);
    const newContent = e.target.value;
    if (!isModalClosed) {
      timer = setTimeout(async () => {
        try {
          await taskApi.update(boardId, task.id, { content: newContent });
        } catch (err) {
          console.error(err);
        }
      }, timeout);

      task.content = newContent;
      setContent(newContent);
      props.onUpdate(task);
    }
  };

  const updateDueDate = async (newDueDate) => {
    clearTimeout(timer);
    if (!isModalClosed) {
      timer = setTimeout(async () => {
        try {
          await taskApi.update(boardId, task.id, { dueDate: newDueDate });
        } catch (err) {
          console.error(err);
        }
      }, timeout);

      task.dueDate = newDueDate;
      setDueDate(newDueDate);
      props.onUpdate(task);
    }
  };

  const updatePriority = (e) => {
    clearTimeout(timer);
    const newPriority = e.target.value;
    if (!isModalClosed) {
      timer = setTimeout(async () => {
        try {
          await taskApi.update(boardId, task.id, { priority: newPriority });
        } catch (err) {
          console.error(err);
        }
      }, timeout);

      task.priority = newPriority;
      setPriority(newPriority);
      props.onUpdate(task);
    }
  };

  return (
    <Modal
      open={task !== undefined}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={task !== undefined}>
        <Box sx={modalStyle}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            <IconButton variant="outlined" color="error" onClick={deleteTask}>
              <DeleteOutlinedIcon />
            </IconButton>
          </Box>
          <Box
            sx={{
              display: "flex",
              height: "100%",
              flexDirection: "column",
              padding: "2rem 5rem 5rem",
            }}
          >
            <TextField
              value={title}
              onChange={updateTitle}
              placeholder="Untitled"
              variant="outlined"
              fullWidth
              sx={{
                width: "100%",
                "& .MuiOutlinedInput-input": { padding: 0 },
                "& .MuiOutlinedInput-notchedOutline": { border: "unset " },
                "& .MuiOutlinedInput-root": {
                  fontSize: "2.5rem",
                  fontWeight: "700",
                },
                marginBottom: "10px",
              }}
            />

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              {task !== undefined && (
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DatePicker
                    value={dueDate}
                    label="Due date"
                    onChange={(newValue) => updateDueDate(newValue)}
                    shouldDisableDate={(date) =>
                      Moment(date).isBefore(Moment(), "day")
                    }
                  />
                </LocalizationProvider>
              )}
              <Box>
                {task !== undefined && (
                  <FormControl sx={{ minWidth: 120 }}>
                    <InputLabel id="priority-label">Priority</InputLabel>
                    <Select
                      labelId="priority-label"
                      id="priority"
                      value={task.priority}
                      onChange={updatePriority}
                      label="Priority"
                    >
                      <MenuItem value="low">Low</MenuItem>
                      <MenuItem value="medium">Medium</MenuItem>
                      <MenuItem value="high">High</MenuItem>
                    </Select>
                  </FormControl>
                )}
              </Box>
            </Box>

            <Divider sx={{ margin: "1.5rem 0" }} />
            <TextField
              value={content}
              onChange={updateContent}
              placeholder="Add task content"
              variant="outlined"
              fullWidth
              multiline
              sx={{
                width: "100%",
                "& .MuiOutlinedInput-input": { padding: 0 },
                "& .MuiOutlinedInput-notchedOutline": { border: "unset " },
                "& .MuiOutlinedInput-root": {
                  fontSize: "1rem",
                  fontWeight: "500",
                },
                marginBottom: "10px",
              }}
            />
          </Box>
          <Button
            sx={{
              position: "absolute",
              right: "1rem",
              bottom: "1.5rem",
            }}
            onClick={onClose}
            variant="outlined"
          >
            Update Task
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
};

export default TaskModal;
