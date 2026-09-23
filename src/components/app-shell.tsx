import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import {
  Home,
  MessageCircle,
  ShoppingBag,
  User,
  LayoutGrid,
  ArrowLeft,
  HelpCircle,
  Bell,
  LogOut,
  Menu,
  Phone,
  Mail,
  ShieldCheck,
} from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";
import { useNotificacoes, useSession } from "@/lib/bank-store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f5f5f5] flex items-start justify-center md:p-6">
      <div
        className="w-full md:max-w-[420px] min-h-screen md:min-h-[820px] bg-white md:rounded-[28px] md:shadow-2xl overflow-hidden flex flex-col relative"
      >
        {children}
      </div>
    </div>
  );
}

export function BlueHeader({ title, showBack = false }: { title?: string; showBack?: boolean }) {
  const navigate = useNavigate();
  const { logout } = useSession();
  const { naoLidas } = useNotificacoes();
  const [helpOpen, setHelpOpen] = useState(false);

  return (
    <div className="bg-[#cc092f] text-white px-4 pt-3 pb-4 flex items-center justify-between">
      <div className="flex items-center gap-3 min-w-0">
        {showBack ? (
          <button onClick={() => navigate({ to: "/app" })} className="p-1" aria-label="Voltar">
            <ArrowLeft size={23} />
          </button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button aria-label="Menu" className="p-1">
                <Menu size={23} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel>Menu da conta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate({ to: "/app/perfil" })}>
                <User className="mr-2 h-4 w-4" /> Perfil
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate({ to: "/app/servicos" })}>
                <LayoutGrid className="mr-2 h-4 w-4" /> Serviços
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate({ to: "/app/seguranca" })}>
                <ShieldCheck className="mr-2 h-4 w-4" /> Segurança
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  logout();
                  navigate({ to: "/" });
                }}
              >
                <LogOut className="mr-2 h-4 w-4" /> Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        {title ? (
          <span className="text-lg font-semibold">{title}</span>
        ) : (
          <div className="leading-none">
            <div className="text-[21px] font-extrabold tracking-tight">NOVA</div>
            <div className="text-[9px] uppercase tracking-[0.22em] opacity-80">banco digital</div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        <button onClick={() => setHelpOpen(true)} aria-label="Ajuda" className="p-1">
          <HelpCircle size={20} />
        </button>
        <Link to="/app/notificacoes" className="relative" aria-label="Notificações">
          <Bell size={21} />
          {naoLidas.length > 0 && (
            <span className="absolute -top-1 -right-2 min-w-[15px] h-[15px] px-1 bg-white text-[#cc092f] rounded-full text-[9px] font-bold flex items-center justify-center">
              {naoLidas.length}
            </span>
          )}
        </Link>
      </div>

      <Dialog open={helpOpen} onOpenChange={setHelpOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Central de ajuda NOVA</DialogTitle>
            <DialogDescription>Atendimento demonstrativo — este aplicativo não movimenta dinheiro real.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3 text-sm text-slate-700">
            <a href="tel:40040000" className="flex items-center gap-3 rounded-2xl border border-rose-100 p-3">
              <Phone size={18} className="text-[#cc092f]" />
              <div><div className="font-semibold">Capitais e regiões metropolitanas</div><div>4004 0000 (demo)</div></div>
            </a>
            <a href="tel:08000000000" className="flex items-center gap-3 rounded-2xl border border-rose-100 p-3">
              <Phone size={18} className="text-[#cc092f]" />
              <div><div className="font-semibold">Demais localidades</div><div>0800 000 0000 (demo)</div></div>
            </a>
            <a href="mailto:ajuda@nova.demo" className="flex items-center gap-3 rounded-2xl border border-rose-100 p-3">
              <Mail size={18} className="text-[#cc092f]" />
              <div><div className="font-semibold">E-mail</div><div>ajuda@nova.demo</div></div>
            </a>
            <button
              onClick={() => { setHelpOpen(false); navigate({ to: "/app/chat" }); }}
              className="w-full rounded-2xl bg-[#cc092f] py-3 font-semibold text-white"
            >
              Falar com a NOVA no chat
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export function BottomNav() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const items = [
    { to: "/app", label: "Início", icon: Home },
    { to: "/app/chat", label: "Chat", icon: MessageCircle },
    { to: "/app/shop", label: "Shop", icon: ShoppingBag },
    { to: "/app/perfil", label: "Perfil", icon: User },
    { to: "/app/servicos", label: "Serviços", icon: LayoutGrid },
  ] as const;

  return (
    <div className="sticky bottom-0 z-20 bg-white border-t border-slate-200 grid grid-cols-5 py-2">
      {items.map((i) => {
        const active = i.to === "/app" ? path === "/app" || path === "/app/" : path.startsWith(i.to);
        const Icon = i.icon;
        return (
          <Link
            key={i.to}
            to={i.to}
            className={`flex flex-col items-center text-[10px] transition-colors ${active ? "text-[#cc092f] font-semibold" : "text-slate-500"}`}
          >
            <Icon size={21} />
            <span className="mt-0.5">{i.label}</span>
          </Link>
        );
      })}
    </div>
  );
}

export function DemoBanner() {
  return (
    <div className="bg-[#fff1f2] border-b border-rose-100 px-3 py-1.5 text-center text-[10px] text-[#9f1239]">
      PROTÓTIPO DEMONSTRATIVO · sem operações bancárias reais
    </div>
  );
}
