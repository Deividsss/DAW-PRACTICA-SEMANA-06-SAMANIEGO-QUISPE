import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <h2>TASKSAPP DEISAM</h2>

      <NavLink to="/">Inicio</NavLink>
      <NavLink to="/tareas">Tareas</NavLink>
      <NavLink to="/nueva-tarea">Nueva tarea</NavLink>
    </nav>
  );
}

export default Navbar;