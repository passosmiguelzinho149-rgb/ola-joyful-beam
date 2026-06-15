import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, ArrowUp, ChevronRight } from "lucide-react";
import { PhoneFrame, BlueHeader, BottomNav, DemoBanner } from "@/components/app-shell";
import { formatBRL, transactions } from "@/lib/bank-store";

export const Route = createFileRoute("/app/extrato")({
  component: Extrato,
});

function Extrato() {
  return (
    <PhoneFrame>
      <DemoBanner />
      <BlueHeader title="Extrato" showBack />
      <div className="bg-white flex-1 px-4 py-4">
        <h1 className="text-xl font-bold text-slate-900 mb-3">Últimas movimentações</h1>
        <div className="space-y-3">
          {transactions.map((t) => (
            <div key={t.id} className="rounded-xl border border-slate-200 p-3">
              <div className="flex justify-between text-xs text-slate-500">
                <span>{t.date}</span>
                <span className={t.type === "in" ? "text-green-600" : "text-red-600"}>
                  {t.type === "in" ? "Entrada" : "Saída"}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                {t.type === "in" ? (
                  <ArrowUp className="text-green-600" size={18} />
                ) : (
                  <ArrowDown className="text-red-600" size={18} />
                )}
                <div className="flex-1">
                  <div className="font-semibold text-slate-800">{t.description}</div>
                  {t.origin && <div className="text-xs text-slate-500">{t.origin}</div>}
                </div>
                <div className={`font-bold ${t.type === "in" ? "text-green-700" : "text-red-700"}`}>
                  {t.type === "in" ? "+" : "-"} {formatBRL(t.amount)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BottomNav />
    </PhoneFrame>
  );
}
