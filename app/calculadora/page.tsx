"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Wallet,
  TrendingDown,
  TrendingUp,
  Info,
  ShieldCheck,
  Coins,
  Zap,
  Flame,
  Trophy,
  Bell,
  UserCircle,
  X,
} from "lucide-react";

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

const safeValue = (v: number) =>
  isNaN(v) || Object.is(v, -0) || v < 0 ? 0 : v;

function formatRiscoDisplay(v: number): string {
  return v.toLocaleString("pt-BR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}

function formatMultiplicadorDisplay(v: number): string {
  return v.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

type RiskLevel = "low" | "medium" | "high";

function getRiskLevel(percent: number): RiskLevel {
  if (percent <= 5) return "low";
  if (percent > 5 && percent <= 10) return "medium";
  return "high";
}

function getRiskLabel(level: RiskLevel): string {
  switch (level) {
    case "low":
      return "Gestão Conservadora";
    case "medium":
      return "Gestão Moderada";
    case "high":
      return "Gestão Agressiva";
  }
}

function getRiskDescription(level: RiskLevel): string {
  switch (level) {
    case "low":
      return "Risco controlado para crescimento constante.";
    case "medium":
      return "Equilíbrio entre exposição e proteção da banca.";
    case "high":
      return "Alto risco. Reduza o % ou revise sua gestão.";
  }
}

function getRiskColor(level: RiskLevel): string {
  switch (level) {
    case "low":
      return "text-emerald-500";
    case "medium":
      return "text-amber-500";
    case "high":
      return "text-rose-500";
  }
}

/** Posição 0–100% na barra (20% de risco = largura total). */
function getRiskMarkerPositionPercent(riscoPct: number): number {
  return Math.min(100, Math.max(0, (riscoPct / 20) * 100));
}

function sanitizeMultiplierInput(raw: string): string {
  let s = raw.replace(/[^\d.,]/g, "").replace(",", ".");
  const parts = s.split(".");
  if (parts.length > 2) {
    s = parts[0] + "." + parts.slice(1).join("");
  }
  return s;
}

export default function CalculadoraPage() {
  const [bancaStr, setBancaStr] = useState("1000");
  const [riscoStr, setRiscoStr] = useState("2");
  const [multiplicadorStr, setMultiplicadorStr] = useState("2.00");

  const banca = useMemo(() => {
    const n = parseInt(bancaStr.replace(/\D/g, ""), 10);
    return Number.isFinite(n) ? n : 0;
  }, [bancaStr]);

  const riscoPct = useMemo(() => {
    const v = parseFloat(riscoStr.replace(",", "."));
    return Number.isFinite(v) ? Math.max(0, v) : 0;
  }, [riscoStr]);

  const multiplicador = useMemo(() => {
    const v = parseFloat(multiplicadorStr.replace(",", "."));
    return Number.isFinite(v) ? v : 0;
  }, [multiplicadorStr]);

  const { entrada, stopLoss, stopWin, lucroLiquido } = useMemo(() => {
    const entradaVal = Math.max(0, banca * (riscoPct / 100));
    const stopLossVal = Math.max(0, banca * 0.05);
    const stopWinVal = Math.max(0, banca * 0.1);
    const lucroLiquidoVal = Math.max(
      0,
      entradaVal * (multiplicador - 1)
    );
    return {
      entrada: entradaVal,
      stopLoss: stopLossVal,
      stopWin: stopWinVal,
      lucroLiquido: lucroLiquidoVal,
    };
  }, [banca, riscoPct, multiplicador]);

  const riskLevel = useMemo(() => getRiskLevel(riscoPct), [riscoPct]);
  const markerPositionPercent = useMemo(
    () => getRiskMarkerPositionPercent(riscoPct),
    [riscoPct]
  );

  const handleBancaChange = (raw: string) => {
    const digits = raw.replace(/\D/g, "");
    setBancaStr(digits === "" ? "" : digits);
  };

  const handleRiscoChange = (raw: string) => {
    setRiscoStr(raw.replace(/\D/g, ""));
  };

  const handleMultiplicadorChange = (raw: string) => {
    setMultiplicadorStr(sanitizeMultiplierInput(raw));
  };

  const [showNotifModal, setShowNotifModal] = useState(false);
  const [notifSinais, setNotifSinais] = useState(false);
  const [notifDicas, setNotifDicas] = useState(false);

  const notifBadgeVisible = notifSinais || notifDicas;

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-3 items-center gap-2 sticky top-0 z-50 bg-background border-b border-slate-800 p-4"
      >
        <div className="flex justify-start">
          <Link
            href="/"
            className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-primary/10 transition-colors text-primary"
            aria-label="Voltar"
          >
            <ArrowLeft size={22} strokeWidth={2} />
          </Link>
        </div>
        <h1 className="text-primary font-bold text-center leading-tight">
          ✈️ Aviator Pro
        </h1>
        <div className="flex justify-end items-center gap-2">
          <button
            type="button"
            className="relative p-1.5 rounded-full bg-slate-800/50"
            aria-label="Notificações"
            onClick={() => setShowNotifModal(true)}
          >
            <Bell size={18} className="text-slate-400" aria-hidden />
            {notifBadgeVisible ? (
              <span className="absolute top-0 right-0 size-2 rounded-full bg-red-500 ring-2 ring-background" />
            ) : null}
          </button>
          <button
            type="button"
            className="p-1.5 rounded-full bg-slate-800/50"
            aria-label="Conta"
          >
            <UserCircle size={18} className="text-slate-400" aria-hidden />
          </button>
        </div>
      </motion.header>

      <main className="flex-1 overflow-y-auto pb-28">
        <div className="pt-4 px-0 mb-4">
          <h2 className="text-xl font-bold text-white">
            Calculadora de Gestão
          </h2>
          <p className="text-sm text-slate-400">
            Maximize seus lucros com precisão técnica.
          </p>
        </div>

        {/* Potencial do Dia */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="p-4"
        >
          <div
            className="rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-950 to-slate-900 p-3 mb-4"
            role="region"
            aria-label="Potencial do dia"
          >
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
              ✦ GESTÃO RECOMENDADA
            </p>
            <div className="grid grid-cols-3 gap-0">
              {/* Melhor Entrada */}
              <div className="flex flex-col items-center gap-0 px-2 min-w-0">
                <div className="w-7 h-7 rounded-full bg-blue-500/15 flex items-center justify-center mb-1">
                  <Zap
                    size={14}
                    strokeWidth={2}
                    className="text-primary"
                    aria-hidden
                  />
                </div>
                <p className="text-sm font-bold text-white tabular-nums transition-all duration-300 text-center">
                  {formatCurrency(safeValue(banca * 0.40))}
                </p>
                <p className="text-[10px] text-slate-400 text-center">
                  entrada ideal
                </p>
              </div>
              {/* 3 Acertos Seguidos */}
              <div className="flex flex-col items-center gap-0 px-2 min-w-0 border-l border-slate-700/50">
                <div className="w-8 h-8 rounded-full bg-green-500/15 flex items-center justify-center mb-1">
                  <Flame
                    size={16}
                    strokeWidth={2}
                    color="#00FF88"
                    aria-hidden
                  />
                </div>
                <p className="text-xl font-black text-white tabular-nums transition-all duration-300 text-center">
                  {formatCurrency(
                    safeValue(
                      banca * 0.40 * (multiplicador - 1) * 3
                    )
                  )}
                </p>
                <p className="text-[10px] text-slate-400 text-center">
                  3 acertos seguidos
                </p>
              </div>
              {/* Potencial em 10x */}
              <div className="flex flex-col items-center gap-0 px-2 min-w-0 border-l border-slate-700/50">
                <div className="w-7 h-7 rounded-full bg-yellow-500/15 flex items-center justify-center mb-1">
                  <Trophy
                    size={14}
                    strokeWidth={2}
                    color="#FFD700"
                    aria-hidden
                  />
                </div>
                <p className="text-sm font-bold text-white tabular-nums transition-all duration-300 text-center">
                  {formatCurrency(safeValue(banca * 10))}
                </p>
                <p className="text-[10px] text-slate-400 text-center">
                  potencial 10x
                </p>
              </div>
            </div>
            <p className="text-[10px] text-slate-600 text-center mt-3">
              Baseado na sua banca atual • Atualiza em tempo real
            </p>
          </div>
        </motion.section>

        {/* Inputs */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="px-4 space-y-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Banca Total */}
            <div className="flex flex-col gap-2">
              <span className="text-slate-300 text-sm font-semibold">
                Banca Total
              </span>
              <div className="rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-3 flex items-center gap-2 transition-colors focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/30">
                <span
                  className="text-slate-400 text-sm font-medium shrink-0 select-none pointer-events-none"
                  aria-hidden
                >
                  R$
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  autoComplete="off"
                  placeholder="1000"
                  value={bancaStr}
                  onChange={(e) => handleBancaChange(e.target.value)}
                  className="flex-1 min-w-0 bg-transparent border-0 py-1 text-slate-100 text-base outline-none placeholder:text-slate-600"
                />
              </div>
            </div>

            {/* % de Risco */}
            <div className="flex flex-col gap-2">
              <span className="text-slate-300 text-sm font-semibold">
                % de Risco
              </span>
              <div className="rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-3 flex items-center gap-2 transition-colors focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/30">
                <input
                  type="text"
                  inputMode="numeric"
                  autoComplete="off"
                  placeholder="2"
                  value={riscoStr}
                  onChange={(e) => handleRiscoChange(e.target.value)}
                  className="flex-1 min-w-0 bg-transparent border-0 py-1 text-slate-100 text-base text-right outline-none placeholder:text-slate-600"
                />
                <span
                  className="text-slate-400 text-sm font-medium shrink-0 select-none pointer-events-none"
                  aria-hidden
                >
                  %
                </span>
              </div>
            </div>

            {/* Multiplicador Alvo */}
            <div className="flex flex-col gap-2">
              <span className="text-slate-300 text-sm font-semibold">
                Multiplicador Alvo
              </span>
              <div className="rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-3 flex items-center gap-2 transition-colors focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/30">
                <input
                  type="text"
                  inputMode="decimal"
                  autoComplete="off"
                  placeholder="2.00"
                  value={multiplicadorStr}
                  onChange={(e) =>
                    handleMultiplicadorChange(e.target.value)
                  }
                  className="flex-1 min-w-0 bg-transparent border-0 py-1 text-slate-100 text-base text-right outline-none placeholder:text-slate-600"
                />
                <span
                  className="text-slate-400 text-sm font-medium shrink-0 select-none pointer-events-none"
                  aria-hidden
                >
                  x
                </span>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Risk Gauge */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="p-4 mt-4"
        >
          <div className="glass-card-subtle rounded-xl p-6 flex flex-col items-center">
            <span className="text-sm font-medium text-slate-400 mb-4 uppercase tracking-widest">
              Nível de Risco
            </span>
            <div className="w-full h-4 rounded-full relative mb-2 bg-gradient-to-r from-emerald-500 from-0% via-amber-500 via-50% to-red-500 to-100%">
              <motion.div
                initial={false}
                animate={{ left: `${markerPositionPercent}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 bg-white rounded-full shadow-lg border-4 border-primary ring-4 ring-primary/20 pointer-events-none"
              />
            </div>
            <div className="w-full flex justify-between text-[10px] font-bold text-slate-500 uppercase px-1">
              <span>Baixo</span>
              <span>Médio</span>
              <span>Alto</span>
            </div>
            <div className="mt-4 text-center">
              <span
                className={`font-bold text-lg ${getRiskColor(riskLevel)}`}
              >
                {getRiskLabel(riskLevel)}
              </span>
              <p className="text-xs text-slate-400 mt-1">
                {getRiskDescription(riskLevel)}
              </p>
            </div>
          </div>
        </motion.section>

        {/* Output Cards */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="px-4 grid grid-cols-1 gap-3 pb-8"
        >
          <motion.div
            layout
            className="flex items-center justify-between gap-3 p-5 rounded-xl bg-primary/10 border border-primary/20"
          >
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="size-10 rounded-full bg-primary flex items-center justify-center text-white shrink-0">
                <Wallet size={22} strokeWidth={2} />
              </div>
              <div className="min-w-0 flex-1 flex flex-col">
                <p className="text-white text-sm font-semibold">
                  Valor da Entrada
                </p>
                <p className="text-slate-400 text-xs mt-1 break-words">
                  {formatRiscoDisplay(riscoPct)}% da sua banca de{" "}
                  {formatCurrency(banca)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <p className="text-lg font-bold text-slate-100 tracking-tight text-right">
                {formatCurrency(entrada)}
              </p>
              <Info size={20} className="text-primary shrink-0" />
            </div>
          </motion.div>

          <motion.div
            layout
            className="flex items-center justify-between gap-3 p-5 rounded-xl bg-rose-500/10 border border-rose-500/20"
          >
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="size-10 rounded-full bg-rose-500 flex items-center justify-center text-white shrink-0">
                <TrendingDown size={22} strokeWidth={2} />
              </div>
              <div className="min-w-0 flex-1 flex flex-col">
                <p className="text-white text-sm font-semibold">
                  Stop Loss Diário
                </p>
                <p className="text-slate-400 text-xs mt-1 break-words">
                  Pare de jogar se perder este valor hoje
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <p className="text-lg font-bold text-rose-500 tracking-tight text-right">
                {formatCurrency(stopLoss)}
              </p>
              <ShieldCheck
                size={20}
                className="text-rose-500/50 shrink-0"
              />
            </div>
          </motion.div>

          <motion.div
            layout
            className="flex items-center justify-between gap-3 p-5 rounded-xl bg-emerald-500/10 border border-emerald-500/20"
          >
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="size-10 rounded-full bg-emerald-500 flex items-center justify-center text-white shrink-0">
                <TrendingUp size={22} strokeWidth={2} />
              </div>
              <div className="min-w-0 flex-1 flex flex-col">
                <p className="text-white text-sm font-semibold">
                  Meta (Stop Win)
                </p>
                <p className="text-slate-400 text-xs mt-1 break-words">
                  Parar ao atingir este lucro é disciplina
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <p className="text-lg font-bold text-emerald-500 tracking-tight text-right">
                {formatCurrency(stopWin)}
              </p>
              <ShieldCheck
                size={20}
                className="text-emerald-500/50 shrink-0"
              />
            </div>
          </motion.div>

          <motion.div
            layout
            className="flex items-center justify-between gap-3 p-5 rounded-xl bg-cyan-500/10 border border-cyan-500/20"
          >
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="size-10 rounded-full bg-cyan-500 flex items-center justify-center text-white shrink-0">
                <Coins size={22} strokeWidth={2} />
              </div>
              <div className="min-w-0 flex-1 flex flex-col">
                <p className="text-white text-sm font-semibold">
                  Lucro Líquido
                </p>
                <p className="text-slate-400 text-xs mt-1 break-words">
                  Se o multiplicador {formatMultiplicadorDisplay(multiplicador)}x
                  bater na sua entrada
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <p className="text-lg font-bold text-cyan-400 tracking-tight text-right">
                {formatCurrency(lucroLiquido)}
              </p>
              <Info size={20} className="text-cyan-500/70 shrink-0" />
            </div>
          </motion.div>
        </motion.section>

        <a
          href="https://aviator.spribe.co"
          target="_blank"
          rel="noopener noreferrer"
          className="w-fit mx-auto bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-8 rounded-xl mt-4 transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
        >
          ✈️
          Iniciar com Gestão
        </a>
      </main>

      {showNotifModal ? (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center px-4"
          onClick={() => setShowNotifModal(false)}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="notif-modal-title"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="bg-slate-900 border border-slate-700/50 rounded-2xl p-6 w-full max-w-[360px] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-5">
              <div className="flex justify-between items-start gap-2">
                <h2
                  id="notif-modal-title"
                  className="font-bold text-lg text-white min-w-0"
                >
                  🔔 Notificações
                </h2>
                <button
                  type="button"
                  className="p-1 rounded-full text-slate-400 hover:bg-slate-800 hover:text-white transition-colors shrink-0"
                  aria-label="Fechar"
                  onClick={() => setShowNotifModal(false)}
                >
                  <X size={22} strokeWidth={2} />
                </button>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Receba os melhores sinais em tempo real
              </p>
            </div>

            <div className="space-y-3">
              <div className="bg-slate-800/50 rounded-xl p-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center shrink-0 text-lg leading-none">
                    <span aria-hidden>🌸</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-white font-semibold text-sm">
                      Sinal de Vela Rosa
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Avise quando uma vela rosa for detectada
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={notifSinais}
                  onClick={() => setNotifSinais(!notifSinais)}
                  className={`relative w-11 h-6 rounded-full shrink-0 transition-colors ${
                    notifSinais ? "bg-primary" : "bg-slate-700"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform duration-200 ${
                      notifSinais ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              <div className="bg-slate-800/50 rounded-xl p-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center shrink-0 text-lg leading-none">
                    <span aria-hidden>⚡</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-white font-semibold text-sm">
                      Multiplicador Alto
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Alerta de mult. acima de 5x identificado
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={notifDicas}
                  onClick={() => setNotifDicas(!notifDicas)}
                  className={`relative w-11 h-6 rounded-full shrink-0 transition-colors ${
                    notifDicas ? "bg-primary" : "bg-slate-700"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform duration-200 ${
                      notifDicas ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="bg-blue-950/60 border border-blue-500/25 rounded-xl p-4 mt-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0 text-lg leading-none">
                  <span aria-hidden>✈️</span>
                </div>
                <div className="min-w-0">
                  <p className="text-white font-semibold text-sm">
                    Conectar ao Aviator
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Para receber sinais exatos, conecte sua conta à casa que utilizamos.
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold py-2.5 rounded-lg mt-3"
              >
                Conectar Conta
              </button>
            </div>

            <button
              type="button"
              className="w-full bg-primary text-white font-semibold py-3 rounded-xl mt-4"
              onClick={() => setShowNotifModal(false)}
            >
              Salvar Preferências
            </button>
          </motion.div>
        </div>
      ) : null}
    </>
  );
}
