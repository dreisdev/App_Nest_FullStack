import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import TaskDetails from "./components/TaskDetail";

function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/taskDetail/:id" element={<TaskDetails />} />
    </Routes>
  );
}

export default MainRoutes;
