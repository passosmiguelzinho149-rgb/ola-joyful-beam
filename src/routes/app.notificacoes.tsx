import { createFileRoute } from "@tanstack/react-router";
import { Bell, ArrowUp } from "lucide-react";
import { PhoneFrame, BlueHeader, BottomNav, DemoBanner } from "@/components/app-shell";
import { formatBRL, transactions } from "@/lib/bank-store";

export const Route = createFileRoute("/app/notificacoes")({
  component: Notificacoes,
});

function Notificacoes() {
  return (
    <PhoneFrame>
      <DemoBanner />
      <BlueHeader title="Notificações" showBack />
      <div className="bg-white flex-1 px-4 py-4">
        <div className="flex items-center gap-2 mb-3">
          <Bell size={18} className="text-[#cc092f]" />
          <h1 className="text-lg font-bold text-slate-900">Suas notificações</h1>
        </div>
        <div className="space-y-3">
          {transactions.map((t) => (
            <div key={t.id} className="rounded-xl border border-slate-200 p-3 flex gap-3">
              <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                <ArrowUp size={18} className="text-green-600" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <span className="font-semibold text-slate-800 text-sm">
                    Transferência recebida
                  </span>
                  <span className="text-[11px] text-slate-500">{t.date}</span>
                </div>
                <div className="text-xs text-slate-600 mt-0.5">
                  {t.origin ?? "Pix recebido"}
                </div>
                <div className="text-green-700 font-bold text-sm mt-1">
                  + {formatBRL(t.amount)}
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
