"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Search,
  Bell,
  ChevronDown,
  ChevronUp,
  PlayCircle,
  CheckCircle2,
  Lock,
  Trophy,
  Info,
} from "lucide-react";

interface Lesson {
  id: string;
  title: string;
  duration: string;
  moduleLabel: string;
  completed: boolean;
  watching?: boolean;
  thumbBg: string;
}

interface LevelConfig {
  id: string;
  badge: string;
  label: string;
  borderColor: string;
  progressColor: string;
  progress: number;
  progressLabel: string;
  expanded: boolean;
  locked?: boolean;
  lessons: Lesson[];
}

const INITIAL_LEVELS: LevelConfig[] = [
  {
    id: "1",
    badge: "INICIANTE",
    label: "Iniciante",
    borderColor: "border-green-500",
    progressColor: "bg-green-500",
    progress: 100,
    progressLabel: "100%",
    expanded: true,
    locked: false,
    lessons: [
      {
        id: "1.1",
        title: "O que é Aviator",
        duration: "05:20",
        moduleLabel: "Módulo 1",
        completed: true,
        thumbBg: "from-green-600/80 to-emerald-800/80",
      },
      {
        id: "1.2",
        title: "Como se cadastrar",
        duration: "08:45",
        moduleLabel: "Módulo 1",
        completed: true,
        thumbBg: "from-green-600/80 to-teal-800/80",
      },
      {
        id: "1.3",
        title: "Como depositar",
        duration: "06:00",
        moduleLabel: "Módulo 1",
        completed: true,
        thumbBg: "from-emerald-600/80 to-green-800/80",
      },
      {
        id: "1.4",
        title: "Como sacar",
        duration: "07:15",
        moduleLabel: "Módulo 1",
        completed: true,
        thumbBg: "from-teal-600/80 to-emerald-800/80",
      },
    ],
  },
  {
    id: "2",
    badge: "BÁSICO",
    label: "Básico",
    borderColor: "border-primary",
    progressColor: "bg-primary",
    progress: 45,
    progressLabel: "45%",
    expanded: true,
    locked: false,
    lessons: [
      {
        id: "2.1",
        title: "Como funciona o multiplicador",
        duration: "10:00",
        moduleLabel: "Módulo 2",
        completed: true,
        thumbBg: "from-primary/80 to-blue-800/80",
      },
      {
        id: "2.2",
        title: "Gestão de banca",
        duration: "12:10",
        moduleLabel: "Módulo 2",
        completed: false,
        watching: true,
        thumbBg: "from-primary/80 to-cyan-800/80",
      },
      {
        id: "2.3",
        title: "Erros comuns",
        duration: "15:30",
        moduleLabel: "Módulo 2",
        completed: false,
        thumbBg: "from-cyan-600/80 to-primary/80",
      },
    ],
  },
  {
    id: "3",
    badge: "INTERMEDIÁRIO",
    label: "Intermediário",
    borderColor: "border-violet-500",
    progressColor: "bg-violet-500",
    progress: 0,
    progressLabel: "Bloqueado",
    expanded: false,
    locked: true,
    lessons: [
      {
        id: "3.1",
        title: "Leitura de padrões",
        duration: "14:00",
        moduleLabel: "Módulo 3",
        completed: false,
        thumbBg: "from-violet-600/80 to-purple-800/80",
      },
      {
        id: "3.2",
        title: "Estratégias",
        duration: "18:20",
        moduleLabel: "Módulo 3",
        completed: false,
        thumbBg: "from-purple-600/80 to-violet-800/80",
      },
      {
        id: "3.3",
        title: "Gestão emocional",
        duration: "12:45",
        moduleLabel: "Módulo 3",
        completed: false,
        thumbBg: "from-violet-700/80 to-fuchsia-800/80",
      },
    ],
  },
];

