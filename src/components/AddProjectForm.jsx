import React from 'react';
import { v4 as uuidv4 } from "uuid";

import Input from './Input';

function AddProjectForm({ setProject, error, setError }) {

    function handleChanges(e) {
      setError(null);
      let newValue = e.target.value;

      if (e.target.name === "date") {
        newValue = new Date(e.target.value);
      }

      setProject((prevProject) => ({
        ...prevProject,
        id: uuidv4(),
        [e.target.name]: newValue,
      }));
    }

  return (
    <form className="flex flex-col gap-4">
      <Input
        label="Title*"
        type="text"
        name="title"
        onChange={handleChanges}
        error={error}
      />
      <Input
        label="Description"
        type="text"
        textarea="true"
        rows={3}
        name="description"
        onChange={handleChanges}
        error={error}
      />
      <Input
        label="Due date*"
        type="date"
        name="date"
        onChange={handleChanges}
        error={error}
      />
    </form>
  );
}

export default AddProjectForm