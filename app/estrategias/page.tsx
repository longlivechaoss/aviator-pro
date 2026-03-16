"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Search,
  Info,
  Play,
  ArrowRight,
} from "lucide-react";

type Filtro = "todas" | "conservadoras" | "agressivas";

interface Estrategia {
  id: string;
  nome: string;
  dificuldade: "Iniciante" | "Intermediário" | "Avançado";
  dificuldadeClass: string;
  descricao: string;
  condicaoEntrada: string;
  multiplicadorAlvo: string;
  bancaRecomendada: string;
  thumbUrl: string;
  filtro: Filtro;
}

const THUMB_AVIATOR =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDtvj3CahqGDDG3Sdd58TY9wG0TMjxQmmzWDLzv_453AmvOP0W8kD6ZDaA2MVQpj1NHmHyu9Xxixabm2UjSjB5H5hdcfcpfRvNXmnTwgVoNJIUbl5VuooZ22EHdJ_nUhJGTi82PkeX65hoh0GfpIBgfu0QsMHBZpwR_de9V8DuL7gvJoW7aFnaeQaNCa07GrqYh5Y5Ev-Q4J9EQClrcqrJDBPUIFvRozbeWU_YBKtD3k_fZczNXdS7QzUAHY7Kd1Cy70ALXnDKmlUAT";

const ESTRATEGIAS: Estrategia[] = [
  {
    id: "1",
    nome: "Alvo 2.0x Seguro",
    dificuldade: "Iniciante",
    dificuldadeClass: "bg-green-900/30 text-green-400",
    descricao:
      "Focada em consistência a longo prazo com baixo risco de quebra de banca. Ideal para quem está começando no Aviator.",
    condicaoEntrada: "Após 2 velas baixas",
    multiplicadorAlvo: "2.00x",
    bancaRecomendada: "1-2% / entrada",
    thumbUrl: THUMB_AVIATOR,
    filtro: "conservadoras",
  },
  {
    id: "2",
    nome: "Recuperação Sequencial",
    dificuldade: "Intermediário",
    dificuldadeClass: "bg-amber-900/30 text-amber-400",
    descricao:
      "Utiliza análise de sequências para identificar momentos de recuperação após velas vermelhas. Exige leitura de padrões.",
    condicaoEntrada: "Após 3 vermelhas consecutivas",
    multiplicadorAlvo: "2.50x",
    bancaRecomendada: "1% / entrada",
    thumbUrl: THUMB_AVIATOR,
    filtro: "conservadoras",
  },
  {
    id: "3",
    nome: "Padrão Escada 1.5x",
    dificuldade: "Iniciante",
    dificuldadeClass: "bg-green-900/30 text-green-400",
    descricao:
      "Entrada em multiplicador baixo com alta probabilidade. Escada de saída progressiva para proteger o lucro.",
    condicaoEntrada: "Primeira vela azul do ciclo",
    multiplicadorAlvo: "1.50x",
    bancaRecomendada: "2% / entrada",
    thumbUrl: THUMB_AVIATOR,
    filtro: "conservadoras",
  },
  {
    id: "4",
    nome: "Sequencial Triplo",
    dificuldade: "Avançado",
    dificuldadeClass: "bg-red-900/30 text-red-400",
    descricao:
      "Análise de padrões de cores repetidas para identificar o momento exato de entrada. Maior risco e maior potencial.",
    condicaoEntrada: "3 azuis consecutivas",
    multiplicadorAlvo: "5.00x",
    bancaRecomendada: "0.5% / entrada",
    thumbUrl: THUMB_AVIATOR,
    filtro: "agressivas",
  },
];

const FILTROS: { id: Filtro; label: string }[] = [
  { id: "todas", label: "Todas" },
  { id: "conservadoras", label: "Conservadoras" },
  { id: "agressivas", label: "Agressivas" },
];

export default function EstrategiasPage() {
  const [filtroAtivo, setFiltroAtivo] = useState<Filtro>("todas");

  const estrategiasFiltradas =
    filtroAtivo === "todas"
      ? ESTRATEGIAS
      : ESTRATEGIAS.filter((e) => e.filtro === filtroAtivo);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-slate-800"
      >
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center justify-center size-10 rounded-full hover:bg-slate-800/50 transition-colors text-primary"
              aria-label="Voltar"
            >
              <ArrowLeft size={22} strokeWidth={2} />
            </Link>
            <h1 className="text-lg font-bold tracking-tight text-white">
              Estratégias
            </h1>
          </div>
          <button
            type="button"
            className="p-2 rounded-full hover:bg-slate-800/50 transition-colors text-slate-400 hover:text-white"
            aria-label="Buscar"
          >
            <Search size={20} strokeWidth={2} />
          </button>
        </div>
        <div className="flex px-4 gap-6 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {FILTROS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFiltroAtivo(f.id)}
              className={`flex flex-col items-center pt-2 pb-3 border-b-2 shrink-0 transition-colors ${
                filtroAtivo === f.id
                  ? "border-primary text-primary"
                  : "border-transparent text-slate-500 hover:text-slate-300"
              }`}
            >
              <span className="text-sm font-bold">{f.label}</span>
            </button>
          ))}
        </div>
      </motion.header>

      <main className="flex-1 p-4 space-y-6 max-w-2xl mx-auto w-full pb-28">
        {estrategiasFiltradas.map((estrategia, index) => (
          <motion.article
            key={estrategia.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06 }}
            className="bg-slate-900/50 dark:bg-slate-900/50 rounded-xl overflow-hidden shadow-sm border-l-4 border-primary"
          >
            <div className="p-4 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <span
                    className={`inline-block px-2 py-0.5 ${estrategia.dificuldadeClass} text-[10px] font-bold uppercase tracking-wider rounded`}
                  >
                    {estrategia.dificuldade}
                  </span>
                  <h2 className="text-lg font-bold mt-1 text-white">
                    {estrategia.nome}
                  </h2>
                </div>
                <button
                  type="button"
                  className="p-2 rounded-full hover:bg-slate-800/50 text-slate-400 hover:text-white"
                  aria-label="Info"
                >
                  <Info size={18} strokeWidth={2} />
                </button>
              </div>

              <p className="text-sm text-slate-400 leading-relaxed">
                {estrategia.descricao}
              </p>

              {/* Thumbnail escuro simulando vídeo do Aviator */}
              <div className="relative group cursor-pointer aspect-video rounded-lg overflow-hidden bg-slate-900">
                <Image
                  src={estrategia.thumbUrl}
                  alt=""
                  fill
                  className="object-cover opacity-50 group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 430px) 100vw, 400px"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center text-white shadow-lg shadow-primary/40 group-hover:scale-110 transition-transform">
                    <Play size={28} fill="currentColor" className="ml-0.5" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2 border-t border-slate-800 pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Condição de Entrada</span>
                  <span className="font-medium text-slate-200">
                    {estrategia.condicaoEntrada}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Multiplicador Alvo</span>
                  <span className="font-medium text-primary">
                    {estrategia.multiplicadorAlvo}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Banca Recomendada</span>
                  <span className="font-medium text-slate-200">
                    {estrategia.bancaRecomendada}
                  </span>
                </div>
              </div>

              <button
                type="button"
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                Ver Estratégia Completa
                <ArrowRight size={18} strokeWidth={2} />
              </button>
            </div>
          </motion.article>
        ))}
      </main>
    </>
  );
}
