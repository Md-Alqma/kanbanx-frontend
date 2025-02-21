import React from "react";
import { Draggable } from "@hello-pangea/dnd";
export const Task = ({ task, index }) => {
  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="p-2 border rounded-md bg-white shadow"
        >
          <h3 className="font-semibold">{task.title}</h3>
          <p className="text-sm text-gray-600">{task.description}</p>
        </div>
      )}
    </Draggable>
  );
};
