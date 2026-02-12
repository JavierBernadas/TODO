import { useEffect, useState } from "react";
import TodoTable from "./TodoTable";
import { FeedPlusIcon } from "@primer/octicons-react";
import Modal from "./components/Modal";

const TodoApp = () => {
  const [modalConfirmation, setModalConfirmation] = useState(false);
  const [taskID, setTaskID] = useState("");
  const [taskStatus, setTaskStatus] = useState("");

  const [newtask, setNewTask] = useState({
    id: "",
    title: "",
    priority: "",
    status: "Ongoing",
  });
  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem("Task")) || [];
  });
  const CreateTask = () => {
    if (!newtask.title || !newtask.priority) return;

    const dataWithId = {
      ...newtask,
      id: Date.now(),
    };

    setTasks((prev) => {
      const updatedTasks = [...prev, dataWithId];
      localStorage.setItem("Task", JSON.stringify(updatedTasks));
      return updatedTasks;
    });

    setNewTask({
      title: "",
      priority: "",
      status: "Pending",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewTask((prev) => ({
      ...prev,
      [name]: value, // 🔥 dynamic key
    }));
  };

  // delete Task !
  const deleteTask = (id) => {
    console.log("ID TASK TO Delete : " + id);

    // Filter out the task to delete
    const updatedTasks = tasks.filter((task) => task.id !== id);

    // Update state
    setTasks(updatedTasks);

    // Update localStorage immediately
    localStorage.setItem("Task", JSON.stringify(updatedTasks));
  };

  //update status of task !
  const updateStatus = (id, newStatusValue) => {
    console.log("Update Status", "id : ", id, newStatusValue);

    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, status: newStatusValue } : task,
    );

    setTasks(updatedTasks);
    localStorage.setItem("Task", JSON.stringify(updatedTasks));

    console.log("updatedTasks", updatedTasks);
  };

  //confirm to complete !
  const confirmToComplete = () => {
    console.log("Confirm from TodoApp");
    console.log("taskID : ", taskID);
    console.log("taskStatus : ", taskStatus);

    updateStatus(taskID, taskStatus);
  };

  return (
    <div class="container vh-100 d-flex justify-content-center align-items-center">
      <div class="mb-3 ">
        <div className="mb-4 text-center">
          <h1 className="fw-bold">Your Todo App</h1>
          <p className="text-muted">Add and manage your tasks easily</p>
        </div>

        <div class="d-flex column-gap-3">
          <div class="input-group mb-3">
            <span class="input-group-text" id="visible-addon">
              Task Name
            </span>
            <input
              onChange={handleChange}
              value={newtask.title}
              type="text"
              class="form-control"
              id="title"
              name="title"
              placeholder="Task Name..."
              aria-describedby="basic-addon1"
            />
          </div>

          <div class="input-group mb-3">
            <label class="input-group-text" for="inputGroupSelect01">
              Priority
            </label>
            <select
              class="form-select"
              onChange={handleChange}
              id="priority"
              name="priority"
              aria-label="Priority"
              value={newtask.priority}
            >
              <option selected>Choose...</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div>
            <button
              type="button"
              onClick={CreateTask}
              className="btn btn-outline-primary d-flex align-items-center justify-content-center gap-2"
            >
              Add
              <FeedPlusIcon size={16} />
            </button>
          </div>
        </div>

        <TodoTable
          taskList={tasks}
          deleteTask={deleteTask}
          modalConfirmation={setModalConfirmation}
          setTaskID={setTaskID}
          setTaskStatus={setTaskStatus}
        />
      </div>
      {modalConfirmation ? (
        <Modal
          onClose={setModalConfirmation}
          confirmToComplete={confirmToComplete}
          ConfirmationHeader="Confirm Status Update"
          ConfirmationContent="Are you sure you want to update the status of this task? This change will be saved immediately."
        />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default TodoApp;
