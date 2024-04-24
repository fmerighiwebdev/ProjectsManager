import React from "react";

const Input = React.forwardRef(function Input(props, ref) {

  let cssInputClasses = "w-full px-2 py-2 font-sans bg-zinc-300 border-b-4 border-zinc-400 outline-0 rounded-md transition-all focus:border-zinc-500";

  if (props.error) {
    cssInputClasses += " border-red-500";
  }

  return (
    <div className="input-group">
      <label className="block uppercase font-bold text-zinc-600 mb-1">
        {props.label}
      </label>
      {props.textarea ? (
        <textarea
          {...props}
          ref={ref}
          className="w-full px-2 py-2 font-sans bg-zinc-300 border-b-4 border-zinc-400 outline-0 rounded-md transition-all focus:border-zinc-500"
        ></textarea>
      ) : (
        <input
          {...props}
          ref={ref}
          className={cssInputClasses}
        ></input>
      )}
    </div>
  );
});

export default Input;
