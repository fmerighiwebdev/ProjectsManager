import React from "react";

function Task({ task, handleDeleteTask }) {

  return (
    <li className="flex justify-between w-full p-4">
      <p>{task.title}</p>
      <button className="hover:text-red-600 font-medium" onClick={handleDeleteTask}>Clear</button>
    </li>
  );
}

export default Task;
