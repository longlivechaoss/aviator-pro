"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Settings,
  CheckCircle2,
  TrendingUp,
  User,
  Bell,
  Info,
  LogOut,
  ChevronRight,
  Gem,
  Sparkles,
} from "lucide-react";

const MENU_ITEMS = [
  {
    href: "#",
    label: "Dados Pessoais",
    icon: User,
    showChevron: true,
  },
  {
    href: "#",
    label: "Notificações",
    icon: Bell,
    showChevron: true,
  },
  {
    href: "#",
    label: "Sobre o App",
    icon: Info,
    showChevron: true,
  },
] as const;

export default function PerfilPage() {
  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between p-4 pb-2 sticky top-0 z-10 bg-background border-b border-slate-800"
      >
        <Link
          href="/"
          className="flex size-12 shrink-0 items-center justify-center rounded-full hover:bg-slate-800/50 transition-colors text-slate-100"
          aria-label="Voltar"
        >
          <ArrowLeft size={22} strokeWidth={2} />
        </Link>
        <h2 className="text-slate-100 text-lg font-bold leading-tight tracking-tight flex-1 text-center">
          Meu Perfil
        </h2>
        <div className="flex w-12 items-center justify-end">
          <button
            type="button"
            className="flex size-12 items-center justify-center rounded-xl bg-transparent text-slate-100 hover:bg-slate-800/50 transition-colors"
            aria-label="Configurações"
          >
            <Settings size={22} strokeWidth={2} />
          </button>
        </div>
      </motion.header>

      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden pb-28">
        {/* Profile Section */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="flex p-6"
        >
          <div className="flex w-full flex-col gap-6 items-center">
            <div className="flex gap-4 flex-col items-center">
              <div className="relative">
                <div className="relative size-32 rounded-full overflow-hidden border-4 border-primary/30 bg-slate-800">
                  <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGSB-BO0DM4JUjqCyEOktng9RqR8K4exCxAGTohNzmDWRzjNb2m6RoY9yYCMSKzwK8QgtynUziZ2xzoP7ZzmsE9SwnWYTJcPoE-LcMWt0Tbf-GPMWF0XzP0OLjquB2yyoPjX-_ZTt2qWDFFuzR2XpM_PlZnBoJgkhXkD7xxUhO8O546F74LZHPGBuv5se-MWbfcaFhxOcwKt2VQDRXRsHlNZ4TjrvCzn5lb75oxlA39ICy8XcLgL9yzHYT8oNc8EjMbTArHsTPHh9I"
                    alt="Foto de perfil do usuário"
                    fill
                    className="object-cover"
                    sizes="128px"
                  />
                </div>
                <div className="absolute bottom-0 right-0 bg-primary text-white p-1.5 rounded-full border-4 border-background">
                  <CheckCircle2 size={14} strokeWidth={2.5} />
                </div>
              </div>
              <div className="flex flex-col items-center justify-center text-center">
                <p className="text-slate-100 text-2xl font-bold leading-tight tracking-tight">
                  João Silva
                </p>
                <p className="text-primary text-base font-semibold leading-normal">
                  Membro Aviator Pro
                </p>
              </div>
            </div>
            <div className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-primary/20 border border-primary/30 px-6">
              <Gem size={18} className="text-primary" strokeWidth={2} />
              <p className="text-primary text-sm font-bold uppercase tracking-wider">
                Nível Diamante
              </p>
            </div>
          </div>
        </motion.section>

        {/* Stats Grid */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 gap-4 p-4"
        >
          <div className="flex flex-col gap-2 rounded-xl p-5 bg-slate-800/50 border border-slate-800">
            <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">
              Taxa de Acerto
            </p>
            <p className="text-white tracking-tight text-2xl font-bold leading-tight">
              87%
            </p>
            <p className="text-emerald-500 text-xs font-bold flex items-center gap-1">
              <TrendingUp size={12} strokeWidth={2} />
              +5.2%
            </p>
          </div>
          <div className="flex flex-col gap-2 rounded-xl p-5 bg-slate-800/50 border border-slate-800">
            <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">
              Sinais Seguidos
            </p>
            <p className="text-white tracking-tight text-2xl font-bold leading-tight">
              1.240
            </p>
            <p className="text-slate-400 text-xs font-medium italic">
              Este mês
            </p>
          </div>
          {/* Lucro Simulado - destaque dourado */}
          <motion.div
            layout
            className="flex flex-col gap-4 rounded-2xl p-6 bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-2 border-[#D4AF37]/50 shadow-[0_0_20px_rgba(212,175,55,0.15)] col-span-2"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.2em] mb-1">
                  Lucro Simulado Total
                </p>
                <p className="text-white tracking-tight text-4xl font-black leading-tight">
                  R$ 4.500,00
                </p>
              </div>
              <div className="size-12 rounded-full bg-gradient-to-tr from-[#BF953F] via-[#FCF6BA] to-[#B38728] flex items-center justify-center shadow-lg">
                <Sparkles
                  size={24}
                  className="text-slate-900"
                  strokeWidth={2}
                />
              </div>
            </div>
            <div className="flex items-center gap-2 bg-[#D4AF37]/10 w-fit px-3 py-1.5 rounded-full">
              <TrendingUp size={16} className="text-[#D4AF37]" strokeWidth={2} />
              <p className="text-[#D4AF37] text-sm font-bold">
                +12% acumulado este mês
              </p>
            </div>
          </motion.div>
        </motion.section>

        {/* Menu Configurações */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex flex-col p-4 gap-2"
        >
          <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest px-2 mb-2">
            Configurações
          </h3>
          {MENU_ITEMS.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.18 + index * 0.03 }}
            >
              <Link
                href={item.href}
                className="flex items-center justify-between p-4 bg-slate-800/30 hover:bg-slate-800/60 rounded-xl transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <item.icon size={20} strokeWidth={2} />
                  </div>
                  <span className="font-medium text-slate-200">
                    {item.label}
                  </span>
                </div>
                {item.showChevron && (
                  <ChevronRight
                    size={20}
                    className="text-slate-400 group-hover:translate-x-1 transition-transform"
                    strokeWidth={2}
                  />
                )}
              </Link>
            </motion.div>
          ))}
          <motion.button
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.27 }}
            type="button"
            onClick={handleSair}
            className="flex items-center justify-between p-4 bg-rose-500/5 hover:bg-rose-500/10 rounded-xl transition-colors group mt-4 w-full"
          >
            <div className="flex items-center gap-4">
              <div className="size-10 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-500 shrink-0">
                <LogOut size={20} strokeWidth={2} />
              </div>
              <span className="font-bold text-rose-500">Sair da Conta</span>
            </div>
          </motion.button>
        </motion.section>
      </div>
    </>
  );
}
