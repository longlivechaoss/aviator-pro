"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  PlaneTakeoff,
  Wallet,
  TrendingDown,
  TrendingUp,
  Info,
  ShieldCheck,
} from "lucide-react";

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function formatInputCurrency(value: number): string {
  if (value === 0) return "";
  const [intPart, decPart] = value.toFixed(2).split(".");
  const intFormatted = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `${intFormatted},${decPart}`;
}

type RiskLevel = "low" | "medium" | "high";

function getRiskLevel(percent: number): RiskLevel {
  if (percent <= 2) return "low";
  if (percent <= 4) return "medium";
  return "high";
}

function getRiskLabel(level: RiskLevel): string {
  switch (level) {
    case "low":
      return "Estratégia Conservadora";
    case "medium":
      return "Estratégia Moderada";
    case "high":
      return "Estratégia Agressiva";
  }
}

function getRiskDescription(level: RiskLevel): string {
  switch (level) {
    case "low":
      return "Risco controlado para crescimento constante.";
    case "medium":
      return "Risco moderado. Acompanhe seus resultados.";
    case "high":
      return "Alto risco. Use apenas com banca preparada.";
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

function getRiskMarkerPosition(level: RiskLevel): number {
  switch (level) {
    case "low":
      return 20;
    case "medium":
      return 50;
    case "high":
      return 80;
  }
}

export default function CalculadoraPage() {
  const [banca, setBanca] = useState(1000);
  const [riscoStr, setRiscoStr] = useState("2");
  const [multiplicadorStr, setMultiplicadorStr] = useState("2.00");

  const riscoPct = useMemo(
    () => parseFloat(riscoStr.replace(",", ".")) || 0,
    [riscoStr]
  );
  const multiplicador = useMemo(
    () => parseFloat(multiplicadorStr.replace(",", ".")) || 0,
    [multiplicadorStr]
  );

  const { entrada, stopLoss, stopWin } = useMemo(() => {
    const entradaVal = banca * (riscoPct / 100);
    const stopLossVal = entradaVal * 5;
    const stopWinVal = entradaVal * 7.5;
    return {
      entrada: entradaVal,
      stopLoss: stopLossVal,
      stopWin: stopWinVal,
    };
  }, [banca, riscoPct]);

  const riskLevel = useMemo(() => getRiskLevel(riscoPct), [riscoPct]);
  const markerPosition = getRiskMarkerPosition(riskLevel);

  const displayBanca = banca > 0 ? formatInputCurrency(banca) : "";

  const handleBancaChange = (raw: string) => {
    const digits = raw.replace(/\D/g, "");
    if (digits === "") {
      setBanca(0);
      return;
    }
    setBanca(parseInt(digits, 10) / 100);
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center sticky top-0 z-50 bg-background border-b border-slate-800 p-4"
      >
        <Link
          href="/"
          className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-primary/10 transition-colors text-primary"
          aria-label="Voltar"
        >
          <ArrowLeft size={22} strokeWidth={2} />
        </Link>
        <h1 className="text-slate-100 text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-10">
          Calculadora de Gestão
        </h1>
      </motion.header>

      <main className="flex-1 overflow-y-auto pb-28">
        {/* Hero Card */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="p-4"
        >
          <div className="glass-card-subtle rounded-xl overflow-hidden shadow-lg">
            <div className="h-32 w-full bg-gradient-to-br from-primary/40 to-background flex items-center justify-center relative">
              <PlaneTakeoff
                size={64}
                className="text-white/50"
                strokeWidth={1.5}
              />
              <div className="absolute bottom-4 left-4">
                <span className="bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-widest">
                  Aviator Pro
                </span>
              </div>
            </div>
            <div className="p-4">
              <h2 className="text-slate-100 text-xl font-bold">
                Configurações de Banca
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                Ajuste os valores para calcular sua entrada e limites de
                ganhos de forma segura.
              </p>
            </div>
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
            <label className="flex flex-col gap-2">
              <span className="text-slate-300 text-sm font-semibold">
                Banca Total (R$)
              </span>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                  R$
                </span>
                <input
                  type="text"
                  inputMode="decimal"
                  placeholder="1.000,00"
                  value={displayBanca}
                  onChange={(e) => handleBancaChange(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-800 bg-slate-900 text-slate-100 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none placeholder:text-slate-600"
                />
              </div>
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-slate-300 text-sm font-semibold">
                % de Risco
              </span>
              <div className="relative">
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">
                  %
                </span>
                <input
                  type="text"
                  inputMode="decimal"
                  placeholder="2"
                  value={riscoStr}
                  onChange={(e) =>
                    setRiscoStr(e.target.value.replace(/[^\d,.]/g, ""))
                  }
                  className="w-full px-4 py-4 rounded-xl border border-slate-800 bg-slate-900 text-slate-100 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none placeholder:text-slate-600 text-right pr-8"
                />
              </div>
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-slate-300 text-sm font-semibold">
                Multiplicador Alvo
              </span>
              <div className="relative">
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">
                  x
                </span>
                <input
                  type="text"
                  inputMode="decimal"
                  placeholder="2.00"
                  value={multiplicadorStr}
                  onChange={(e) =>
                    setMultiplicadorStr(
                      e.target.value.replace(/[^\d,.]/g, "")
                    )
                  }
                  className="w-full px-4 py-4 rounded-xl border border-slate-800 bg-slate-900 text-slate-100 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none placeholder:text-slate-600 text-right pr-8"
                />
              </div>
            </label>
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
                animate={{ left: `${markerPosition}%` }}
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
            className="flex items-center justify-between p-5 rounded-xl bg-primary/10 border border-primary/20"
          >
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-primary flex items-center justify-center text-white shrink-0">
                <Wallet size={22} strokeWidth={2} />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">
                  Valor da Entrada
                </p>
                <p className="text-lg font-bold text-slate-100 tracking-tight">
                  {formatCurrency(entrada)}
                </p>
              </div>
            </div>
            <Info size={20} className="text-primary shrink-0" />
          </motion.div>

          <motion.div
            layout
            className="flex items-center justify-between p-5 rounded-xl bg-rose-500/10 border border-rose-500/20"
          >
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-rose-500 flex items-center justify-center text-white shrink-0">
                <TrendingDown size={22} strokeWidth={2} />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">
                  Stop Loss Diário
                </p>
                <p className="text-lg font-bold text-rose-500 tracking-tight">
                  {formatCurrency(stopLoss)}
                </p>
              </div>
            </div>
            <ShieldCheck size={20} className="text-rose-500/50 shrink-0" />
          </motion.div>

          <motion.div
            layout
            className="flex items-center justify-between p-5 rounded-xl bg-emerald-500/10 border border-emerald-500/20"
          >
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-emerald-500 flex items-center justify-center text-white shrink-0">
                <TrendingUp size={22} strokeWidth={2} />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">
                  Meta (Stop Win)
                </p>
                <p className="text-lg font-bold text-emerald-500 tracking-tight">
                  {formatCurrency(stopWin)}
                </p>
              </div>
            </div>
            <ShieldCheck size={20} className="text-emerald-500/50 shrink-0" />
          </motion.div>
        </motion.section>
      </main>
    </>
  );
}
