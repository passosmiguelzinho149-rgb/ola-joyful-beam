import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff, ArrowUp, ArrowDown, ChevronRight } from "lucide-react";
import { PhoneFrame, BlueHeader, BottomNav, DemoBanner } from "@/components/app-shell";
import { bankInfo, formatBRL, transactions } from "@/lib/bank-store";

export const Route = createFileRoute("/app/")({
  component: Home,
});

const quick = [
  { to: "/app/pix", label: "Pix" },
  { to: "/app/linhas-credito", label: "Linhas de Crédito" },
  { to: "/app/cartoes", label: "Cartões" },
  { to: "/app/open-finance", label: "Open Finance" },
  { to: "/app/chat", label: "WhatsApp" },
] as const;

function Home() {
  const [show, setShow] = useState(true);
  const entradas = transactions.filter((t) => t.type === "in").reduce((s, t) => s + t.amount, 0);
  const saidas = transactions.filter((t) => t.type === "out").reduce((s, t) => s + t.amount, 0);

  return (
    <PhoneFrame>
      <DemoBanner />
      <div className="bg-gradient-to-b from-[#1a2a8a] via-[#5b1a8a] to-[#cc092f] text-white">
        <BlueHeader />
        <div className="px-4 pt-2 pb-6">
          <h2 className="text-lg font-bold leading-tight">Olá, {bankInfo.holder}</h2>
          <p className="text-xs mt-1">{bankInfo.company}</p>
          <p className="text-xs">CNPJ: {bankInfo.cnpj}</p>

          <div className="mt-4 rounded-xl bg-white/10 backdrop-blur-sm p-4">
            <div className="flex justify-between text-sm">
              <span>Agência: <b>{bankInfo.agency}</b></span>
              <span>Conta: <b>{bankInfo.account}</b></span>
            </div>
            <div className="mt-3 text-sm">Saldo disponível</div>
            <div className="flex items-center justify-between mt-1">
              <div className="flex items-center gap-2 text-2xl font-bold">
                {show ? formatBRL(bankInfo.balance) : "R$ ••••••"}
                <button onClick={() => setShow((s) => !s)}>
                  {show ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
              <Link to="/app/extrato" className="underline text-sm">Ver detalhes</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white flex-1 px-4 py-4 space-y-4">
        <div className="rounded-xl border border-slate-200 p-4">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-slate-800">Resumo diário</span>
            <span className="text-xs text-slate-500">18/06/2026</span>
          </div>
          <div className="grid grid-cols-2 mt-3 gap-2">
            <div>
              <div className="flex items-center gap-1 text-sm text-slate-600">
                <ArrowUp size={14} className="text-green-600" /> Entradas
              </div>
              <div className="font-semibold text-slate-900">{formatBRL(entradas)}</div>
            </div>
            <div>
              <div className="flex items-center gap-1 text-sm text-slate-600">
                <ArrowDown size={14} className="text-red-600" /> Saídas
              </div>
              <div className="font-semibold text-slate-900">{formatBRL(saidas)}</div>
            </div>
          </div>
        </div>

        <Link to="/app/extrato" className="flex items-center gap-1 text-[#cc092f] underline text-sm">
          Consultar extrato <ChevronRight size={14} />
        </Link>

        <div>
          <h3 className="font-semibold text-slate-800 mb-2">Soluções para sua empresa</h3>
          <Link
            to="/app/pix"
            className="block rounded-xl border border-slate-200 p-3 hover:bg-slate-50"
          >
            <div className="font-semibold text-slate-800">Pix</div>
            <p className="text-sm text-slate-600">
              Pague, receba e transfira a qualquer hora do dia.
            </p>
          </Link>
        </div>

        <div>
          <h3 className="font-semibold text-slate-800 mb-2">Acesso rápido</h3>
          <div className="grid grid-cols-4 gap-2">
            {quick.map((q) => (
              <Link
                key={q.to}
                to={q.to}
                className="rounded-xl border border-slate-200 p-2 text-center text-[11px] text-slate-700 aspect-square flex items-center justify-center"
              >
                {q.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-[#cc092f] text-white p-4 text-sm">
          <b>Vai pagar boleto? Atenção!</b>
          <p className="mt-1 opacity-90">
            Confira os dados e valide a origem antes de confirmar qualquer transação.
          </p>
        </div>
      </div>

      <BottomNav />
    </PhoneFrame>
  );
}