export default function AulasPage() {
  const [levels, setLevels] = useState<LevelConfig[]>(INITIAL_LEVELS);

  const toggleLevel = (id: string) => {
    const level = levels.find((l) => l.id === id);
    if (level?.locked) return;
    setLevels((prev) =>
      prev.map((l) =>
        l.id === id ? { ...l, expanded: !l.expanded } : l
      )
    );
  };

  const globalProgress = 65;

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 flex items-center justify-between px-4 py-4 bg-background/80 backdrop-blur-md border-b border-slate-800/50 glass-card"
      >
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center justify-center size-10 rounded-full hover:bg-slate-800/50 transition-colors text-primary"
            aria-label="Voltar"
          >
            <ArrowLeft size={22} strokeWidth={2} />
          </Link>
          <div>
            <h1 className="text-lg font-bold leading-tight text-white">
              Aviator Pro Members
            </h1>
            <p className="text-xs text-slate-400">
              Área de Membros • 100% Gratuito
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className="p-2 rounded-full hover:bg-slate-800/50 transition-colors text-slate-400 hover:text-white"
            aria-label="Buscar"
          >
            <Search size={20} strokeWidth={2} />
          </button>
          <button
            type="button"
            className="p-2 rounded-full hover:bg-slate-800/50 transition-colors text-slate-400 hover:text-white"
            aria-label="Notificações"
          >
            <Bell size={20} strokeWidth={2} />
          </button>
        </div>
      </motion.header>

      <main className="max-w-2xl mx-auto p-4 space-y-6 pb-28">
        {/* Progresso Geral */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-slate-800/40 border border-slate-700/50 p-5 rounded-xl"
        >
          <div className="flex justify-between items-end mb-3">
            <div>
              <h2 className="text-sm font-medium text-slate-400">
                Seu Progresso Geral
              </h2>
              <p className="text-2xl font-bold text-primary">
                {globalProgress}%{" "}
                <span className="text-sm font-normal text-slate-500">
                  concluído
                </span>
              </p>
            </div>
            <Trophy size={32} className="text-primary shrink-0" />
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2.5 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${globalProgress}%` }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-primary h-2.5 rounded-full"
            />
          </div>
          <p className="text-xs text-slate-400 mt-3 flex items-center gap-1">
            <Info size={12} className="shrink-0" />
            Continue assim! Você está quase no nível Intermediário.
          </p>
        </motion.section>

        {/* Níveis */}
        {levels.map((level, levelIndex) => (
          <motion.div
            key={level.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + levelIndex * 0.05 }}
            className={`space-y-3 ${level.locked ? "opacity-60" : ""}`}
          >
            <button
              type="button"
              onClick={() => toggleLevel(level.id)}
              className={`w-full glass-card border-l-4 ${level.borderColor} p-4 rounded-lg flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors text-left`}
            >
              <div className="flex flex-col gap-1">
                <span
                  className={`text-[10px] uppercase tracking-wider font-bold ${
                    level.locked ? "text-slate-500" : level.id === "1" ? "text-green-500" : level.id === "2" ? "text-primary" : "text-violet-500"
                  }`}
                >
                  Nível {level.id}
                </span>
                <h3
                  className={`font-bold text-lg ${
                    level.locked ? "text-slate-500" : "text-white"
                  }`}
                >
                  {level.label}
                </h3>
                {!level.locked && (
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-slate-700 rounded-full h-1.5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${level.progress}%` }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className={`h-1.5 rounded-full ${level.progressColor}`}
                      />
                    </div>
                    <span
                      className={`text-xs font-medium ${
                        level.id === "1"
                          ? "text-green-500"
                          : level.id === "2"
                            ? "text-primary"
                            : "text-violet-500"
                      }`}
                    >
                      {level.progressLabel}
                    </span>
                  </div>
                )}
              </div>
              {level.locked ? (
                <Lock size={22} className="text-slate-400 shrink-0" />
              ) : level.expanded ? (
                <ChevronUp size={22} className="text-slate-400 shrink-0" />
              ) : (
                <ChevronDown size={22} className="text-slate-400 shrink-0" />
              )}
            </button>

            <AnimatePresence>
              {level.expanded && !level.locked && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="grid gap-3 overflow-hidden"
                >
                  {level.lessons.map((lesson, lessonIndex) => (
                    <motion.div
                      key={lesson.id}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: lessonIndex * 0.04 }}
                      className={`flex gap-4 items-center p-3 rounded-lg border ${
                        lesson.watching
                          ? "bg-slate-800/60 border-2 border-primary/50 ring-1 ring-primary/20"
                          : "bg-slate-800/30 border-slate-700/30"
                      }`}
                    >
                      <div className="relative w-24 h-16 shrink-0 rounded-md overflow-hidden">
                        <div
                          className={`w-full h-full bg-gradient-to-br ${lesson.thumbBg} flex items-center justify-center`}
                        >
                          <PlayCircle
                            size={28}
                            className="text-white/90"
                            fill={lesson.watching ? "currentColor" : undefined}
                          />
                        </div>
                        {lesson.watching && (
                          <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                            <PlayCircle
                              size={32}
                              className="text-white animate-pulse"
                              fill="currentColor"
                            />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-2">
                          <h4
                            className={`text-sm font-bold leading-tight ${
                              lesson.watching ? "text-white" : "text-slate-100"
                            }`}
                          >
                            {lesson.id} {lesson.title}
                          </h4>
                          {lesson.completed && (
                            <CheckCircle2
                              size={18}
                              className="text-green-500 shrink-0"
                              fill="currentColor"
                            />
                          )}
                          {lesson.watching && (
                            <span className="px-2 py-0.5 rounded text-[8px] bg-primary text-white font-bold uppercase shrink-0">
                              Assistindo
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-slate-500 mt-1">
                          Duração: {lesson.duration} • {lesson.moduleLabel}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {level.locked && (
              <p className="text-[10px] text-center text-slate-500">
                Conclua o Nível 2 para liberar estas aulas.
              </p>
            )}
          </motion.div>
        ))}
      </main>
    </>
  );
}
