"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import BottomNav from "./BottomNav";

const AUTH_KEY = "isLoggedIn";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const isLoginPage = pathname === "/login";
    const isLoggedIn =
      typeof window !== "undefined" && localStorage.getItem(AUTH_KEY) === "true";

    const isOnboardingPage = pathname === "/onboarding";
    if (!isLoginPage && !isOnboardingPage && !isLoggedIn) {
      router.replace("/login");
    }
  }, [mounted, pathname, router]);

  if (!mounted) {
    return (
      <div className="min-h-screen w-full max-w-[430px] mx-auto bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (pathname === "/login" || pathname === "/onboarding") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen w-full max-w-[430px] mx-auto bg-background border-x border-slate-800/50 flex flex-col">
      <main className="flex-1 overflow-x-hidden pb-20">{children}</main>
      <BottomNav />
    </div>
  );
}
