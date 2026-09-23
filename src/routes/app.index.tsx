import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Eye,
  EyeOff,
  ChevronRight,
  Zap,
  ArrowLeftRight,
  Barcode,
  CreditCard,
  HandCoins,
  TrendingUp,
  PieChart,
  SlidersHorizontal,
  MessageCircle,
  Bell,
  Gift,
  Lightbulb,
  Sparkles,
} from "lucide-react";
import { PhoneFrame, BlueHeader, BottomNav } from "@/components/app-shell";
import { bankInfo, formatBRL, transactions } from "@/lib/bank-store";

export const Route = createFileRoute("/app/")({
  component: Home,
});

const favoritos = [
  { to: "/app/pix", label: "Pix", icon: Zap },
  { to: "/app/transferencias", label: "Transferências", icon: ArrowLeftRight },
  { to: "/app/pagamentos", label: "Pagamentos", icon: Barcode },
  { to: "/app/cartoes", label: "Cartões", icon: CreditCard },
  { to: "/app/emprestimos", label: "Empréstimos", icon: HandCoins },
  { to: "/app/investimentos", label: "Investimentos", icon: TrendingUp },
  { to: "/app/open-finance", label: "Open Finance", icon: PieChart },
  { to: "/app/servicos", label: "Personalizar", icon: SlidersHorizontal },
] as const;

const ofertas = [
  {
    titulo: "Crédito pré-aprovado",
    texto: "Simule até R$ 25.000,00 com taxa demonstrativa.",
    to: "/app/emprestimos",
    cta: "Simular",
  },
  {
    titulo: "Cartão NOVA Cashback",
    texto: "Cashback fictício de até 2% nas compras do Shop.",
    to: "/app/cartoes",
    cta: "Ver cartões",
  },
  {
    titulo: "Invista a partir de R$ 50,00",
    texto: "Poupança, renda fixa e fundos de demonstração.",
    to: "/app/investimentos",
    cta: "Investir",
  },
] as const;

const beneficios = [
  "Pix ilimitado e sem tarifa (demo)",
  "Cashback acumulado de R$ 84,20",
  "Recarga de celular com 10% de bônus fictício",
];

function Home() {
  const [show, setShow] = useState(true);
  const entradas = transactions.filter((t) => t.type === "in").reduce((s, t) => s + t.amount, 0);
  const saidas = transactions.filter((t) => t.type === "out").reduce((s, t) => s + t.amount, 0);

  return (
    <PhoneFrame>
      <div className="bg-gradient-to-b from-[#e11d48] via-[#f43f5e] to-[#fda4af] text-white">
        <BlueHeader />
        <div className="px-4 pt-2 pb-7">
          <p className="text-sm opacity-90">Olá,</p>
          <h2 className="text-xl font-bold leading-tight">{bankInfo.holder}</h2>
          <p className="text-[11px] opacity-90 mt-1">
            Ag. {bankInfo.agency} — Conta {bankInfo.account} — NOVABANK
          </p>

          <div className="mt-4 rounded-3xl bg-white/15 backdrop-blur-sm p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Saldo disponível</span>
              <button
                onClick={() => setShow((s) => !s)}
                aria-label={show ? "Ocultar saldo" : "Mostrar saldo"}
                className="p-1"
              >
                {show ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>
            <div className="text-2xl font-bold mt-1">
              {show ? formatBRL(bankInfo.balance) : "R$ ••••••"}
            </div>
            <Link
              to="/app/extrato"
              className="mt-3 inline-flex w-full items-center justify-center gap-1 rounded-2xl bg-white/20 py-2 text-sm font-semibold"
            >
              Ver extrato <ChevronRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-3">
            <Link
              to="/app/chat"
              className="flex items-center justify-center gap-2 rounded-2xl bg-white/20 py-3 text-sm font-semibold"
            >
              <MessageCircle size={16} /> Falar com a NOVA
            </Link>
            <Link
              to="/app/notificacoes"
              className="flex items-center justify-center gap-2 rounded-2xl bg-white/20 py-3 text-sm font-semibold"
            >
              <Bell size={16} /> Notificações
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white flex-1 px-4 py-4 space-y-5">
        <div>
          <h3 className="font-semibold text-slate-800 mb-2">Favoritos</h3>
          <div className="grid grid-cols-4 gap-2">
            {favoritos.map((f) => {
              const Icon = f.icon;
              return (
                <Link
                  key={f.to}
                  to={f.to}
                  className="rounded-2xl border border-rose-100 bg-white p-2 text-center text-[10px] text-slate-700 aspect-square flex flex-col items-center justify-center gap-1 shadow-sm hover:bg-rose-50 transition-colors"
                >
                  <Icon size={20} className="text-[#e11d48]" />
                  <span className="leading-tight">{f.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="rounded-3xl border border-rose-100 p-4 shadow-sm">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-slate-800">Resumo do mês</span>
            <Link to="/app/extrato" className="text-xs text-[#e11d48] underline">
              detalhes
            </Link>
          </div>
          <div className="grid grid-cols-2 mt-3 gap-3">
            <div className="rounded-2xl bg-emerald-50 p-3">
              <div className="text-xs text-emerald-700">Entradas</div>
              <div className="font-semibold text-emerald-800">{formatBRL(entradas)}</div>
            </div>
            <div className="rounded-2xl bg-rose-50 p-3">
              <div className="text-xs text-[#be123c]">Saídas</div>
              <div className="font-semibold text-[#be123c]">{formatBRL(saidas)}</div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
            <Sparkles size={16} className="text-[#e11d48]" /> Ofertas para você
          </h3>
          <div className="space-y-2">
            {ofertas.map((o) => (
              <div key={o.titulo} className="rounded-3xl border border-rose-100 p-4 shadow-sm">
                <div className="font-semibold text-slate-800">{o.titulo}</div>
                <p className="text-sm text-slate-600 mt-1">{o.texto}</p>
                <Link
                  to={o.to}
                  className="mt-3 inline-flex items-center gap-1 rounded-2xl bg-gradient-to-r from-[#e11d48] to-[#f43f5e] px-4 py-2 text-sm font-semibold text-white"
                >
                  {o.cta} <ChevronRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-rose-100 p-4 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
            <Gift size={16} className="text-[#e11d48]" /> Seus benefícios
          </h3>
          <ul className="space-y-2 text-sm text-slate-700">
            {beneficios.map((b) => (
              <li key={b} className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#e11d48]" />
                {b}
              </li>
            ))}
          </ul>
          <Link
            to="/app/servicos"
            className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#e11d48]"
          >
            Ver todos os serviços <ChevronRight size={14} />
          </Link>
        </div>

        <div className="rounded-3xl bg-gradient-to-r from-[#e11d48] to-[#f43f5e] text-white p-4">
          <div className="flex items-center gap-2 font-semibold">
            <Lightbulb size={16} /> Dicas e novidades
          </div>
          <p className="mt-1 text-sm opacity-95">
            Cadastre suas chaves Pix e ative o débito automático para não perder vencimentos. Este
            app é um protótipo: nenhum valor é movimentado de verdade.
          </p>
        </div>
      </div>

      <BottomNav />
    </PhoneFrame>
  );
}
