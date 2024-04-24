import React from "react";
import { format } from "date-fns";
import { v4 as uuidv4 } from "uuid";

import Input from "./Input";
import Task from "./Task";

function ProjectDetails({ project, handleDeleteProject, error, setError }) {

  const taskTitleRef = React.useRef(null);

  const [tasks, setTasks] = React.useState([]);

  function handleSaveTask() {
    const newTask = {
      id: uuidv4(),
      title: taskTitleRef.current.value,
      projectId: project.id,
    };

    if (taskTitleRef.current.value === "") {
      setError("You must insert a task");
      return;
    }

    setTasks((prevTasks) => [...prevTasks, newTask]);

    taskTitleRef.current.value = "";
  }

  function handleDeleteTask(id) {
    setTasks((prevTasks) => {
      return prevTasks.filter((t) => t.id !== id);
    });
  }

  function formatDate(dateString) {
    const formattedDate = format(new Date(dateString), "MMM d, yyyy");
    return formattedDate;
  }

  return (
    <article className="project-details">
      <div className="flex flex-col gap-8 pb-8 border-b-4 border-b-zinc-300">
        <div className="flex justify-between items-center">
          <h2 className="text-5xl font-bold text-zinc-600">{project.title}</h2>
          <button className="text-xl text-red-500 font-medium" onClick={handleDeleteProject}>Delete</button>
        </div>
        <p className="text-zinc-400 text-2xl">{formatDate(project.date)}</p>
        <p className="text-xl">{project.description}</p>
      </div>
      <div className="tasks flex flex-col pt-8 gap-8">
        <h2 className="text-5xl font-bold text-zinc-600">Tasks</h2>
        <div className="tasks-input flex gap-8">
          <Input type="text" error={error} ref={taskTitleRef} />
          <button onClick={handleSaveTask}>Add Task</button>
        </div>
      </div>
      {tasks.length > 0 ? (
        <div className="tasks-list-container pt-8">
          <ul className="tasks-list bg-gray-100 rounded-md">
            {tasks.map((task) => {
              if (project.id === task.projectId) {
                return <Task key={task.id} task={task} handleDeleteTask={() => handleDeleteTask(task.id)} />;
              }
            })}
          </ul>
        </div>
      ) : (
        <p className="pt-8">This project does not have any tasks yet.</p>
      )}
    </article>
  );
}

export default ProjectDetails;