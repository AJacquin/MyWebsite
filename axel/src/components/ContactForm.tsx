"use client";
import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<string | null>(null);
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
        setStatus("Message envoyé !");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("Erreur lors de l'envoi.");
      }
    } catch {
      setStatus("Erreur lors de l'envoi.");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <input
        type="text"
        name="name"
        placeholder="Votre nom"
        value={form.name}
        onChange={handleChange}
        required
        className="w-full border rounded px-3 py-2"
      />
      <input
        type="email"
        name="email"
        placeholder="Votre email"
        value={form.email}
        onChange={handleChange}
        required
        className="w-full border rounded px-3 py-2"
      />
      <textarea
        name="message"
        placeholder="Votre message"
        value={form.message}
        onChange={handleChange}
        required
        className="w-full border rounded px-3 py-2"
        rows={5}
      />
      <button type="submit" disabled={loading} className="bg-foreground text-background px-4 py-2 rounded">
        {loading ? "Envoi..." : "Envoyer"}
      </button>
      {status && <div className="text-sm text-center">{status}</div>}
    </form>
  );
}
