import { useState } from "react";
import CloseIcon from "../../assets/close.svg";
import styles from "./styles.module.scss";
import { useAppDispatch } from "../../app/hooks";
import { addTask } from "../../features/tasks";

interface IProps {
  open: boolean;
  handleClose: () => void;
}

function ModalNewTask({ open, handleClose }: IProps) {
  const dispatch = useAppDispatch();
  const [inputTitle, setInputTitle] = useState("");
  const [inputDescription, setInputDescription] = useState("");

  function handleAdd() {
    if (!inputTitle || !inputDescription) return;
    dispatch(addTask({ title: inputTitle, description: inputDescription }));
    setInputTitle("");
    setInputDescription("");
    handleClose();
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

            <h1>Nova Tarefa</h1>
            <div>
              <label htmlFor="taskTitle">Nome da Tarefa:</label>
              <input
                type="text"
                id="taskTitle"
                value={inputTitle}
                placeholder="Nova tarefa"
                onChange={(event) => setInputTitle(event.target.value)}
                onKeyDown={(event) => event.key === "Enter" && handleAdd()}
              />

              <label htmlFor="taskDescription">Descrição da Tarefa:</label>
              <input
                type="text"
                id="taskDescription"
                placeholder="Nova tarefa"
                value={inputDescription}
                onChange={(event) => setInputDescription(event.target.value)}
                onKeyDown={(event) => event.key === "Enter" && handleAdd()}
              />

              <button className="btn-pink" onClick={handleAdd}>
                Adicionar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ModalNewTask;
