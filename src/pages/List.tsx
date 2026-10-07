import { useEffect, useState } from "react";
import api from "../services/api";

interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

function List() {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get<User[]>("/users", {
          signal: controller.signal,
        });

        // IA: Se mantiene un único estado "data" para sincronizar la respuesta del fetch.
        // Solución manual: se actualiza el estado una sola vez cuando termina la petición.
        setData(response.data);
      } catch (error) {
        if (error instanceof Error && error.name === "CanceledError") {
          return;
        }

        setError("No se pudieron cargar los usuarios.");
      } finally {
        setLoading(false);
      }
    };

    getUsers();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className="page-container">
      <h1>Lista de usuarios</h1>

      {error && <p>{error}</p>}

      {loading ? (
        <p>Cargando usuarios...</p>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Usuario</th>
                <th>Email</th>
              </tr>
            </thead>

            <tbody>
              {data.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default List;