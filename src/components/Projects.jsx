import React from "react";

import AddProjectForm from "./AddProjectForm";
import ProjectDetails from "./ProjectDetails";

import logo from "../assets/no-projects.png";
import { set } from "date-fns";

function Projects({
  isAddProjectActive,
  setIsAddProjectActive,
  setProjects,
  projects,
  selected,
}) {
  const [error, setError] = React.useState(null);
  const [project, setProject] = React.useState({
    id: null,
    title: "",
    description: "",
    date: "",
  });

  function handleAddActive() {
    setIsAddProjectActive(!isAddProjectActive);
    setError(null);
  }

  function handleSaveProjects(e) {
    e.preventDefault();

    if (project.title === "" && (project.date === "" || project.date === null)) {
      setError("You must insert a title and a date");
      return;
    }
    if (project.title === "") {
      setError("You must insert a title");
      return;
    }
    if (project.description === "") {
      project.description = "Senza descrizione";
    }
    if (project.date === null || project.date === "") {
      setError("You must insert a date");
      return;
    }

    setProjects((prevProjects) => {
      return [...prevProjects, project];
    });
    setIsAddProjectActive(false);

    console.log(project);

    setProject({
      id: null,
      title: "",
      description: "",
      date: "",
    });
  }

  const selectedProject = projects.find((project) => project.id === selected);

  function handleDeleteProject() {
    setProjects((prevProjects) => {
      return prevProjects.filter((p) => p.id !== selected);
    });

    setIsAddProjectActive(false);
  }

  return (
    <section className="flex flex-col justify-center items-center w-3/4 h-screen relative">
      <div className="flex flex-col items-center gap-4">
        <img src={logo} alt="Logo" className="w-32" />
        <h2 className="text-2xl text-gray-500 font-bold">
          No Project Selected
        </h2>
        <p className="text-xl font-medium text-gray-400">
          Select a project or start with a new one
        </p>
      </div>
      <button
        onClick={handleAddActive}
        className="bg-zinc-800 px-5 py-3 mt-12 text-zinc-300 font-semibold rounded-md hover:bg-zinc-700 transition-all"
      >
        Create new project
      </button>
      {isAddProjectActive && (
        <section className="add-project-container z-50 flex flex-col justify-center items-center w-full h-screen bg-white absolute top-0 left-0">
          {error && (
            <div className="error-toast bg-red-200 text-red-800 p-2 rounded-md w-72 text-center absolute top-10">
              {error}
            </div>
          )}
          <div className="form-container">
            <div className="buttons-control flex gap-4 justify-end items-center mb-10">
              <button
                onClick={handleAddActive}
                className="text-lg px-4 py-2 hover:bg-slate-100 transition-all rounded-md w-24"
              >
                Cancella
              </button>
              <button
                onClick={handleSaveProjects}
                className="text-lg bg-black hover:bg-zinc-800 transition-all text-white px-4 py-2 rounded-lg w-24"
              >
                Salva
              </button>
            </div>
            <AddProjectForm setProject={setProject} error={error} setError={setError} />
          </div>
        </section>
      )}
      {selectedProject && (
        <section className="project-details-container flex flex-col justify-center items-center w-full h-screen bg-white absolute top-0 left-0">
          {error && (
            <div className="error-toast bg-red-200 text-red-800 p-2 rounded-md w-72 text-center absolute top-10">
              {error}
            </div>
          )}
          <ProjectDetails
            project={selectedProject}
            handleDeleteProject={handleDeleteProject}
            error={error}
            setError={setError}
          />
        </section>
      )}
    </section>
  );
}

export default Projects;
