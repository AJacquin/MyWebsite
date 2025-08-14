"use client";
import Image from "next/image";
import PageLayout from "@/components/PageLayout";

import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Globe,
  Languages,
  Code,
  Cpu,
  Music2,
  Puzzle,
  Dumbbell,
  Mountain,
} from "lucide-react";

export default function CVPortfolio() {
  const skills = {
    HDL: ["Verilog", "SystemVerilog", "VHDL"],
    Simulation: ["Xsim", "Modelsim", "Gtkwave"],
    Outils: ["Vivado", "VSCode", "Netbeans", "Git", "Mercurial"],
    Langages: [
      "C",
      "C++",
      "Java",
      "JavaScript",
      "Python",
      "Matlab",
      "LaTeX",
    ],
    Systèmes: ["Windows", "Linux"],
    Domaines: ["Traitement d'image", "IA"],
  } as const;

  const languages = [
    { label: "Français", level: "C2", pct: 100 },
    { label: "Anglais", level: "C1", pct: 85 },
    { label: "Espagnol", level: "B1", pct: 60 },
  ];

  const experiences = [
    {
      period: "2021 – aujourd'hui",
      role: "Ingénieur électronique numérique",
      company: "AEM MU-TEST",
      location: "Saint-Jean-Bonnefonds",
      summary:
        "Architecture FPGA, développement, simulation, validation. Logiciel embarqué, serveur de tests, caractérisation, planification carte électronique.",
      tech: "Xilinx FPGA, PICmicro, Verilog, UVM, Python, cocotb, C, C++, Java, Hg, Planning",
      logo: "AEM",
    },
    {
      period: "2020 – 2021",
      role: "Ingénieur automatisme",
      company: "NBC-SYS (KNDS CBRN)",
      location: "Saint-Chamond",
      summary:
        "Programmation IHM et schémas électriques pour véhicules blindés.",
      tech: "CAN Bus, JavaScript, Documentation",
      logo: "NBC",
    },
    {
      period: "2020",
      role: "Ingénieur systèmes embarqués",
      company: "CIO Systèmes Embarqués",
      location: "Saint-Étienne",
      summary:
        "Système de calibration et détection de perte de connectivité pour pénétromètre.",
      tech: "STM32, C, Python, wxWidgets, Git, Électronique analogique",
      logo: "CIO",
    },
    {
      period: "2019",
      role: "Ingénieur systèmes embarqués",
      company: "Dublin Institute of Technology",
      location: "Dublin",
      summary:
        "Scanner Bluetooth (BLE), vulgarisation domotique pour seniors.",
      tech: "Raspberry Pi, Python, Linux, Anglais",
      logo: "DIT",
    },
    {
      period: "2017",
      role: "Technicien automatisme",
      company: "O‑I Manufacturing",
      location: "Veauche",
      summary:
        "Banc de test pour machines de formage de bouteilles en verre.",
      tech: "API (Telemecanique), Ladder, électrotechnique, mécanique, maintenance",
      logo: "O‑I",
    },
  ];

  const diplomas = [
    {
      year: "2020",
      text: "Diplôme d’ingénieur, Systèmes d’imagerie et électronique · Télécom Saint‑Étienne",
    },
    {
      year: "2020",
      text: "Master EEEA, Électronique, énergie électrique et automatisation · École Centrale de Lyon",
    },
    {
      year: "2017",
      text: "DUT GEII, Génie électrique et informatique industrielle · IUT de Saint‑Étienne",
    },
    {
      year: "2017",
      text: "DU CITISE, Cycle initial en technologies de l’information · Télécom Saint‑Étienne",
    },
  ];

  return (
    <PageLayout>
      <div className="min-h-screen w-full bg-neutral-50 text-neutral-900 print:bg-white print:text-black [--accent:#0f172a] [--accent-2:#312e81] [--ring:#1d4ed8]">
        {/* Container grid preserved for print */}
        <div className="mx-auto max-w-6xl p-6 md:p-10 grid grid-cols-1 md:grid-cols-12 gap-6 print:gap-6 print:p-6 print:max-w-[210mm] print:[-webkit-print-color-adjust:exact] print:[print-color-adjust:exact]">
          {/* SIDEBAR */}
          <aside className="md:col-span-4 lg:col-span-3 rounded-2xl overflow-hidden shadow-sm print:shadow-none border border-neutral-200 bg-gradient-to-b from-white to-neutral-100 print:bg-white">
            {/* Name + role */}
            <motion.div initial={{ opacity: 0, y: -8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-6 border-b border-neutral-200">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-2xl bg-[var(--accent)]/90 grid place-items-center text-white font-bold">AJ</div>
                <div>
                  <h1 className="text-xl font-bold leading-tight">Axel Jacquin</h1>
                  <p className="text-sm text-neutral-600">Ingénieur électronique numérique</p>
                </div>
              </div>
              {/* Socials */}
              <div className="mt-4 flex items-center gap-3 text-neutral-600">
                <a href="https://github.com/AJacquin" className="inline-flex items-center gap-1 hover:text-black transition">
                  <Github className="h-4 w-4" /> <span className="text-sm">AJacquin</span>
                </a>
                <span className="text-neutral-300">•</span>
                <a href="https://linkedin.com/in/axeljacquin" className="inline-flex items-center gap-1 hover:text-black transition">
                  <Linkedin className="h-4 w-4" /> <span className="text-sm">axeljacquin</span>
                </a>
              </div>
            </motion.div>

            {/* Contact */}
            <section className="p-6">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 mb-3 flex items-center gap-2"><Code className="h-4 w-4" /> Contact</h2>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 text-[var(--accent-2)]" /><span>105 cours Fauriel, 42100 Saint‑Étienne</span></li>
                <li className="flex items-start gap-2"><Phone className="h-4 w-4 mt-0.5 text-[var(--accent-2)]" /><a href="tel:+33640350125" className="hover:underline">06.40.35.01.25</a></li>
                <li className="flex items-start gap-2"><Mail className="h-4 w-4 mt-0.5 text-[var(--accent-2)]" /><a href="mailto:axel.c.e.jacquin@gmail.com" className="hover:underline">axel.c.e.jacquin@gmail.com</a></li>
                <li className="flex items-start gap-2"><Globe className="h-4 w-4 mt-0.5 text-[var(--accent-2)]" /><a href="http://axel.jacquin.duckdns.org" className="hover:underline">axel.jacquin.duckdns.org</a></li>
              </ul>
            </section>

            {/* Skills */}
            <section className="px-6 pb-6">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 mb-3 flex items-center gap-2"><Code className="h-4 w-4" /> Compétences</h2>
              {Object.entries(skills).map(([group, items]) => (
                <div key={group} className="mb-3">
                  <div className="text-xs font-semibold text-neutral-500 mb-2">{group}</div>
                  <div className="flex flex-wrap gap-2">
                    {items.map((s, i) => (
                      <motion.span
                        key={`${group}-${s}`}
                        className="px-3 py-1 text-xs rounded-full border border-neutral-300 bg-white shadow-sm hover:shadow transition will-change-transform"
                        initial={{ opacity: 0, y: 6 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.02 * i }}
                      >
                        {s}
                      </motion.span>
                    ))}
                  </div>
                </div>
              ))}
            </section>

            {/* Languages */}
            <section className="px-6 pb-6">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 mb-3 flex items-center gap-2"><Languages className="h-4 w-4" /> Langues</h2>
              <ul className="space-y-3">
                {languages.map((lng) => (
                  <li key={lng.label}>
                    <div className="flex items-baseline justify-between text-sm"><span>{lng.label}</span><span className="text-neutral-500">{lng.level}</span></div>
                    <div className="mt-1 h-2 rounded-full bg-neutral-200 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[var(--accent)] to-[var(--ring)]" style={{ width: `${lng.pct}%` }} />
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* Hobbies */}
            <section className="px-6 pb-8">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 mb-3 flex items-center gap-2"><Cpu className="h-4 w-4" /> Centres d'intérêt</h2>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2 p-2 rounded-lg border border-neutral-200 bg-white hover:shadow-sm transition"><Music2 className="h-4 w-4 text-[var(--accent-2)]" /> MAO, Piano</div>
                <div className="flex items-center gap-2 p-2 rounded-lg border border-neutral-200 bg-white hover:shadow-sm transition"><Puzzle className="h-4 w-4 text-[var(--accent-2)]" /> Rubik’s Cube</div>
                <div className="flex items-center gap-2 p-2 rounded-lg border border-neutral-200 bg-white hover:shadow-sm transition"><Dumbbell className="h-4 w-4 text-[var(--accent-2)]" /> Tennis, Course</div>
                <div className="flex items-center gap-2 p-2 rounded-lg border border-neutral-200 bg-white hover:shadow-sm transition"><Mountain className="h-4 w-4 text-[var(--accent-2)]" /> Escalade, Judo</div>
              </div>
            </section>
          </aside>

          {/* MAIN */}
          <main className="md:col-span-8 lg:col-span-9 space-y-10">
            {/* Experiences */}
            <section className="space-y-6">
              <h3 className="text-lg font-semibold uppercase tracking-wider text-neutral-500">Expériences</h3>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--accent)]/40 via-neutral-300 to-[var(--ring)]/40" />
                <ul className="space-y-4">
                  {experiences.map((e, idx) => (
                    <li key={idx} className="relative pl-10 break-inside-avoid">
                      <span className="absolute left-2 top-5 h-3 w-3 rounded-full ring-4 ring-white bg-[var(--ring)] shadow" />
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.4, delay: idx * 0.05 }}
                        className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm hover:shadow-md transition print:shadow-none"
                      >
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-lg bg-neutral-900 text-white grid place-items-center text-xs font-bold">{e.logo}</div>
                            <div>
                              <h4 className="font-semibold leading-tight">{e.role}</h4>
                              <p className="text-sm text-neutral-600">{e.company} · {e.location}</p>
                            </div>
                          </div>
                          <span className="text-sm text-neutral-500">{e.period}</span>
                        </div>
                        <p className="mt-3 text-[0.95rem] leading-relaxed">{e.summary}</p>
                        <p className="mt-2 text-sm text-neutral-600"><span className="font-medium">Tech</span> : {e.tech}</p>
                      </motion.div>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Diplomas */}
            <section className="space-y-6">
              <h3 className="text-lg font-semibold uppercase tracking-wider text-neutral-500">Diplômes</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {diplomas.map((d, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: idx * 0.04 }}
                    className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm hover:shadow-md transition print:shadow-none"
                  >
                    <div className="flex items-center justify-between">
                      <div className="h-9 w-9 rounded-lg bg-[var(--accent)] text-white grid place-items-center text-sm font-bold">{d.year}</div>
                    </div>
                    <p className="mt-3 leading-relaxed">{d.text}</p>
                  </motion.div>
                ))}
              </div>
            </section>
          </main>
        </div>

        {/**
         * (Optionnel) Ajoute dans globals.css pour un export PDF A4 parfait :
         * @layer base {
         *   @media print { html, body { height: auto; } }
         *   @page { size: A4; margin: 12mm; }
         * }
         */}
      </div>
    </PageLayout>
  );
}
