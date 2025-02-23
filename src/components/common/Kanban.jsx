import {
  Box,
  Button,
  Typography,
  Divider,
  TextField,
  IconButton,
  Card,
  Tooltip,
  Chip,
  Badge,
} from "@mui/material";
import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import listApi from "../../api/listApi";
import taskApi from "../../api/taskApi";
import TaskModal from "./TaskModal";
import { DescriptionOutlined } from "@mui/icons-material";
import { CalendarIcon } from "@mui/x-date-pickers";
import Moment from "moment";

let timer;
const timeout = 500;

const Kanban = (props) => {
  const boardId = props.boardId;
  const [data, setData] = useState([]);
  const [selectedTask, setSelectedTask] = useState(undefined);

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  const onDragEnd = async ({ source, destination }) => {
    if (!destination) return;
    const sourceColIndex = data.findIndex((e) => e.id === source.droppableId);
    const destinationColIndex = data.findIndex(
      (e) => e.id === destination.droppableId
    );
    const sourceCol = data[sourceColIndex];
    const destinationCol = data[destinationColIndex];

    const sourceListId = sourceCol.id;
    const destinationListId = destinationCol.id;

    const sourceTasks = [...sourceCol.tasks];
    const destinationTasks = [...destinationCol.tasks];

    if (source.droppableId !== destination.droppableId) {
      const [removed] = sourceTasks.splice(source.index, 1);
      destinationTasks.splice(destination.index, 0, removed);
      data[sourceColIndex].tasks = sourceTasks;
      data[destinationColIndex].tasks = destinationTasks;
    } else {
      const [removed] = destinationTasks.splice(source.index, 1);
      destinationTasks.splice(destination.index, 0, removed);
      data[destinationColIndex].tasks = destinationTasks;
    }

    try {
      await taskApi.updatePosition(boardId, {
        resourceList: sourceTasks,
        destinationList: destinationTasks,
        resourceListId: sourceListId,
        destinationListId: destinationListId,
      });
      setData(data);
    } catch (err) {
      console.error(err);
    }
  };

  const createList = async () => {
    try {
      const list = await listApi.create(boardId);
      setData([...data, list]);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteList = async (listId) => {
    try {
      await listApi.delete(boardId, listId);
      const newData = [...data].filter((e) => e.id !== listId);
      setData(newData);
    } catch (err) {
      console.error(err);
    }
  };

  const updateListTitle = async (e, listId) => {
    clearTimeout(timer);
    const newTitle = e.target.value;
    const newData = [...data];
    const index = newData.findIndex((e) => e.id === listId);
    newData[index].title = newTitle;
    setData(newData);
    timer = setTimeout(async () => {
      try {
        await listApi.update(boardId, listId, { title: newTitle });
      } catch (err) {
        console.error(err);
      }
    }, timeout);
  };

  const createTask = async (listId) => {
    try {
      const task = await taskApi.create(boardId, { listId });
      const newData = [...data];
      const index = newData.findIndex((e) => e.id === listId);
      newData[index].tasks.unshift(task);
      setData(newData);
    } catch (err) {
      console.error(err);
    }
  };

  const onUpdateTask = (task) => {
    const newData = [...data];
    const listIndex = newData.findIndex((e) => e.id === task.list.id);
    const taskIndex = newData[listIndex].tasks.findIndex(
      (e) => e.id === task.id
    );
    newData[listIndex].tasks[taskIndex] = task;
    setData(newData);
  };

  const onDeleteTask = (task) => {
    const newData = [...data];
    const listIndex = newData.findIndex((e) => e.id === task.list.id);
    const taskIndex = newData[listIndex].tasks.findIndex(
      (e) => e.id === task.id
    );
    newData[listIndex].tasks.splice(taskIndex, 1);
    setData(newData);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Button onClick={createList}>Add list</Button>
        <Typography variant="body2" fontWeight="700">
          {data.length} Lists
        </Typography>
      </Box>
      <Divider sx={{ margin: "10px 0" }} />
      <DragDropContext onDragEnd={onDragEnd}>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            width: "calc(100vw - 400px)",
            overflowX: "auto",
          }}
        >
          {data.map((list) => (
            <div key={list.id} style={{ width: "300px" }}>
              <Droppable key={list.id} droppableId={list.id}>
                {(provided) => (
                  <Box
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    sx={{
                      width: "300px",
                      padding: "10px",
                      marginRight: "10px",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "10px",
                      }}
                    >
                      <TextField
                        value={list.title}
                        onChange={(e) => updateListTitle(e, list.id)}
                        placeholder="Untitled"
                        variant="outlined"
                        sx={{
                          flexGrow: 1,
                          "& .MuiOutlinedInput-input": { padding: 0 },
                          "& .MuiOutlinedInput-notchedOutline": {
                            border: "unset ",
                          },
                          "& .MuiOutlinedInput-root": {
                            fontSize: "1rem",
                            fontWeight: "700",
                          },
                        }}
                      />
                      <IconButton
                        variant="outlined"
                        size="small"
                        sx={{
                          color: "gray",
                          "&:hover": { color: "green" },
                        }}
                        onClick={() => createTask(list.id)}
                      >
                        <AddOutlinedIcon />
                      </IconButton>
                      <IconButton
                        variant="outlined"
                        size="small"
                        sx={{
                          color: "gray",
                          "&:hover": { color: "red" },
                        }}
                        onClick={() => deleteList(list.id)}
                      >
                        <DeleteOutlinedIcon />
                      </IconButton>
                    </Box>
                    {/* tasks */}
                    {list.tasks.map((task, index) => {
                      const getBadgeColor = (priority) => {
                        switch (priority) {
                          case "low":
                            return "success"; // Green
                          case "medium":
                            return "warning"; // Yellow
                          case "high":
                            return "error"; // Red
                          default:
                            return "default"; // Grey
                        }
                      };
                      const getBadgeTitle = (priority) => {
                        switch (priority) {
                          case "low":
                            return "Low"; // Green
                          case "medium":
                            return "Medium"; // Yellow
                          case "high":
                            return "error"; // Red
                          default:
                            return "High"; // Grey
                        }
                      };
                      return (
                        <Draggable
                          key={task.id}
                          draggableId={task.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <Card
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-evenly",
                                padding: "10px",
                                marginBottom: "10px",
                                cursor: snapshot.isDragging
                                  ? "grab"
                                  : "pointer!important",
                              }}
                              onClick={() => setSelectedTask(task)}
                            >
                              <Typography>
                                {task.title === "" ? "Untitled" : task.title}
                              </Typography>
                              <Tooltip title="Content">
                                <IconButton>
                                  <DescriptionOutlined />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Due Date">
                                <Chip
                                  variant="outlined"
                                  color="info"
                                  size="default"
                                  label={Moment(task.dueDate).format(
                                    "DD-MM-YYYY"
                                  )}
                                />
                              </Tooltip>
                              <Tooltip title={getBadgeTitle(task.priority)}>
                                <Badge
                                  badgeContent=""
                                  color={getBadgeColor(task.priority)}
                                />
                              </Tooltip>
                            </Card>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>
            </div>
          ))}
        </Box>
      </DragDropContext>
      <TaskModal
        task={selectedTask}
        boardId={boardId}
        onClose={() => setSelectedTask(undefined)}
        onUpdate={onUpdateTask}
        onDelete={onDeleteTask}
      />
    </>
  );
};

export default Kanban;
