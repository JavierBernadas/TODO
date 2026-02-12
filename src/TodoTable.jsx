import React, { useState } from "react";

import TodoList from "./TodoList";
const TodoTable = ({
  taskList = [],
  deleteTask,
  modalConfirmation,
  setTaskID,
  setTaskStatus,
}) => {
  console.log("taskList : ", taskList.length);

  const updateStatusValue = (id, newValue) => {
    modalConfirmation(true);

    setTaskID(id);
    setTaskStatus(newValue);
    console.log("Change to Completed ! ", id, newValue);
  };

  return (
    <div className=" mt-3">
      <table className="table table-striped table-hover table-bordered align-middle">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Task Name</th>
            <th>Priority</th>
            <th>Status</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {taskList.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center text-muted py-5">
                <div style={{ fontSize: "1.2rem" }}>
                  <i className="bi bi-info-circle-fill me-2"></i> No tasks
                  created yet
                </div>
                <div style={{ fontSize: "0.9rem", color: "#6c757d" }}>
                  Click "Add Task" to create your first task
                </div>
              </td>
            </tr>
          ) : (
            taskList.map((task, index) => (
              <TodoList
                key={task.id}
                index={index + 1} // use proper row number
                task_name={task.title}
                priority_level={task.priority}
                status={task.status}
                task_id={task.id}
                // action button !
                deleteTask={() => deleteTask(task.id)}
                // update status !
                updateStatus={updateStatusValue}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TodoTable;
