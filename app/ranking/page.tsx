"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, Search, Star, Award } from "lucide-react";

type TabRanking = "semanal" | "mensal" | "geral";

const TABS: { id: TabRanking; label: string }[] = [
  { id: "semanal", label: "Semanal" },
  { id: "mensal", label: "Mensal" },
  { id: "geral", label: "Geral" },
];

const PODIUM = [
  {
    pos: 2,
    nome: "Ricardo M.",
    valor: "R$ 12.200",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDmTBeY8sm7zHy_hLjq4H_ZfQZqvarY6YA0Sn4-xxaKrhR1zxgPyp9xsixcFaobfOv_G6Jg47DvmfTQqWwGpjHXUyd16CCskurVk_GE36_wE67kNt2VWRy1M7IJ3qD_cNXAZGGI2th0rOH3-gGTyZA6NDClKfCvb4xoR9waBj-B9x8rz7K6klZeBY2gTKB2Xz60nN_qMXnzVPRah8tGhd-7qnJ8kg0UP1URDccjI26xNkDvekFPr99Z7TEmII71FpLUWuOs7seyKBo7",
    medal: "silver",
    size: "size-16",
    translate: "",
  },
  {
    pos: 1,
    nome: "Ana Luiza",
    valor: "R$ 15.400",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCi3tNJ4FunuuU1Eb38Y-Us40cfV4JgE8LHskZI_sVK2SFyE5AY7xArUQX-ZjBg6PkNzRg17oQZLQEgsmbfIxIyyOMAqjOnJro_k8YqiR27k94CcNnlL3jDjGLIvpA1tpJh1bpXjdD9c2KLiIjMjAWDrtzjBujZU1fXwlWPnzX30lEFE-owVfyfPfCSPKezCDmp3waZvbfgosiaPdaHuY5HkUKHU3TzjvzNk40PNAEtujKc6jtAGkVmeAyU7BOr-YfqOHIJWU-gdg-0",
    medal: "gold",
    size: "size-24",
    translate: "-translate-y-4",
  },
  {
    pos: 3,
    nome: "Gabriel S.",
    valor: "R$ 9.800",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDS2T4d-rv1Ljsawt1lyWZygXwC9ugX3lDwTVh-T6LdeA9XmRGNMt7uE7eNo2C2skW8qmWSBuP6hltEY4Xq-dVb7nBat1bpgU-KhcsvXQa2JZy6xCGl5pBzQsmhQw-HPlmlmXjTeEqGpjiS4-MKYpHq3mUgvY1iNF8omyr69JHX7s5AWm2YjXPV1trASrNAEnOuqexFDErtLBrfCd-uk3wSS0pI-8IyUveJgexJ-VbylWgOdobMc1rwiIXVf6s9sOZ5tgQ3J1w-rrSP",
    medal: "bronze",
    size: "size-16",
    translate: "",
  },
];

