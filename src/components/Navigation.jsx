import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <div className="flex flex-col items-center py-3">
      <Link to="/tasks" className="mb-4">
        <h1 className="font-bold text-3xl">Lista de Tareas</h1>
      </Link>
      <Link to="/tasks-create">
        <button className="bg-indigo-500 text-white px-3 py-2 rounded-lg">
          Create task
        </button>
      </Link>
    </div>
  );
}
