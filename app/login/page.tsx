"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { PlaneTakeoff, Mail, Lock, LogIn, ArrowRight } from "lucide-react";

const AUTH_KEY = "isLoggedIn";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      localStorage.setItem(AUTH_KEY, "true");
      router.push("/");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background bg-mesh">
      <div className="relative w-full max-w-[440px]">
        {/* Glow decorativo */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/20 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="glass-card rounded-xl p-8 shadow-2xl relative z-10"
        >
          {/* Logo / Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-4 ring-1 ring-primary/50 shadow-[0_0_20px_rgba(14,165,233,0.3)]">
              <PlaneTakeoff
                size={44}
                className="text-primary"
                strokeWidth={2}
              />
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-100 mb-1">
              Aviator Pro Members
            </h2>
            <p className="text-slate-400 text-sm font-medium">
              Área de Membros exclusiva
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-slate-300 text-sm font-medium px-1"
              >
                E-mail
              </label>
              <div className="relative">
                <Mail
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  strokeWidth={2}
                />
                <input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-900/50 border border-slate-700 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg py-3.5 pl-12 pr-4 text-slate-100 placeholder:text-slate-600 transition-all outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center px-1">
                <label
                  htmlFor="senha"
                  className="text-slate-300 text-sm font-medium"
                >
                  Senha
                </label>
                <Link
                  href="#"
                  className="text-primary text-xs font-semibold hover:underline decoration-primary/50"
                >
                  Esqueci minha senha
                </Link>
              </div>
              <div className="relative">
                <Lock
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  strokeWidth={2}
                />
                <input
                  id="senha"
                  type="password"
                  placeholder="Sua senha secreta"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="w-full bg-slate-900/50 border border-slate-700 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg py-3.5 pl-12 pr-4 text-slate-100 placeholder:text-slate-600 transition-all outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-lg shadow-[0_4px_20px_rgba(14,165,233,0.4)] transition-all active:scale-[0.98] flex items-center justify-center gap-2 uppercase tracking-wider text-sm"
            >
              Entrar
              <LogIn size={18} strokeWidth={2} />
            </button>
          </form>

          <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col items-center gap-4">
            <p className="text-slate-500 text-xs">Não possui acesso?</p>
            <Link
              href="/onboarding"
              className="text-slate-300 text-sm font-semibold hover:text-primary transition-colors flex items-center gap-1"
            >
              Saiba Mais
              <ArrowRight size={14} strokeWidth={2} />
            </Link>
          </div>
        </motion.div>

        <div className="mt-8 flex items-center justify-center gap-2 opacity-50 grayscale hover:grayscale-0 transition-all">
          <Lock size={14} className="text-slate-400" strokeWidth={2} />
          <span className="text-slate-400 text-[10px] uppercase tracking-widest font-bold">
            Ambiente Seguro & Criptografado
          </span>
        </div>
      </div>
    </div>
  );
}
