import React from "react";
import { v4 as uuidv4 } from "uuid";

import AddProjectForm from "./AddProjectForm";
import ProjectDetails from "./ProjectDetails";

import logo from "../assets/no-projects.png";
import ErrorModal from "./ErrorModal";

function Projects({
  isAddProjectActive,
  setIsAddProjectActive,
  setProjects,
  projects,
  selected,
}) {
  const titleRef = React.useRef(null);
  const descriptionRef = React.useRef(null);
  const dateRef = React.useRef(null);
  const modalRef = React.useRef(null);

  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    if (error) {
      modalRef.current.openModal();
    }

    const timer = setTimeout(() => {
      setError(null);
    }, 5000);

    return () => clearTimeout(timer);
  }, [error]);

  function handleAddActive() {
    setIsAddProjectActive(!isAddProjectActive);
    setError(null);
  }

  function handleSaveProjects(e) {
    e.preventDefault();

    if (!titleRef.current.value && !dateRef.current.value) {
      setError("Titolo e data di scadenza sono campi obbligatori");
      return;
    }

    if (!titleRef.current.value) {
      setError("Titolo è un campo obbligatorio");
      return;
    }

    if (!dateRef.current.value) {
      setError("Data di scadenza è un campo obbligatorio");
      return;
    }

    if (dateRef.current.value < new Date().toISOString().split("T")[0]) {
      setError("La data di scadenza deve essere successiva a quella odierna");
      return;
    }

    if (!descriptionRef.current.value) {
      descriptionRef.current.value = "Senza descrizione";
    }

    const newProject = {
      id: uuidv4(),
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      date: dateRef.current.value,
    };

    setProjects((prevProjects) => {
      return [...prevProjects, newProject];
    });
    setIsAddProjectActive(false);
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
            <ErrorModal error={error} ref={modalRef} />
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
            <AddProjectForm
              ref={[titleRef, descriptionRef, dateRef]}
              error={error}
              setError={setError}
            />
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
