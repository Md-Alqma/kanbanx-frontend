import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
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
import { DialogClose } from "@radix-ui/react-dialog";
import { Droppable } from "@hello-pangea/dnd";

export const List = ({ list }) => {
  const [open, setopen] = useState(false);
  const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",
    priority: "",
  });
  const { singleList, fetchLists, loading } = useListStore();
  const { addTask } = useTaskStore();
  const { boardId } = useParams();

  const handleChange = (e) => {
    setTaskForm({ ...taskForm, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchLists(boardId);
  }, [open]);

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (taskForm.title.trim()) {
      await addTask(
        list._id,
        taskForm.title,
        taskForm.description,
        taskForm.priority
      );

      setTaskForm({
        title: "",
        description: "",
        priority: "",
      });

      setopen(false);
    }
  };

  return (
    <Droppable droppableId={list._id}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="w-72 p-4 border rounded-lg shadow-md bg-gray-100"
        >
          <h2 className="font-bold">{list.title}</h2>

          <div className="mt-2 space-y-2">
            {list.tasks.map((task, index) => (
              <Task key={task._id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>

          <div className="mt-4">
            <Dialog open={open} onOpenChange={setopen}>
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
                        <SelectLabel className="text-left">
                          Priority
                        </SelectLabel>
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
                  <DialogTrigger asChild>
                    <Button type="button" onClick={handleAddTask}>
                      Add Task
                    </Button>
                  </DialogTrigger>
                </DialogFooter>
              </DialogContent>
              {/* </form> */}
            </Dialog>
          </div>
        </div>
      )}
    </Droppable>
  );
};
