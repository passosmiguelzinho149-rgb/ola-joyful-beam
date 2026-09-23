import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CreditCard, Eye, EyeOff, Lock, Plus } from "lucide-react";
import { PhoneFrame, BlueHeader, BottomNav, DemoBanner } from "@/components/app-shell";
import { bankInfo, formatBRL } from "@/lib/bank-store";

export const Route = createFileRoute("/app/cartoes")({
  component: Cartoes,
});

const cards = [
  {
    id: "c1",
    name: "Cartão Empresarial Platinum",
    last4: "4421",
    limit: 15_000_000,
    used: 3_240_000,
    invoice: 1_980_000,
    due: "10/07/2026",
  },
  {
    id: "c2",
    name: "Cartão Corporativo Mastercard",
    last4: "9876",
    limit: 8_000_000,
    used: 1_120_000,
    invoice: 640_000,
    due: "05/07/2026",
  },
];

function Cartoes() {
  const [show, setShow] = useState(true);

  const disponivel = cards.reduce((s, c) => s + (c.limit - c.used), 0);

  return (
    <PhoneFrame>
      <DemoBanner />
      <BlueHeader title="Cartões" showBack />
      <div className="flex-1 overflow-y-auto bg-slate-50 px-4 py-4 space-y-4">
        <div className="rounded-2xl bg-[#cc092f] text-white p-5 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm opacity-90">Limite total disponível</span>
            <button onClick={() => setShow((s) => !s)} aria-label="Mostrar ou ocultar limite">
              {show ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>
          <div className="mt-2 text-2xl font-bold">
            {show ? formatBRL(disponivel) : "R$ ••••••"}
          </div>
          <div className="mt-1 text-xs opacity-90">{bankInfo.company}</div>
        </div>

        <h2 className="text-sm font-semibold text-slate-700">Meus cartões</h2>

        <div className="space-y-3">
          {cards.map((c) => {
            const pct = Math.min(100, Math.round((c.used / c.limit) * 100));
            return (
              <div key={c.id} className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="flex items-center gap-3">
                  <CreditCard size={22} className="text-[#cc092f]" />
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold leading-tight text-slate-800">{c.name}</div>
                    <div className="text-xs text-slate-500">•••• {c.last4}</div>
                  </div>
                  <Lock size={16} className="text-slate-400" />
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <div className="text-xs text-slate-500">Fatura atual</div>
                    <div className="font-semibold text-slate-800">{formatBRL(c.invoice)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">Vencimento</div>
                    <div className="font-semibold text-slate-800">{c.due}</div>
                  </div>
                </div>

                <div className="mt-3 h-2 w-full rounded-full bg-slate-100">
                  <div className="h-2 rounded-full bg-[#cc092f]" style={{ width: `${pct}%` }} />
                </div>
                <div className="mt-1 text-[11px] text-slate-500">
                  Usado {formatBRL(c.used)} de {formatBRL(c.limit)}
                </div>

                <div className="mt-3 flex gap-2">
                  <Link
                    to="/app/extrato"
                    className="flex-1 rounded-md bg-[#cc092f] py-2 text-center text-sm text-white"
                  >
                    Ver fatura
                  </Link>
                  <button className="flex-1 rounded-md border border-slate-300 py-2 text-sm text-slate-700">
                    Bloquear
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 py-3 text-sm text-slate-600">
          <Plus size={16} /> Solicitar novo cartão
        </button>
      </div>
      <BottomNav />
    </PhoneFrame>
  );
}
