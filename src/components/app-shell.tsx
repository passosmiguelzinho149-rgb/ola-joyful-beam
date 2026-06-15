import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { Home, MessageCircle, DollarSign, User, ArrowLeft, HelpCircle, Bell, LogOut } from "lucide-react";
import type { ReactNode } from "react";
import { transactions, useSession } from "@/lib/bank-store";

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-200 flex items-start justify-center md:p-6">
      <div className="w-full md:max-w-[420px] min-h-screen md:min-h-[820px] bg-white md:rounded-[36px] md:shadow-2xl overflow-hidden flex flex-col relative">
        {children}
      </div>
    </div>
  );
}

export function BlueHeader({ title, showBack = false }: { title?: string; showBack?: boolean }) {
  const navigate = useNavigate();
  const { logout } = useSession();
  return (
    <div className="bg-gradient-to-r from-[#1a2a8a] to-[#cc092f] text-white px-4 pt-4 pb-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        {showBack && (
          <button onClick={() => navigate({ to: "/app" })} className="p-1">
            <ArrowLeft size={22} />
          </button>
        )}
        {title ? (
          <span className="text-lg font-semibold">{title}</span>
        ) : (
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-[#cc092f] text-sm font-extrabold">
              B
            </div>
            <div className="leading-tight">
              <div className="text-sm font-bold tracking-wide">Bradesco</div>
              <div className="text-[10px] opacity-80">empresas e negócios</div>
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center gap-3">
        <HelpCircle size={20} />
        <button onClick={() => navigate({ to: "/app/notificacoes" })} className="relative">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 min-w-[14px] h-[14px] px-1 bg-red-500 rounded-full text-[9px] font-bold flex items-center justify-center">
            {transactions.length}
          </span>
        </button>
        <button
          onClick={() => { logout(); navigate({ to: "/" }); }}
          aria-label="Sair"
          title="Sair"
        >
          <LogOut size={20} />
        </button>
      </div>
    </div>
  );
}

export function BottomNav() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const items = [
    { to: "/app", label: "Início", icon: Home },
    { to: "/app/chat", label: "Chat", icon: MessageCircle },
    { to: "/app/servicos", label: "Serviços", icon: DollarSign },
    { to: "/app/perfil", label: "Perfil", icon: User },
  ] as const;
  return (
    <div className="sticky bottom-0 bg-white border-t border-slate-200 grid grid-cols-4 py-2">
      {items.map((i) => {
        const active = path === i.to;
        const Icon = i.icon;
        return (
          <Link
            key={i.to}
            to={i.to}
            className={`flex flex-col items-center text-[11px] ${active ? "text-[#cc092f] font-semibold" : "text-slate-600"}`}
          >
            <Icon size={20} />
            <span className="mt-0.5">{i.label}</span>
          </Link>
        );
      })}
    </div>
  );
}

export function DemoBanner() {
  return (
    <div className="bg-amber-100 text-amber-900 text-[10px] text-center px-2 py-1">
      Aplicativo de demonstração — não é uma instituição financeira real
    </div>
  );
}