const LISTA_RANKING = [
  { pos: 4, nome: "Felipe Costa", valor: "R$ 7.250", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAnvjmAiNDd5YfkiqbGUHUC122wpDuvz3KKj-2FDaWE_hdXkt216ocD6BqMvssMQYjeoNXXiLpnJgIFiz0mFVASfPxw6XtA5I-f_nyR7eFLw3feUxMRfux8Vi41tPRV5M9L_JSiP_0bcTKtWFkamFP8DbXfyVwv_5FAtblkCTB6EeTzI6CxLAtkLWYxHzxIGqElhQnjbOpYscMRWMGgijGCD7IIGJsQ1oC4Bns5NXuftk4hxkgYc9oE9KaEA1X2DXh-4YihDIi7-ROu" },
  { pos: 5, nome: "Beatriz Lima", valor: "R$ 6.800", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAVHgC3PGlkQCflxPYyREvMEA8QwuQzED2czFcQjJMZhk0H_D5P-Ktd_NsvwWDiISZK6z7Z-DNrkhOidAW3AiPyqyXbf4SZ1U20z1uNhcM51mKXEdsRGrfUhGesO6DNXEE0pr1jUldT6Sv5GlJ27ShuqK9ODRTdgtpZfcGTEiqALL_NzJdJY1AvaSGutUFsGlQ_Oofpc9mRVpRXDjeXzf2BtfTcLbVJILpNaoCn3RzANDa3QsyhUA19PcEqM0TOmsVZHjrinOf-_w9v" },
  { pos: 6, nome: "Marcos O.", valor: "R$ 5.920", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDdd7mwOz_8TtkBvyzRQkCcfQ4HBs3sL_ODHIa5u5AWeXVyPnTKhuSyfxw5BNYEMv464F96TmKry2Xwq-ZhyGMV_bB-idBv-czhvn6LiWKslpHmHIOrmmZBkEXiEQFqv1eIv57wGcpXYq76e7KIcRPXsIUJ3MGYpafKmIbsb3DMcSA42NxfmpSG6EJV9EI7tvM4jJiECQ6ywIoH4i7-av3SYXWltd-8OQUKWqXAJsFDfFQx2vHtjDWU8yPyJsOaPkg626ImDadkLk4P" },
  { pos: 7, nome: "Julia Paiva", valor: "R$ 5.100", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBLc_0RtA4kLVT_ZPI57OPf1yIDS_BbKnNxNJH8LTr_xR_oAm3A5dzz62op_LzC0-IPZwkk07gwoshc9aHSvCr9D_WRsu9I0llGfZYt4Ki9YMuUPsGPKyZvyMrvRQxQOEFgsOm_UnhYP5MN69oE1F_FUK7vEkZnb4ip1Sp-mkUO7c5PtSYiuiHa06GJcVpdYcwjnisZJ5kyzxgE9dVWTlutlKJ9_i0bGeaSQn8OKh2QGtdUVvqbazCE9mGik6PkhW2L__jcGMWfWkwG" },
];

const MEDAL_STYLES = {
  gold: {
    border: "border-accent-gold",
    badge: "bg-accent-gold text-background",
    icon: Star,
    iconClass: "text-accent-gold",
    shadow: "shadow-[0_0_20px_rgba(255,215,0,0.3)]",
  },
  silver: {
    border: "border-accent-silver",
    badge: "bg-accent-silver text-background",
    icon: Award,
    iconClass: "text-accent-silver",
    shadow: "",
  },
  bronze: {
    border: "border-accent-bronze",
    badge: "bg-accent-bronze text-background",
    icon: Award,
    iconClass: "text-accent-bronze",
    shadow: "",
  },
} as const;

export default function RankingPage() {
  const [tabAtivo, setTabAtivo] = useState<TabRanking>("semanal");

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-slate-800 px-4 py-4"
      >
        <div className="flex items-center justify-between max-w-md mx-auto">
          <Link
            href="/"
            className="flex items-center justify-center size-10 rounded-full hover:bg-primary/10 transition-colors text-slate-400 hover:text-white"
            aria-label="Voltar"
          >
            <ArrowLeft size={22} strokeWidth={2} />
          </Link>
          <h1 className="text-lg font-bold tracking-tight text-white">
            Ranking da Comunidade
          </h1>
          <button
            type="button"
            className="flex items-center justify-center size-10 rounded-full hover:bg-primary/10 transition-colors text-slate-400 hover:text-white"
            aria-label="Buscar"
          >
            <Search size={22} strokeWidth={2} />
          </button>
        </div>
      </motion.header>

      <main className="flex-1 w-full max-w-md mx-auto px-4 pb-28">
        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.05 }}
          className="flex border-b border-slate-800 mb-6"
        >
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setTabAtivo(tab.id)}
              className={`flex-1 py-3 text-sm font-bold border-b-2 transition-colors ${
                tabAtivo === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-slate-500 hover:text-slate-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Pódio Top 3 */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-end justify-center gap-4 mb-8 pt-8"
        >
          {PODIUM.map((p, i) => {
            const style = MEDAL_STYLES[p.medal as keyof typeof MEDAL_STYLES];
            const Icon = style.icon;
            return (
              <div
                key={p.pos}
                className={`flex flex-col items-center gap-2 ${p.translate}`}
              >
                <div className="relative">
                  <div
                    className={`absolute -top-6 left-1/2 -translate-x-1/2 ${style.iconClass}`}
                  >
                    <Icon
                      size={p.medal === "gold" ? 36 : 28}
                      className={p.medal === "gold" ? "fill-current" : ""}
                      strokeWidth={2}
                    />
                  </div>
                  <div
                    className={`${p.size} rounded-full border-4 ${style.border} overflow-hidden p-0.5 bg-slate-800 ${style.shadow}`}
                  >
                    <Image
                      src={p.avatar}
                      alt=""
                      width={p.medal === "gold" ? 96 : 64}
                      height={p.medal === "gold" ? 96 : 64}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <div
                    className={`absolute -bottom-2 left-1/2 -translate-x-1/2 ${style.badge} text-slate-900 text-[10px] font-black px-2 py-0.5 rounded-full ${p.medal === "gold" ? "text-xs px-3 py-1 shadow-lg" : ""}`}
                  >
                    {p.pos}º
                  </div>
                </div>
                <div className="text-center">
                  <p
                    className={`font-bold truncate w-20 ${p.medal === "gold" ? "text-sm" : "text-xs"} text-white`}
                  >
                    {p.nome}
                  </p>
                  <p className="text-primary text-[11px] font-black">
                    {p.valor}
                  </p>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Lista 4º ao 7º (até 10º - usando 4 itens como no stitch, podemos estender) */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-card-dark rounded-xl overflow-hidden border border-slate-800 mb-4"
        >
          <div className="grid grid-cols-12 px-4 py-3 bg-slate-800/50 text-[10px] uppercase font-bold tracking-widest text-slate-500">
            <div className="col-span-2">Pos</div>
            <div className="col-span-6">Membro</div>
            <div className="col-span-4 text-right">
              {tabAtivo === "semanal"
                ? "Lucro Semanal"
                : tabAtivo === "mensal"
                  ? "Lucro Mensal"
                  : "Lucro Total"}
            </div>
          </div>
          {LISTA_RANKING.map((item, index) => (
            <motion.div
              key={item.pos}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.18 + index * 0.03 }}
              className="grid grid-cols-12 items-center px-4 py-4 border-b border-slate-800/50 hover:bg-primary/5 transition-colors"
            >
              <div className="col-span-2 text-sm font-bold text-slate-400">
                #{item.pos}
              </div>
              <div className="col-span-6 flex items-center gap-3">
                <div className="size-10 rounded-full bg-slate-800 overflow-hidden shrink-0">
                  <Image
                    src={item.avatar}
                    alt=""
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{item.nome}</p>
                </div>
              </div>
              <div className="col-span-4 text-right">
                <p className="text-sm font-black text-slate-100">{item.valor}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Card Sua Posição */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-primary/10 border-t-2 border-primary/40 rounded-b-xl overflow-hidden"
        >
          <div className="grid grid-cols-12 items-center px-4 py-4">
            <div className="col-span-2 text-sm font-black text-primary">
              #142
            </div>
            <div className="col-span-6 flex items-center gap-3">
              <div className="size-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xs shrink-0">
                VOCÊ
              </div>
              <div>
                <p className="text-sm font-bold text-white">Seu Perfil</p>
                <p className="text-[10px] text-slate-400">
                  Suba 12 posições p/ prêmio
                </p>
              </div>
            </div>
            <div className="col-span-4 text-right">
              <p className="text-sm font-black text-primary">R$ 1.240</p>
            </div>
          </div>
        </motion.div>
      </main>
    </>
  );
}
