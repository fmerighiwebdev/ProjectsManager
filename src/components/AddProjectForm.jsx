import React from 'react';

import Input from './Input';

const AddProjectForm = React.forwardRef(function AddProjectForm({ error }, ref) {

  const titleRef = ref[0];
  const descriptionRef = ref[1];
  const dateRef = ref[2];

  return (
    <form className="flex flex-col gap-4">
      <Input
        label="Title*"
        type="text"
        name="title"
        error={error}
        ref={titleRef}
      />
      <Input
        label="Description"
        type="text"
        textarea="true"
        rows={3}
        name="description"
        error={error}
        ref={descriptionRef}
      />
      <Input
        label="Due date*"
        type="date"
        name="date"
        error={error}
        ref={dateRef}
      />
    </form>
  );
});

export default AddProjectForm;