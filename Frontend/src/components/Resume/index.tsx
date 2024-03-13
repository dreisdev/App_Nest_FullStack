import styles from "./styles.module.scss";
import { useAppSelector } from "../../app/hooks";
import { selectTasks } from "../../features/tasks";

function Resume() {
  const { tasks } = useAppSelector(selectTasks);

  function countDone() {
    return tasks.filter((task) => task.done).length;
  }

  function countPending() {
    return tasks.filter((task) => !task.done).length;
  }
  return (
    <div className={styles.container}>
      <div>
        <strong>Tasks:</strong>
        <span>{tasks.length}</span>
      </div>

      <div>
        <strong>Pendentes:</strong>
        <span>{countPending()}</span>
      </div>

      <div>
        <strong>Feitas:</strong>
        <span>{countDone()}</span>
      </div>
    </div>
  );
}

export default Resume;
