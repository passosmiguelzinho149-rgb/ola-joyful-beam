import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import {
  Home,
  MessageCircle,
  DollarSign,
  User,
  ArrowLeft,
  HelpCircle,
  Bell,
  LogOut,
  MoreVertical,
  Phone,
  Mail,
  Settings,
  Shield,
} from "lucide-react";
import type { ReactNode } from "react";
import { transactions, useSession } from "@/lib/bank-store";
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
import { useState } from "react";

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-200 flex items-start justify-center md:p-6">
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
  const [helpOpen, setHelpOpen] = useState(false);
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
        <button
          onClick={() => setHelpOpen(true)}
          aria-label="Ajuda"
          title="Ajuda"
          className="p-1 -m-1"
        >
          <HelpCircle size={20} />
        </button>
        <button
          onClick={() => navigate({ to: "/app/notificacoes" })}
          className="relative"
          aria-label="Notificações"
        >
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 min-w-[14px] h-[14px] px-1 bg-red-500 rounded-full text-[9px] font-bold flex items-center justify-center">
            {transactions.length}
          </span>
        </button>
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
              <Settings className="mr-2 h-4 w-4" /> Serviços
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setHelpOpen(true)}>
              <HelpCircle className="mr-2 h-4 w-4" /> Ajuda e suporte
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                window.open(
                  "https://www.bradesco.com.br/html/classic/seguranca/index.shtm",
                  "_blank",
                )
              }
            >
              <Shield className="mr-2 h-4 w-4" /> Segurança
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                logout();
                navigate({ to: "/" });
              }}
              className="text-red-600 focus:text-red-600"
            >
              <LogOut className="mr-2 h-4 w-4" /> Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Dialog open={helpOpen} onOpenChange={setHelpOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Central de Ajuda</DialogTitle>
            <DialogDescription>Estamos disponíveis 24h para te ajudar.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3 text-sm text-slate-700">
            <a
              href="tel:40044040"
              className="flex items-center gap-3 rounded-lg border border-slate-200 p-3 hover:bg-slate-50"
            >
              <Phone size={18} className="text-[#1a2a8a]" />
              <div>
                <div className="font-semibold">Capitais e regiões metropolitanas</div>
                <div className="text-slate-600">4004 4040</div>
              </div>
            </a>
            <a
              href="tel:08007040040"
              className="flex items-center gap-3 rounded-lg border border-slate-200 p-3 hover:bg-slate-50"
            >
              <Phone size={18} className="text-[#1a2a8a]" />
              <div>
                <div className="font-semibold">Demais localidades</div>
                <div className="text-slate-600">0800 704 0040</div>
              </div>
            </a>
            <a
              href="mailto:atendimento@bradesco.com.br"
              className="flex items-center gap-3 rounded-lg border border-slate-200 p-3 hover:bg-slate-50"
            >
              <Mail size={18} className="text-[#1a2a8a]" />
              <div>
                <div className="font-semibold">E-mail</div>
                <div className="text-slate-600">atendimento@bradesco.com.br</div>
              </div>
            </a>
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
            className={`flex flex-col items-center text-[11px] ${active ? "text-[#1a2a8a] font-semibold" : "text-slate-600"}`}
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
