import { useEffect, useState } from "react";
import { getAllTasks } from "../api/tasks.api";
import { TaskCard } from "./TaskCard";

export function TaskList() {
  const [tasks, setTasks] = useState([]); // Corrección: usar useState para manejar el estado

  useEffect(() => {
    async function loadTasks() {
      try {
        const res = await getAllTasks();
        setTasks(res.data); // Asignar las tareas a estado
      } catch (error) {
        console.error("Error loading tasks:", error);
      }
    }

    loadTasks(); // Ejecutar la función
  }, []); // Dependencias vacías para ejecutar una vez al montar el componente

  return (
    <div className="grid grid-cols-3 gap-3">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}
