"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  PlaneTakeoff,
  Radio,
  GraduationCap,
  ArrowRight,
} from "lucide-react";

const SLIDES = [
  {
    id: 1,
    title: "Bem-vindo ao Aviator Pro",
    description:
      "Sua área de membros gratuita para acompanhar sinais, aulas e ferramentas de gestão. Tudo em um só lugar para evoluir no jogo.",
    icon: PlaneTakeoff,
    gradient: "from-primary/20 to-background",
  },
  {
    id: 2,
    title: "Sinais em Tempo Real",
    description:
      "Receba alertas de entrada com horário e multiplicador alvo. Acompanhe o histórico e copie o valor sugerido para suas apostas.",
    icon: Radio,
    gradient: "from-primary/25 to-background",
  },
  {
    id: 3,
    title: "Aprenda e Evolua",
    description:
      "Aulas em níveis do iniciante ao intermediário, estratégias em vídeo e calculadora de gestão para controlar sua banca com segurança.",
    icon: GraduationCap,
    gradient: "from-primary/20 to-background",
  },
];

export default function OnboardingPage() {
  const [slide, setSlide] = useState(0);
  const router = useRouter();
  const isLast = slide === SLIDES.length - 1;
  const current = SLIDES[slide];
  const Icon = current.icon;

  const handleNext = () => {
    if (isLast) {
      if (typeof window !== "undefined") {
        localStorage.setItem("hasSeenOnboarding", "true");
      }
      router.push("/login");
      return;
    }
    setSlide((s) => s + 1);
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-hidden bg-background">
      {/* Top bar */}
      <div className="flex items-center justify-between p-6 z-10">
        <h2 className="text-primary text-xl font-extrabold tracking-tight">
          Aviator Pro
        </h2>
        <Link
          href="/login"
          className="text-slate-400 text-sm font-semibold hover:text-primary transition-colors"
        >
          Pular
        </Link>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center px-6">
        <div className="w-full max-w-md mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center"
            >
              <div
                className={`aspect-square w-full max-w-[280px] rounded-2xl overflow-hidden bg-gradient-to-br ${current.gradient} border border-primary/10 flex items-center justify-center shadow-2xl shadow-primary/10`}
              >
                <Icon
                  size={80}
                  className="text-primary opacity-90"
                  strokeWidth={1.5}
                />
              </div>
              <div className="mt-10 text-center">
                <h1 className="text-white text-3xl font-extrabold leading-tight tracking-tight mb-4">
                  {current.title}
                </h1>
                <p className="text-slate-400 text-base font-medium leading-relaxed">
                  {current.description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom: dots + button */}
      <div className="p-6 flex flex-col items-center gap-8 pb-10">
        <div className="flex gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setSlide(i)}
              className="rounded-full transition-all focus:outline-none"
              aria-label={`Slide ${i + 1}`}
            >
              <span
                className={`block rounded-full transition-all ${
                  i === slide
                    ? "h-2 w-8 bg-primary"
                    : "h-2 w-2 bg-slate-600 hover:bg-slate-500"
                }`}
              />
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={handleNext}
          className="w-full max-w-md bg-primary hover:bg-primary/90 text-white font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
        >
          {isLast ? "Começar" : "Próximo"}
          <ArrowRight size={20} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
