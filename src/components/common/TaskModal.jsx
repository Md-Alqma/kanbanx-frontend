import React from "react";
const TaskModal = ({ task, index }) => {
  return (
    <div className="p-2 border rounded-md bg-white shadow">
      <h3 className="font-semibold">{task.title}</h3>
      <p className="text-sm text-gray-600">{task.description}</p>
    </div>
  );
};

export default TaskModal;
