import React, { useEffect, useState } from "react";
import { Card, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import useTaskStore from "@/store/taskStore";
import useListStore from "@/store/listStore";
import { Task } from "./Task";

export const List = ({ title, listId, boardId }) => {
  const [list, setList] = useState({
    title: "",
  });
  const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",
    priority: "",
  });
  const { singleList, loading } = useListStore();
  const { addTask } = useTaskStore();

  useEffect(() => {
    if (listId) {
      singleList(listId);
    }
  }, [listId]);

  const handleChange = (e) => {
    setTaskForm({ ...taskForm, [e.target.name]: e.target.value });
  };

  const handleTask = async (e) => {
    e.preventDefault();
    await addTask(
      listId,
      taskForm.title,
      taskForm.description,
      taskForm.priority
    );
    singleList(listId);
  };

  if (loading) return <p>Loading...</p>;

  if (!list) return <p>No List Found</p>;

  return (
    <Card className="px-16 text-center">
      <CardHeader className="text-lg font-semibold">{title}</CardHeader>
      {list.tasks ? (
        <>
          {list.tasks.map((task) => (
            <Task title={task.title} />
          ))}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Add Task</Button>
            </DialogTrigger>
            {/* <form onSubmit={(e) => handleTask(e)}> */}
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Task</DialogTitle>
                <DialogDescription>Add tasks to your list</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={taskForm.title}
                    onChange={handleChange}
                    placeholder="sample task"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-2">
                  <Label htmlFor="description" className="text-left">
                    Description
                  </Label>
                  <Textarea
                    id="desciption"
                    name="description"
                    value={taskForm.description}
                    onChange={handleChange}
                    placeholder="sample description"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Select>
                    <SelectGroup>
                      <SelectLabel className="text-left">Priority</SelectLabel>
                    </SelectGroup>

                    <SelectTrigger className="w-[150px]">
                      <SelectValue
                        placeholder="Select priority"
                        value={taskForm.priority}
                        onChange={handleChange}
                        name="priority"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <DialogFooter>
                <Button onClick={handleTask}>Add Task</Button>
              </DialogFooter>
            </DialogContent>
            {/* </form> */}
          </Dialog>
        </>
      ) : (
        <p>No Tasks Available</p>
      )}
    </Card>
  );
};
