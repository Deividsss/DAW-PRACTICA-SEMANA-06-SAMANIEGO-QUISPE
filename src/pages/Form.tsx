import { useState } from "react";
import type { FormEvent } from "react";

function Form() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Media");
  const [errors, setErrors] = useState({ title: "", description: "" });
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const validateText = (value: string, maxLength: number, field: string) => {
    const article = field === "descripción" ? "La" : "El";
    if (!value.trim()) return `${article} ${field} es obligatorio${field === "descripción" ? "a" : ""}.`;
    if (value.length > maxLength) return `${article} ${field} admite máximo ${maxLength} caracteres.`;
    if (!/^[\p{L}\p{N} ]+$/u.test(value)) {
      return `${article} ${field} solo puede contener letras y números.`;
    }
    return "";
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = {
      title: validateText(title, 20, "título"),
      description: validateText(description, 200, "descripción"),
    };
    setErrors(nextErrors);
    setHasSubmitted(true);

    if (nextErrors.title || nextErrors.description) return;

    console.log("Nueva tarea:");
    console.log({
      title,
      description,
      priority,
    });

    alert("Tarea registrada correctamente");

    setTitle("");
    setDescription("");
    setPriority("Media");
    setErrors({ title: "", description: "" });
    setHasSubmitted(false);
  };

  return (
    <div>
      <h1>Nueva tarea</h1>

      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="task-title">Título:</label>

          <input
            id="task-title"
            type="text"
            maxLength={20}
            aria-invalid={Boolean(errors.title)}
            aria-describedby="title-guidance"
            value={title}
            onChange={(event) => {
              const value = event.target.value;
              setTitle(value);
              if (hasSubmitted) {
                setErrors((current) => ({
                  ...current,
                  title: validateText(value, 20, "título"),
                }));
              }
            }}
            placeholder="Ejemplo: Terminar proyecto"
          />
          <p id="title-guidance" className="field-guidance">
            Solo letras, números y espacios. Máximo 20 caracteres ({title.length}/20).
          </p>
          {errors.title && <p className="field-error" role="alert">{errors.title}</p>}
        </div>

        <div>
          <label htmlFor="task-description">Descripción:</label>

          <textarea
            id="task-description"
            maxLength={200}
            aria-invalid={Boolean(errors.description)}
            aria-describedby="description-guidance"
            value={description}
            onChange={(event) => {
              const value = event.target.value;
              setDescription(value);
              if (hasSubmitted) {
                setErrors((current) => ({
                  ...current,
                  description: validateText(value, 200, "descripción"),
                }));
              }
            }}
            placeholder="Describe la tarea"
          />
          <p id="description-guidance" className="field-guidance">
            Solo letras, números y espacios. Máximo 200 caracteres ({description.length}/200).
          </p>
          {errors.description && <p className="field-error" role="alert">{errors.description}</p>}
        </div>

        <div>
          <label htmlFor="task-priority">Prioridad:</label>

          <select
            id="task-priority"
            value={priority}
            onChange={(event) => setPriority(event.target.value)}
          >
            <option value="Baja">Baja</option>
            <option value="Media">Media</option>
            <option value="Alta">Alta</option>
          </select>
        </div>

        <button type="submit">
          Registrar tarea
        </button>
      </form>
    </div>
  );
}

export default Form;