import taskApi from "@/api/taskApi";
import React, { useEffect, useRef, useState } from "react";

let timer;
const timeout = 500;
const TaskModal = (props) => {
  const { boardId } = props.boardId;
  const [task, setTask] = useState(props.task);
  const [title, setTile] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setTask(props.stask);
    setTile(props.stask !== undefined ? props.task.title : "");
    setDescription(props.task !== undefined ? props.task.description : "");
  }, [props.task]);

  const deleteTask = async () => {
    try {
      await taskApi.deleteTask(boardId, task.id);
      props.onDelete(task);
      setTask(undefined);
    } catch (error) {
      console.error(error);
    }
  };

  const updateTitle = async (e) => {
    clearTimeout(timer);
    const newTitle = e.target.value;
    timer = setTimeout(async () => {
      try {
        await taskApi.updateTask(boardId, task.id, { title: newTitle });
      } catch (error) {
        console.error(error);
      }
    }, timeout);
  };

  const updateDescription = async (e) => {
    clearTimeout(timer);
  };
  return (
    <div className="p-2 border rounded-md bg-white shadow">
      <h3 className="font-semibold"></h3>
      <p className="text-sm text-gray-600"></p>
    </div>
  );
};

export default TaskModal;
