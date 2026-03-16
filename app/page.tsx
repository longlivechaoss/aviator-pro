"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Bell,
  TrendingUp,
  PlaneTakeoff,
  GraduationCap,
  Radio,
  Calculator,
  Trophy,
  Lightbulb,
  Sparkles,
  ChevronRight,
} from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

const SPARKLINE_HEIGHTS = [40, 30, 55, 45, 70, 60, 85];

const QUICK_ACCESS = [
  {
    href: "/aulas",
    title: "Aulas",
    description: "Aprenda as estratégias",
    icon: GraduationCap,
  },
  {
    href: "/sinais",
    title: "Sinais",
    description: "Alertas em tempo real",
    icon: Radio,
  },
  {
    href: "/calculadora",
    title: "Gestão",
    description: "Gerencie sua gestão",
    icon: Calculator,
  },
  {
    href: "/ranking",
    title: "Ranking",
    description: "Top membros da semana",
    icon: Trophy,
  },
] as const;

export default function DashboardPage() {
  return (
    <>
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-background/80 backdrop-blur-md border-b border-slate-800/50"
      >
        <div className="flex items-center gap-3">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent-green rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000" />
            <div className="relative size-10 rounded-full overflow-hidden border-2 border-primary/20 bg-slate-800">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbWhI3XzUmtuBtlikrvFo9QasUlOBZdfVAJUESfKEdeWBATs7pkr3qa0U1RTKOIQggKtPWgBmU9HpYS-UoDHkl8nGoojvsLGEtUOYX1db-3gUPN2GlkyuQwTGUHKM7JOB9kG42oteWFoAlM8VoJ-Jx7GI_voX-5R3wS-LLDfVMeAs3xDrdJLUpjyEBfI6qyAyKGSOP4LxI_-ReOv2n3562daiqPighaxrQ3atuUfTS3CwiUqbJqAt6-9cQCK0izVXz3xnst5DpewA3"
                alt="Avatar do usuário"
                width={40}
                height={40}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest text-primary font-bold">
              Membro Pro
            </span>
            <h1 className="text-lg font-extrabold leading-tight tracking-tight text-white">
              Aviator Pro
            </h1>
          </div>
        </div>
        <button
          type="button"
          className="relative p-2 rounded-full bg-slate-800/50 hover:bg-slate-800 transition-colors text-slate-300 hover:text-white"
          aria-label="Notificações"
        >
          <Bell size={22} strokeWidth={2} />
          <span className="absolute top-2 right-2 size-2 bg-accent-green rounded-full shadow-[0_0_8px_#00FF88]" />
        </button>
      </motion.header>

      <main className="flex-1 overflow-y-auto px-6 pb-24 space-y-6">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-6 pt-2"
        >
          {/* Card Banca Atual */}
          <motion.section
            variants={item}
            className="relative p-6 rounded-2xl overflow-hidden glass-card glow-primary-soft"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/5 to-transparent -z-10" />
            <div className="absolute -top-12 -right-12 size-48 bg-primary/10 rounded-full blur-3xl -z-10" />
            <div className="flex justify-between items-start mb-4">
              <p className="text-slate-400 text-sm font-medium">Banca Atual</p>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent-green/10 text-accent-green text-xs font-bold border border-accent-green/20">
                <TrendingUp size={12} className="shrink-0" />
                +15.4%
              </div>
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-primary to-accent-green bg-clip-text text-transparent">
              R$ 12.450,00
            </h2>
            <div className="w-full h-12 flex items-end gap-1 mb-2 opacity-60">
              {SPARKLINE_HEIGHTS.map((h, i) => (
                <div
                  key={i}
                  className={`flex-1 min-w-0 rounded-t border-t-2 ${
                    i === SPARKLINE_HEIGHTS.length - 1
                      ? "bg-primary/40 border-primary"
                      : "bg-primary/20 border-transparent"
                  }`}
                  style={{ height: `${h}%` }}
                  aria-hidden
                />
              ))}
            </div>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
              Variação nos últimos 7 dias
            </p>
          </motion.section>

          {/* Card Sinal Ativo */}
          <motion.section variants={item} className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500/20 to-primary/20 rounded-2xl blur opacity-30 -z-10" />
            <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-card-dark border border-slate-800">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center size-12 rounded-xl bg-slate-800/80 shrink-0">
                  <PlaneTakeoff
                    size={28}
                    className="text-primary"
                    strokeWidth={2}
                  />
                </div>
                <div>
                  <p className="text-white font-bold text-base">Sinal Ativo</p>
                  <p className="text-slate-400 text-xs">
                    Aguardando Próximo Voo
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 w-fit">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                  </span>
                  <span className="text-red-500 text-[10px] font-black uppercase tracking-widest">
                    AO VIVO
                  </span>
                </div>
                <Link
                  href="/sinais"
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary hover:bg-primary/90 text-white font-bold text-sm shadow-[0_4px_20px_rgba(14,165,233,0.4)] transition-all active:scale-[0.98]"
                >
                  Entrar Agora
                  <ChevronRight size={18} />
                </Link>
              </div>
            </div>
          </motion.section>

          {/* Grid Acesso Rápido */}
          <motion.section
            variants={item}
            className="grid grid-cols-2 gap-4"
          >
            {QUICK_ACCESS.map((card, index) => (
              <motion.div
                key={card.href}
                variants={item}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={card.href}
                  className="group relative block p-5 rounded-2xl glass-card hover:bg-white/5 transition-all duration-300 border border-white/10"
                >
                  <div className="mb-4 size-10 rounded-lg flex items-center justify-center bg-primary/10 border border-primary/50 shadow-[inset_0_0_10px_rgba(14,165,233,0.2)]">
                    <card.icon
                      size={22}
                      className="text-primary"
                      strokeWidth={2}
                    />
                  </div>
                  <h3 className="text-white font-bold text-sm mb-1">
                    {card.title}
                  </h3>
                  <p className="text-slate-500 text-[10px]">
                    {card.description}
                  </p>
                </Link>
              </motion.div>
            ))}
          </motion.section>

          {/* Dica do Especialista */}
          <motion.section
            variants={item}
            className="p-5 rounded-2xl bg-gradient-to-r from-primary to-blue-700 relative overflow-hidden"
          >
            <div className="absolute right-0 top-0 h-full w-1/3 opacity-20 pointer-events-none flex items-center justify-center">
              <Lightbulb
                size={80}
                className="-rotate-12 translate-x-10 translate-y-4 text-white"
              />
            </div>
            <div className="relative z-10 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-white shrink-0" />
                <span className="text-white text-[10px] font-black uppercase tracking-widest opacity-80">
                  Dica do Especialista
                </span>
              </div>
              <p className="text-white font-semibold text-sm leading-relaxed">
                &ldquo;Mantenha sua gestão de 2% ao dia. A paciência é a melhor
                estratégia para lucros constantes.&rdquo;
              </p>
            </div>
          </motion.section>
        </motion.div>
      </main>
    </>
  );
}
