import React from "react";
import addIcon from "../icons/AddButton.svg";

const Header = ({ newTaskText, setNewTaskText, addTask }) => {
  return (
    <>
      <div className="d-flex justify-content-center mb-5">
        <input
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          placeholder="Enter Task..."
          className="inputForm form-control"
        />
        <img
          src={addIcon}
          className="icon-btn ms-3"
          title="Add New Task"
          alt="Add"
          onClick={addTask}
        />
      </div>
    </>
  );
};

export default Header;
