"use client";
// Client Component: maneja el estado del formulario y el mensaje de confirmación.
// Es solo interfaz (como pide el examen): no envía datos a ningún servidor.

import { useState } from "react";

const campo =
  "w-full rounded border border-gray-300 px-4 py-2.5 text-ink outline-none transition placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-primary/20";

export default function ContactForm() {
  const [enviado, setEnviado] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEnviado(true);
    e.currentTarget.reset();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" aria-label="Formulario de contacto">
      <label className="block">
        <span className="sr-only">Apellidos y Nombres</span>
        <input name="nombre" required placeholder="Apellidos y Nombres" className={campo} autoComplete="name" />
      </label>
      <label className="block">
        <span className="sr-only">Teléfono</span>
        <input name="telefono" type="tel" required placeholder="Teléfono" className={campo} pattern="[0-9 +]{6,15}" autoComplete="tel" />
      </label>
      <label className="block">
        <span className="sr-only">Correo</span>
        <input name="correo" type="email" required placeholder="Correo" className={campo} autoComplete="email" />
      </label>
      <label className="block">
        <span className="sr-only">Asunto</span>
        <input name="asunto" required placeholder="Asunto" className={campo} />
      </label>
      <label className="block">
        <span className="sr-only">Mensaje</span>
        <textarea name="mensaje" required rows={5} placeholder="Mensaje" className={campo} />
      </label>
      <div className="text-center">
        <button type="submit" className="rounded bg-accent px-6 py-2.5 font-semibold text-white transition hover:bg-accent-dark">
          Enviar Mensaje
        </button>
      </div>
      {enviado && (
        <p role="status" className="rounded bg-green-50 p-3 text-center text-sm text-green-800">
          ¡Gracias! Un asesor se pondrá en contacto contigo lo más pronto posible.
        </p>
      )}
    </form>
  );
}
