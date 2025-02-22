import listApi from "@/api/listApi";
import taskApi from "@/api/taskApi";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { DeleteIcon, PlusIcon } from "lucide-react";
import TaskModal from "./TaskModal";
let timer;
const timeout = 500;

const Kanban = ({ data, boardId }) => {
  const [lists, setLists] = useState([]);
  const [selectedTask, setSelectedTask] = useState(undefined);

  useEffect(() => {
    setLists(data);
  }, [data]);

  const createList = async () => {
    try {
      console.log(boardId);
      const list = await listApi.createList(boardId);
      setLists([...data, list]);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteList = async (listId) => {
    try {
      await listApi.deleteList(boardId, listId);
      const newLists = [...data].filter((e) => e.id !== listId);
      setLists(newLists);
    } catch (error) {
      console.error(error);
    }
  };

  const updateListTitle = async (e, listId) => {
    clearTimeout(timer);
    const newTitle = e.target.value;
    const newLists = [...data];
    const index = newLists.findIndex((e) => e.id === listId);
    newLists[index].title = newTitle;
    setLists(newLists);
    timer = setTimeout(async () => {
      try {
        await listApi.updateList(boardId, listId, { title: newTitle });
      } catch (error) {
        console.error(error);
      }
    }, timeout);
  };

  const createTask = async (listId) => {
    try {
      const task = await taskApi.createTask(boardId, { listId });
      const newLists = [...data];
      const index = newLists.findIndex((e) => e.id === listId);
      newLists[index].tasks.unshift(task);
      setLists(newLists);
    } catch (error) {
      console.error(error);
    }
  };

  const onUpdateTask = (task) => {
    const newLists = [...data];
    const listIndex = newLists.findIndex((e) => e.id === task.list.id);
    const taskIndex = newLists[listIndex].tasks.findIndex(
      (e) => e.id === task.id
    );
    newLists[listIndex].tasks[taskIndex] = task;
    setLists(newLists);
  };

  const onDeleteTask = (task) => {
    const newLists = [...data];
    const listIndex = newLists.findIndex((e) => e.id === task.list.id);
    const taskIndex = newLists[listIndex].tasks.findIndex(
      (e) => e.id === task.id
    );
    newLists[listIndex].tasks.splice(taskIndex, 1);
    setLists(newLists);
  };
  return (
    <>
      <div className="flex items-center justify-center w-full">
        <Button onClick={createList}>Add List</Button>
        <h2 className="text-2xl font-bold">{data.length} lists</h2>
      </div>
      {data.map((list) => (
        <div key={list.id} className="w-[300px]">
          <div className="w-300px p-2 mr-2">
            <div className="flex items-center justify-center mb-2">
              <Input
                value={list.title}
                onChange={(e) => updateListTitle(e, list.id)}
                placeholder="Untitled"
                className="text-lg font-bold"
              />
              <Button variant="outline">
                <PlusIcon onClick={() => createList(list.id)} />
              </Button>
              <Button variant="outline">
                <DeleteIcon onClick={() => deleteList(list.id)} />
              </Button>
            </div>
            {list.tasks.map((task, index) => (
              <div className="p-2 mb-2" onClick={() => setSelectedTask(task)}>
                <h3>{task.title === "" ? "Untitled" : task.title}</h3>
              </div>
            ))}
          </div>
        </div>
      ))}
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
