import React from "react";

function ProjectListItem({ project, selected, id, handleSelectItem }) {

  const tailwindClass = `project-item text-white text-lg py-2 px-4 rounded-md transition-all duration-300 cursor-pointer ${
    selected === id ? "active" : null
  }`;

  return (
    <li onClick={handleSelectItem} className={tailwindClass}>
      {project.title}
    </li>
  );
}

export default ProjectListItem;
