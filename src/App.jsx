import React from "react";

import Projects from "./components/Projects";
import Sidebar from "./components/Sidebar";

function App() {
  const [isAddProjectActive, setIsAddProjectActive] = React.useState(false);
  const [projects, setProjects] = React.useState([]);
  const [selected, setSelected] = React.useState(null);

  return (
    <main className="flex items-center h-screen">
      <Sidebar
        setIsAddProjectActive={setIsAddProjectActive}
        projects={projects}
        selected={selected}
        setSelected={setSelected}
      />
      <Projects
        isAddProjectActive={isAddProjectActive}
        setIsAddProjectActive={setIsAddProjectActive}
        setProjects={setProjects}
        projects={projects}
        selected={selected}
      />
    </main>
  );
}

export default App;
