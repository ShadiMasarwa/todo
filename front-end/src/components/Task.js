import React from "react";
import deleteIcon from "../icons/deleteIcon.svg";
import editIcon from "../icons/editIcon.svg";
import saveIcon from "../icons/saveIcon.svg";
import cancelIcon from "../icons/cancelIcon.svg";

const Task = ({
  updateTask,
  setEditingTaskText,
  editingTaskText,
  saveEditing,
  setEditingTaskId,
  editingTaskId,
  startEditing,
  deleteTask,
  task,
}) => {
  return (
    <div className="task-card d-flex justify-content-center">
      <div className="d-flex justify-content-center align-items-center ">
        <input
          type="checkbox"
          checked={task.done}
          title="Done?"
          onChange={() => updateTask(task.id, { ...task, done: !task.done })}
          className="form-check-input me-3"
        />

        {editingTaskId === task.id ? (
          <>
            <input
              type="text"
              value={editingTaskText}
              onChange={(e) => setEditingTaskText(e.target.value)}
              className="inputForm form-control active"
              autoFocus="true"
            />
            <img
              src={saveIcon}
              className="icon-btn ms-3"
              title="Update Changes"
              alt="Update"
              onClick={() => saveEditing(task.id)}
            />
            <img
              src={cancelIcon}
              className="icon-btn ms-3 fs-3"
              title="Discard Changes"
              alt="Cancel"
              onClick={() => setEditingTaskId(null)}
            />
          </>
        ) : (
          <>
            <input
              type="text"
              value={task.text}
              className={
                task.done
                  ? "inputForm form-control line"
                  : "inputForm form-control"
              }
              readOnly="true"
            />
            <img
              src={editIcon}
              className="icon-btn ms-3"
              title="Edit Task"
              alt="Add"
              onClick={() => startEditing(task.id, task.text)}
            />
            <img
              src={deleteIcon}
              className="icon-btn ms-3"
              title="Delete Task"
              alt="Delete"
              onClick={() => deleteTask(task.id)}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Task;
