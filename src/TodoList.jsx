import React from "react";

const TodoList = ({
  task_name,
  priority_level,
  status,
  deleteTask,
  index,
  updateStatus,
  task_id,
}) => {

  const changeStatus = (e) => {
    const { value } = e.target;
    console.log("TEST for EDIT ! ", value);
    updateStatus(task_id, value);
  };

  

  return (
    <tr>
      <th scope="row">{index}</th>
      <td>{task_name}</td>
      <td>
        <span>{priority_level}</span>
      </td>
      <td>
        <div class="input-group ">
          <select
            class="form-select"
            value={status}
            id="inputGroupSelect01"
            onChange={changeStatus}
            disabled={status == "Completed" ? true : false}
          >
            <option value="Pending">Pending</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        {/* <span>{status}</span> */}
      </td>
      <td className="text-center">
        <button
          className="btn btn-sm btn-outline-danger"
          disabled={status == "Completed" ? true : false}
          onClick={deleteTask}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default TodoList;
