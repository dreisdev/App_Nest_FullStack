import TrashIcon from "../../assets/trash.svg";
import { TaskType } from "../../types/TaskType";
import styles from "./styles.module.scss";
import { useAppDispatch } from "../../app/hooks";
import { changeTaskStatus, deleteTask } from "../../features/tasks";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskDetails from "../TaskDetail";

interface IProps {
  task: TaskType;
}

function TaskCard({ task }: IProps) {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [showDetails, setShowDetails] = useState(false);

  const handleTitleClick = () => {
    setShowDetails(!showDetails);
    navigate(`/taskDetail/${task.id}`);
  };

  return (
    <div className={styles.container}>
      <div>
        <input
          type="checkbox"
          checked={task.done}
          onChange={() => dispatch(changeTaskStatus(task.id))}
        />
        <span
          className={styles[`${task.done ? "done" : ""}`]}
          onClick={handleTitleClick}
          style={{ cursor: "pointer" }}
        >
          {task.title}
        </span>
      </div>
      <button onClick={() => dispatch(deleteTask(task.id))}>
        <img src={TrashIcon} alt="trash" />
      </button>
      {showDetails && <TaskDetails />}
    </div>
  );
}

export default TaskCard;
