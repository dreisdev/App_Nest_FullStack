import { useState } from "react";
import CloseIcon from "../../assets/close.svg";
import styles from "./styles.module.scss";
import { useAppDispatch } from "../../app/hooks";
import { updateTask } from "../../features/tasks";
import { useNavigate } from "react-router-dom";

interface IProps {
  open: boolean;
  handleClose: () => void;
  taskId: string;
}

function ModalUpdateTask({ open, handleClose, taskId }: IProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [inputTitle, setInputTitle] = useState("");
  const [inputDescription, setInputDescription] = useState("");

  async function handleUpdate() {
    if (!inputTitle || !inputDescription) return;

    try {
      await dispatch(
        updateTask({
          taskId,
          taskData: { title: inputTitle, description: inputDescription },
        })
      );
      setInputTitle("");
      setInputDescription("");
      navigate("/");

      handleClose();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  }

  return (
    <>
      {open && (
        <div className={styles.backdrop}>
          <div className={styles.modal}>
            <img
              src={CloseIcon}
              alt="close"
              className={styles["close-icon"]}
              onClick={handleClose}
            />

            <h1>Editar Tarefa</h1>
            <div>
              <label htmlFor="taskTitle">Nome da Tarefa:</label>
              <input
                type="text"
                id="taskTitle"
                value={inputTitle}
                placeholder="Editar Nome da Tarefa"
                onChange={(event) => setInputTitle(event.target.value)}
                onKeyDown={(event) => event.key === "Enter" && handleUpdate()}
              />

              <label htmlFor="taskDescription">Descrição da Tarefa:</label>
              <input
                type="text"
                id="taskDescription"
                placeholder="Editar Descrição da tarefa"
                value={inputDescription}
                onChange={(event) => setInputDescription(event.target.value)}
                onKeyDown={(event) => event.key === "Enter" && handleUpdate()}
              />

              <button className="btn-pink" onClick={handleUpdate}>
                Editar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ModalUpdateTask;
