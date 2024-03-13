import { useEffect, useState } from "react";
import { TaskType } from "../../types/TaskType";
import styles from "./styles.module.scss";
import api from "../../services/api/Axios-Instance";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../Header";
import ModalUpdateTask from "../ModalUpdateTask";

type TaskParams = {
  id: string;
};

function TaskDetails() {
  const [task, setTask] = useState<TaskType | null>(null);

  const [open, setOpen] = useState(false);

  const { id } = useParams<TaskParams>();

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const response = await api.get(`/todolist/detail/${id}`);
        setTask(response.data);
      } catch (error) {
        console.error("Error fetching task details:", error);
      }
    };

    fetchTaskDetails();
  }, [id]);

  if (!task) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div>
        <Header handleOpenModal={() => setOpen(true)} operation="edit" />
        <ModalUpdateTask
          open={open}
          taskId={id || ""}
          handleClose={() => setOpen(false)}
        />
      </div>
      <div>
        <span className={styles[`${task.done ? "done" : ""}`]}>
          Detalhe da Tarefa: {task.description}
        </span>
      </div>

      <button className="btn-edit" onClick={handleBack}>
        ⬅ Voltar
      </button>
    </div>
  );
}

export default TaskDetails;
