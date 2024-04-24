import React from "react";

import ProjectListItem from "./ProjectListItem";

function Sidebar({ setIsAddProjectActive, projects, selected, setSelected }) {
  function handleAddActive() {
    setIsAddProjectActive(true);
  }

  function handleSelectItem(id) {
    setSelected(id);
  }

  return (
    <aside className="w-1/4 bg-black h-full p-8 rounded-tr-3xl rounded-br-3xl shadow-2xl shadow-black z-50">
      <h1 className="text-slate-100 mt-8 text-center font-bold uppercase text-3xl">
        Your Projects
      </h1>
      <>
        <button
          onClick={handleAddActive}
          className="add-btn font-medium px-5 py-3 rounded-md text-white mx-auto my-10 block transition-all"
        >
          + Add Project
        </button>
      </>
      <ul className="flex flex-col list-none p-0 gap-4">
        {projects.map((project) => {
          return (
            <ProjectListItem
              key={project.id}
              id={project.id}
              project={project}
              handleSelectItem={() => handleSelectItem(project.id)}
              selected={selected}
              setSelected={setSelected}
            />
          );
        })}
      </ul>
    </aside>
  );
}

export default Sidebar;
