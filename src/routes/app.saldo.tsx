import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, ArrowUp, ChevronRight, FileText } from "lucide-react";
import { PhoneFrame, BlueHeader, BottomNav, DemoBanner } from "@/components/app-shell";
import { bankInfo, formatBRL, transactions } from "@/lib/bank-store";

export const Route = createFileRoute("/app/saldo")({
  component: Saldo,
});

function Saldo() {
  const entradas = transactions
    .filter((t) => t.type === "in")
    .reduce((s, t) => s + t.amount, 0);
  const saidas = transactions.filter((t) => t.type === "out").reduce((s, t) => s + t.amount, 0);

  return (
    <PhoneFrame>
      <DemoBanner />
      <BlueHeader title="Saldo" showBack />
      <div className="flex-1 overflow-y-auto bg-slate-50">
        <div className="bg-gradient-to-b from-[#1a2a8a] via-[#5b1a8a] to-[#cc092f] px-4 pt-4 pb-8 text-white">
          <div className="text-sm opacity-90">Saldo disponível</div>
          <div className="mt-1 text-3xl font-extrabold">{formatBRL(bankInfo.balance)}</div>
          <div className="mt-3 flex justify-between text-sm">
            <span>
              Agência: <b>{bankInfo.agency}</b>
            </span>
            <span>
              Conta: <b>{bankInfo.account}</b>
            </span>
          </div>
        </div>

        <div className="mx-4 -mt-5 space-y-3 rounded-xl border border-slate-200 bg-white p-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <ArrowUp size={14} className="text-green-600" /> Entradas
              </div>
              <div className="font-semibold text-slate-900">{formatBRL(entradas)}</div>
            </div>
            <div>
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <ArrowDown size={14} className="text-red-600" /> Saídas
              </div>
              <div className="font-semibold text-slate-900">{formatBRL(saidas)}</div>
            </div>
          </div>

          <Link
            to="/app/extrato"
            className="flex items-center justify-between border-t border-slate-100 pt-3 text-sm font-medium text-[#1a2a8a]"
          >
            <span className="flex items-center gap-2">
              <FileText size={16} /> Ver extrato completo
            </span>
            <ChevronRight size={16} />
          </Link>
        </div>

        <div className="px-4 py-4">
          <h2 className="mb-2 text-sm font-semibold text-slate-700">Últimos lançamentos</h2>
          <div className="divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white">
            {transactions.map((t) => (
              <Link
                key={t.id}
                to="/app/comprovante/$id"
                params={{ id: t.id }}
                className="flex items-center justify-between px-4 py-3"
              >
                <div>
                  <div className="text-sm font-medium text-slate-800">{t.description}</div>
                  <div className="text-xs text-slate-500">{t.date}</div>
                </div>
                <div
                  className={`text-sm font-semibold ${
                    t.type === "in" ? "text-emerald-700" : "text-red-600"
                  }`}
                >
                  {t.type === "in" ? "+ " : "- "}
                  {formatBRL(t.amount)}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <BottomNav />
    </PhoneFrame>
  );
}
