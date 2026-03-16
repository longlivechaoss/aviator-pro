"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  PlaneTakeoff,
  Copy,
  Check,
  TrendingUp,
  TrendingDown,
  Radio,
} from "lucide-react";

interface HistoricoItem {
  id: string;
  horario: string;
  multiplicador: string;
  resultado: "win" | "loss";
  valor?: string;
}

const HISTORICO_MOCK: HistoricoItem[] = [
  { id: "1", horario: "14:32", multiplicador: "2.15x", resultado: "win", valor: "+R$ 23,00" },
  { id: "2", horario: "14:28", multiplicador: "0.85x", resultado: "loss" },
  { id: "3", horario: "14:25", multiplicador: "1.92x", resultado: "win", valor: "+R$ 18,40" },
  { id: "4", horario: "14:21", multiplicador: "1.50x", resultado: "win", valor: "+R$ 15,00" },
  { id: "5", horario: "14:18", multiplicador: "0.42x", resultado: "loss" },
  { id: "6", horario: "14:14", multiplicador: "2.08x", resultado: "win", valor: "+R$ 21,60" },
];

const ENTRADA_COPIAR = "R$ 20,00";

export default function SinaisPage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(ENTRADA_COPIAR);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-background/80 backdrop-blur-md border-b border-slate-800/50"
      >
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center justify-center size-10 rounded-full hover:bg-slate-800/50 transition-colors text-primary"
            aria-label="Voltar"
          >
            <ArrowLeft size={22} strokeWidth={2} />
          </Link>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest text-primary font-bold">
              Sinais
            </span>
            <h1 className="text-lg font-extrabold leading-tight tracking-tight text-white">
              Ao Vivo
            </h1>
          </div>
        </div>
        <div className="flex items-center justify-center size-10 rounded-full bg-slate-800/50">
          <Radio size={22} className="text-primary" strokeWidth={2} />
        </div>
      </motion.header>

      <main className="flex-1 overflow-y-auto px-6 pb-28 space-y-6 pt-2">
        {/* Card Sinal ao Vivo */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="relative"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500/20 to-primary/20 rounded-2xl blur opacity-30 -z-10" />
          <div className="relative p-5 rounded-2xl bg-card-dark border border-slate-800 overflow-hidden">
            <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
              </span>
              <span className="text-red-500 text-[10px] font-black uppercase tracking-widest">
                AO VIVO
              </span>
            </div>

            <div className="flex items-center gap-4 mb-5">
              <div className="flex items-center justify-center size-12 rounded-xl bg-slate-800/80 shrink-0">
                <PlaneTakeoff size={28} className="text-primary" strokeWidth={2} />
              </div>
              <div>
                <p className="text-white font-bold text-base">Próximo Sinal</p>
                <p className="text-slate-400 text-xs">Aguardando janela de entrada</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-5">
              <div className="rounded-xl bg-slate-800/50 p-3 border border-slate-700/50">
                <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-1">
                  Horário de Entrada
                </p>
                <p className="text-white font-bold text-lg">14:35</p>
              </div>
              <div className="rounded-xl bg-slate-800/50 p-3 border border-slate-700/50">
                <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-1">
                  Multiplicador Alvo
                </p>
                <p className="text-primary font-bold text-lg">1.50x – 2.20x</p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCopy}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-sm shadow-[0_4px_20px_rgba(14,165,233,0.4)] transition-all active:scale-[0.98]"
            >
              {copied ? (
                <>
                  <Check size={20} strokeWidth={2.5} />
                  Copiado!
                </>
              ) : (
                <>
                  <Copy size={20} strokeWidth={2} />
                  Copiar Entrada ({ENTRADA_COPIAR})
                </>
              )}
            </button>
          </div>
        </motion.section>

        {/* Histórico Recente */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-sm font-bold text-slate-300 mb-3 uppercase tracking-wider">
            Histórico Recente
          </h2>
          <ul className="space-y-2">
            {HISTORICO_MOCK.map((item, index) => (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.12 + index * 0.03 }}
                className={`flex items-center justify-between p-4 rounded-xl border ${
                  item.resultado === "win"
                    ? "bg-emerald-500/5 border-emerald-500/20"
                    : "bg-rose-500/5 border-rose-500/20"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex items-center justify-center size-10 rounded-full shrink-0 ${
                      item.resultado === "win"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-rose-500/20 text-rose-400"
                    }`}
                  >
                    {item.resultado === "win" ? (
                      <TrendingUp size={20} strokeWidth={2} />
                    ) : (
                      <TrendingDown size={20} strokeWidth={2} />
                    )}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{item.horario}</p>
                    <p className="text-slate-400 text-xs">{item.multiplicador}</p>
                  </div>
                </div>
                {item.resultado === "win" && item.valor && (
                  <span className="text-emerald-400 font-bold text-sm">{item.valor}</span>
                )}
                {item.resultado === "loss" && (
                  <span className="text-rose-400 font-bold text-sm">Perda</span>
                )}
              </motion.li>
            ))}
          </ul>
        </motion.section>
      </main>
    </>
  );
}
