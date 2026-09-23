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
  MoreVertical,
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
    <div className="min-h-screen bg-gradient-to-b from-rose-100 via-rose-50 to-white flex items-start justify-center md:p-6">
      <div
        onCopy={(event) => event.preventDefault()}
        onCut={(event) => event.preventDefault()}
        onContextMenu={(event) => event.preventDefault()}
        className="w-full md:max-w-[420px] min-h-screen md:min-h-[820px] bg-white md:rounded-[36px] md:shadow-2xl overflow-hidden flex flex-col relative select-none"
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
    <div className="bg-gradient-to-r from-[#e11d48] to-[#f43f5e] text-white px-4 pt-4 pb-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        {showBack && (
          <button onClick={() => navigate({ to: "/app" })} className="p-1" aria-label="Voltar">
            <ArrowLeft size={22} />
          </button>
        )}
        {title ? (
          <span className="text-lg font-semibold">{title}</span>
        ) : (
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-[#e11d48] text-sm font-extrabold">
              N
            </div>
            <div className="leading-tight">
              <div className="text-sm font-bold tracking-wide">NOVABANK</div>
              <div className="text-[10px] opacity-90">conta digital</div>
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => setHelpOpen(true)}
          aria-label="Ajuda"
          title="Ajuda"
          className="p-1 -m-1"
        >
          <HelpCircle size={20} />
        </button>
        <Link to="/app/notificacoes" className="relative" aria-label="Notificações">
          <Bell size={20} />
          {naoLidas.length > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[14px] h-[14px] px-1 bg-white text-[#e11d48] rounded-full text-[9px] font-bold flex items-center justify-center">
              {naoLidas.length}
            </span>
          )}
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button aria-label="Mais opções" title="Mais opções" className="p-1 -m-1">
              <MoreVertical size={20} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Opções</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate({ to: "/app/perfil" })}>
              <User className="mr-2 h-4 w-4" /> Meu perfil
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate({ to: "/app/servicos" })}>
              <LayoutGrid className="mr-2 h-4 w-4" /> Serviços
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setHelpOpen(true)}>
              <HelpCircle className="mr-2 h-4 w-4" /> Central de ajuda
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
              className="text-[#e11d48] focus:text-[#e11d48]"
            >
              <LogOut className="mr-2 h-4 w-4" /> Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Dialog open={helpOpen} onOpenChange={setHelpOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Central de ajuda NOVABANK</DialogTitle>
            <DialogDescription>
              Canal fictício de atendimento — nada aqui é real.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 text-sm text-slate-700">
            <a
              href="tel:40040000"
              className="flex items-center gap-3 rounded-2xl border border-rose-100 p-3 hover:bg-rose-50"
            >
              <Phone size={18} className="text-[#e11d48]" />
              <div>
                <div className="font-semibold">Capitais e regiões metropolitanas</div>
                <div className="text-slate-600">4004 0000 (demonstração)</div>
              </div>
            </a>
            <a
              href="tel:08000000000"
              className="flex items-center gap-3 rounded-2xl border border-rose-100 p-3 hover:bg-rose-50"
            >
              <Phone size={18} className="text-[#e11d48]" />
              <div>
                <div className="font-semibold">Demais localidades</div>
                <div className="text-slate-600">0800 000 0000 (demonstração)</div>
              </div>
            </a>
            <a
              href="mailto:ajuda@novabank.demo"
              className="flex items-center gap-3 rounded-2xl border border-rose-100 p-3 hover:bg-rose-50"
            >
              <Mail size={18} className="text-[#e11d48]" />
              <div>
                <div className="font-semibold">E-mail</div>
                <div className="text-slate-600">ajuda@novabank.demo</div>
              </div>
            </a>
            <button
              onClick={() => {
                setHelpOpen(false);
                navigate({ to: "/app/chat" });
              }}
              className="w-full rounded-2xl bg-gradient-to-r from-[#e11d48] to-[#f43f5e] py-3 font-semibold text-white"
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
    <div className="sticky bottom-0 bg-white/95 backdrop-blur border-t border-rose-100 grid grid-cols-5 py-2">
      {items.map((i) => {
        const active = i.to === "/app" ? path === "/app" || path === "/app/" : path.startsWith(i.to);
        const Icon = i.icon;
        return (
          <Link
            key={i.to}
            to={i.to}
            className={`flex flex-col items-center text-[10px] transition-colors ${
              active ? "text-[#e11d48] font-semibold" : "text-slate-500"
            }`}
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
  return null;
}
