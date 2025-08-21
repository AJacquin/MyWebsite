"use client";
import { useState } from "react";

// Types statiques
type FormData = {
  name: string;
  email: string;
  message: string;
};

type FormStatus = "success" | "error" | null;

// Messages statiques
const MESSAGES = {
  success: "Message envoyé avec succès !",
  error: "Erreur lors de l'envoi du message.",
  loading: "Envoi en cours...",
  submit: "Envoyer"
} as const;

// Configuration des champs
const FORM_FIELDS = [
  { name: "name", type: "text", label: "Nom", required: true },
  { name: "email", type: "email", label: "Email", required: true },
  { name: "message", type: "textarea", label: "Message", required: true, rows: 5 }
] as const;

// Classes CSS statiques
const STYLES = {
  container: "w-full space-y-6",
  field: "space-y-2",
  label: "block text-sm font-medium text-foreground/80",
  input: "w-full px-3 py-2 border border-foreground/20 rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/50 focus:border-transparent transition-colors",
  textarea: "w-full px-3 py-2 border border-foreground/20 rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/50 focus:border-transparent resize-none transition-colors",
  button: "w-full bg-foreground text-background py-2 px-4 rounded-md font-medium hover:bg-foreground/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
  status: {
    base: "text-sm text-center p-3 rounded-md",
    success: "bg-green-500/10 text-green-700",
    error: "bg-red-500/10 text-red-700"
  }
} as const;

export default function ContactForm() {
  const [form, setForm] = useState<FormData>({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<FormStatus>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={STYLES.container}>
      {FORM_FIELDS.map((field) => (
        <div key={field.name} className={STYLES.field}>
          <label htmlFor={field.name} className={STYLES.label}>
            {field.label}
          </label>
          {field.type === "textarea" ? (
            <textarea
              id={field.name}
              name={field.name}
              value={form[field.name as keyof FormData]}
              onChange={handleChange}
              required={field.required}
              rows={field.rows}
              className={STYLES.textarea}
            />
          ) : (
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              value={form[field.name as keyof FormData]}
              onChange={handleChange}
              required={field.required}
              className={STYLES.input}
            />
          )}
        </div>
      ))}
      
      <button
        type="submit"
        disabled={loading}
        className={STYLES.button}
      >
        {loading ? MESSAGES.loading : MESSAGES.submit}
      </button>
      
      {status && (
        <div className={`${STYLES.status.base} ${STYLES.status[status]}`}>
          {status === "success" ? MESSAGES.success : MESSAGES.error}
        </div>
      )}
    </form>
  );
}
