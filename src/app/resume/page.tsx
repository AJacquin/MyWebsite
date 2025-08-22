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
  Printer,
} from "lucide-react";

function PrintButton() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <button
      onClick={handlePrint}
      className="fixed bottom-4 right-4 px-4 py-2 rounded-lg bg-blue-600 text-white shadow hover:bg-blue-700 flex items-center gap-2 print:hidden"
    >
      <Printer className="h-4 w-4" />
      Imprimer
    </button>
  );
}

export default function CVPortfolio() {
  const skills = {
    "Description Matérielle": ["Verilog", "VHDL"],
    "Programmation": [
      "C",
      "C++",
      "Java",
      "Python",
      "Matlab",
    ],
    "Outils": ["Xsim", "Modelsim", "Gtkwave", "Vivado", "VSCode", "Netbeans", "Git", "Hg"],
    "Systèmes": ["Windows", "Linux"],
    "Domaines": ["ATE", "Traitement d'image"],
  } as const;

  const languages = [
    { label: "Français", level: "C2", flagUrl: "/flags/france.png" },
    { label: "Anglais", level: "C1", flagUrl: "/flags/uk.png" },
    { label: "Espagnol", level: "B1", flagUrl: "/flags/spain.png" },
  ];

  const experiences = [
    {
      period: "2021 –",
      role: "Ingénieur électronique numérique",
      company: "AEM MU-TEST",
      location: "Saint-Jean-Bonnefonds",
      summary:
        "Architecture FPGA, développement, simulation, validation. Logiciel embarqué, serveur de tests, caractérisation, planification carte électronique pour Machines de tests de composants électroniques.",
      tech: "FPGA Xilinx, PICmicro, Verilog, UVM, cocotb, Python, C, C++, Java, Hg, Gestion de projet",
      logoUrl: "/logos/aem.png",
    },
    {
      period: "2020 – 2021",
      role: "Ingénieur automatisme",
      company: "NBC-SYS (KNDS CBRN)",
      location: "Saint-Chamond",
      summary:
        "Programmation IHM et schémas électriques pour véhicules blindés.",
      tech: "CAN Bus, JavaScript, Documentation",
      logoUrl: "/logos/nbc.png",
    },
    {
      period: "2020",
      role: "Ingénieur systèmes embarqués",
      company: "CIO Systèmes Embarqués",
      location: "Saint-Étienne",
      summary:
        "Système de calibration et détection de perte de connectivité pour appareil de mesure de dureté du sol.",
      tech: "STM32, C, Python, wxWidgets, Git, Électronique analogique",
      logoUrl: "/logos/cio.png",
    },
    {
      period: "2019",
      role: "Ingénieur systèmes embarqués",
      company: "Dublin Institute of Technology",
      location: "Dublin",
      summary:
        "Scanner Bluetooth Low-Energy pour thèse de sociologie.",
      tech: "Raspberry Pi, Python, Linux, Anglais",
      logoUrl: "/logos/dit.jpg",
    },
    {
      period: "2017",
      role: "Technicien automatisme",
      company: "O‑I Manufacturing",
      location: "Veauche",
      summary:
        "Banc de test pour machines de formage de bouteilles en verre.",
      tech: "Automate Schneider, Ladder, électrotechnique, mécanique, maintenance",
      logoUrl: "/logos/oi.png",
    },
  ];

  const diplomas = [
    {
      period: "2020",
      school: "Télécom Saint‑Étienne",
      diploma: "Diplôme d’ingénieur",
      speciality: "Systèmes d’imagerie et électronique",
      logoUrl: "/logos/tse.png",
    },
    {
      period: "2020",
      school: "École Centrale de Lyon",
      diploma: "Master",
      speciality: "Électronique, énergie électrique et automatisation",
      logoUrl: "/logos/ecl.png",
    },
    {
      period: "2017",
      school: "Télécom Saint‑Étienne",
      diploma: "Diplôme Universitaire (DU)",
      speciality: "Cycle initial en Technologies de l’information",
      logoUrl: "/logos/tse.png",
    },
    {
      period: "2017",
      school: "IUT de Saint‑Étienne",
      diploma: "Diplôme Universitaire de Technologie (DUT)",
      speciality: "Génie électrique et informatique industrielle",
      logoUrl: "/logos/iut.png",
    },
  ];

  return (
    <PageLayout hideOnPrint>
      <PrintButton />
      <div className="cv-wrapper min-h-screen w-full bg-neutral-50 text-neutral-900 dark:bg-slate-900 dark:text-slate-200 [--accent:#0f172a] [--accent-2:#312e81] [--ring:#1d4ed8]">        {/* Container grid preserved for print */}
        <div className="mx-auto max-w-6xl p-6 md:p-10 grid grid-cols-1 md:grid-cols-12 gap-6 print:grid-cols-12 print:gap-6 print:p-6 print:max-w-[210mm] print:h-[297mm] print:[-webkit-print-color-adjust:exact] print:[print-color-adjust:exact] dark:bg-slate-900">
          {/* SIDEBAR */}
          <aside className="md:col-span-4 lg:col-span-3 print:col-span-4 rounded-2xl overflow-hidden shadow-sm border border-neutral-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 flex flex-col h-full">
            {/* Name + role */}
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="px-3 py-6 border-b border-neutral-200 dark:border-slate-700">
              <div className="flex items-center gap-4">
                <div>
                  <h1 className="text-xl font-bold leading-tight">Axel Jacquin</h1>
                  <p className="text-sm text-neutral-600 dark:text-slate-200">Ingénieur électronique numérique</p>
                </div>
              </div>

              {/* Contact */}
              <ul className="mt-4 text-sm">
                <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 text-[var(--accent-2)]" /><span>105 cours Fauriel,42100 Saint‑Étienne</span></li>
                <li className="flex items-start gap-2"><Phone className="h-4 w-4 mt-0.5 text-[var(--accent-2)]" /><a href="tel:+33640350125" className="hover:underline">06.40.35.01.25</a></li>
                <li className="flex items-start gap-2"><Mail className="h-4 w-4 mt-0.5 text-[var(--accent-2)]" /><a href="mailto:axel.c.e.jacquin@gmail.com" className="hover:underline">axel.c.e.jacquin@gmail.com</a></li>
                <li className="flex items-start gap-2"><Globe className="h-4 w-4 mt-0.5 text-[var(--accent-2)]" /><a href="http://axel.jacquin.duckdns.org" className="hover:underline">axel.jacquin.duckdns.org</a></li>
              </ul>

              {/* Socials */}
              <div className="mt-4 flex items-center gap-3 text-neutral-600 dark:text-slate-200">
                <a href="https://github.com/AJacquin" className="inline-flex items-center gap-1 hover:text-black transition">
                  <Github className="h-4 w-4" /> <span className="text-sm">AJacquin</span>
                </a>
                <span className="text-neutral-300 dark:text-slate-400">•</span>
                <a href="https://linkedin.com/in/axeljacquin" className="inline-flex items-center gap-1 hover:text-black transition">
                  <Linkedin className="h-4 w-4" /> <span className="text-sm">axeljacquin</span>
                </a>
              </div>
            </motion.div>

            {/* Skills */}
            <section className="mt-4 px-6 pb-4 dark:bg-slate-800">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-slate-200 mb-3 flex items-center gap-2"><Code className="h-4 w-4 dark:text-slate-200" /> Compétences</h2>
              {Object.entries(skills).map(([group, items]) => (
                <div key={group} className="mb-2">
                  <div className="text-xs font-semibold text-neutral-500 dark:text-slate-300 mb-1">{group}</div>
                  <div className="flex flex-wrap justify-center gap-2">
                    {items.map((s, i) => (
                      <motion.span
                        key={`${group}-${s}`}
                        className="px-3 py-1 text-xs rounded-full border border-neutral-300 dark:border-slate-600 bg-white dark:bg-slate-700 shadow-sm hover:shadow transition will-change-transform text-neutral-900 dark:text-slate-200"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
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
            <section className="px-6 pb-4 dark:bg-slate-800">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-slate-200 mb-3 flex items-center gap-2"><Languages className="h-4 w-4 dark:text-slate-200" /> Langues</h2>
              <ul className="space-y-2">
                {languages.map((lng) => (
                  <li key={lng.label}>
                    <div className="flex items-center justify-between text-sm">
                      {/* Drapeau + espace fixe */}
                      <div className="flex items-center">
                        <Image
                          src={lng.flagUrl}
                          alt={lng.label + " flag"}
                          width={20}
                          height={14}
                          className="rounded shadow"
                        />
                        <span className="inline-block w-3" /> {/* espace fixe */}
                        <span>{lng.label}</span>
                      </div>
                      <span className="text-neutral-500 dark:text-slate-200">{lng.level}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* Hobbies */}
            <section className="px-6 pb-6 dark:bg-slate-800 flex-1" style={{ minHeight: "1px" }}>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-slate-200 mb-3 flex items-center gap-2"><Cpu className="h-4 w-4 dark:text-slate-200" /> Centres d'intérêt</h2>
              <div className="flex flex-wrap justify-center gap-2">
                <span className="flex items-center gap-2 px-3 py-1 text-xs rounded-full border border-neutral-300 dark:border-slate-600 bg-white dark:bg-slate-700 shadow-sm hover:shadow transition text-neutral-900 dark:text-slate-200"><Dumbbell className="h-4 w-4 text-[var(--accent-2)] dark:text-slate-200" /> Tennis, Escalade, Judo, Course à pied</span>
                <span className="flex items-center gap-2 px-3 py-1 text-xs rounded-full border border-neutral-300 dark:border-slate-600 bg-white dark:bg-slate-700 shadow-sm hover:shadow transition text-neutral-900 dark:text-slate-200"><Music2 className="h-4 w-4 text-[var(--accent-2)] dark:text-slate-200" /> Piano, Production</span>
                <span className="flex items-center gap-2 px-3 py-1 text-xs rounded-full border border-neutral-300 dark:border-slate-600 bg-white dark:bg-slate-700 shadow-sm hover:shadow transition text-neutral-900 dark:text-slate-200"><Puzzle className="h-4 w-4 text-[var(--accent-2)] dark:text-slate-200" /> Rubik’s Cube, Robotique</span>
              </div>
            </section>
          </aside>

          {/* MAIN */}
          <main className="md:col-span-8 lg:col-span-9 print:col-span-8 space-y-2 dark:bg-slate-900">
            {/* Experiences */}
            <section className="space-y-2">
              <h3 className="text-xl font-bold uppercase tracking-wider text-neutral-900 dark:text-slate-200 print:hidden">Expériences</h3>
              <div className="relative">
                {/* Ligne verticale */}
                <div className="absolute left-4 top-0 bottom-0 w-px bg-slate-300 dark:bg-slate-700 print:hidden" />
                {/* Liste des expériences */}
                <ul className="space-y-2">
                  {experiences.map((e, idx) => (
                    <li key={idx} className="relative pl-10 break-inside-avoid print:pl-0">
                      <span className="absolute left-2.5 top-5 h-3 w-3 rounded-full bg-slate-900 dark:bg-slate-200 print:hidden" />
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: idx * 0.05 }}
                        className="rounded-xl border border-neutral-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 p-2 shadow-sm hover:shadow-md transition"
                      >
                        <div className="flex flex-wrap items-baseline justify-between gap-2 text-neutral-900 dark:text-slate-100">
                          <div className="flex w-full items-center gap-3">
                            <div className="h-9 w-9 rounded-lg grid place-items-center overflow-hidden bg-transparent">
                              <Image
                                src={e.logoUrl}
                                alt={e.company}
                                width={28}
                                height={28}
                                className="object-contain h-7 w-7"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex flex-row items-baseline w-full">
                                <h4 className="font-semibold leading-tight flex-1">{e.role}</h4>
                                <span className="text-sm text-neutral-500 dark:text-slate-200 text-right min-w-0">{e.period}</span>
                              </div>
                              <p className="text-sm text-neutral-600 dark:text-slate-200">{e.company} · {e.location}</p>
                            </div>
                          </div>
                        </div>
                          <p className="mt-1 text-[0.95rem] leading-relaxed text-neutral-900 dark:text-slate-100 text-justify">{e.summary}</p>
                        <p className="mt-1 text-sm text-neutral-600 dark:text-slate-300 text-justify">{e.tech}</p>
                      </motion.div>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Education */}
            <section className="space-y-1">
              <h3 className="text-xl font-bold uppercase tracking-wider text-neutral-900 dark:text-slate-200">Formation</h3>
              <div className="relative">
                {/* Ligne verticale */}
                <div className="absolute left-4 top-0 bottom-0 w-px bg-slate-300 dark:bg-slate-700 print:hidden" />
                {/* Liste des diplômes */}
                <ul className="space-y-2">
                  {diplomas.map((d, idx) => (
                    <li key={idx} className="relative pl-10 break-inside-avoid print:pl-0">
                      <span className="absolute left-2.5 top-5 h-3 w-3 rounded-full bg-slate-900 dark:bg-slate-200 print:hidden" />
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: idx * 0.05 }}
                        className="rounded-xl border border-neutral-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 p-2 shadow-sm hover:shadow-md transition"
                      >
                        <div className="flex flex-wrap items-baseline justify-between gap-2 text-neutral-900 dark:text-slate-100">
                          <div className="flex w-full items-center gap-3">
                            <div className="h-9 w-9 rounded-lg grid place-items-center overflow-hidden bg-transparent">
                              <Image
                                src={d.logoUrl}
                                alt={d.school}
                                width={28}
                                height={28}
                                className="object-contain h-7 w-7"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex flex-row items-baseline w-full">
                                <h4 className="font-semibold leading-tight flex-1">{d.diploma}</h4>
                                <span className="text-sm text-neutral-500 dark:text-slate-200 text-right min-w-0">{d.period}</span>
                              </div>
                              <p className="text-sm text-neutral-600 dark:text-slate-200">{d.school}</p>
                            </div>
                          </div>
                        </div>
                        <p className="mt-1 text-[0.95rem] leading-relaxed text-neutral-900 dark:text-slate-100">{d.speciality}</p>
                      </motion.div>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </main>
        </div>
      </div>
      <style jsx global>{`
        @media print {
          .cv-content {
            display: grid !important;
            grid-template-columns: repeat(12, minmax(0, 1fr)) !important;
          }
        }
      `}</style>
    </PageLayout>
  );
}
