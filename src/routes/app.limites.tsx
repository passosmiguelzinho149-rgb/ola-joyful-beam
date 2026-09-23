import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { PhoneFrame, BlueHeader, BottomNav, DemoBanner } from "@/components/app-shell";
import { formatBRL } from "@/lib/bank-store";
import { toast } from "sonner";

export const Route = createFileRoute("/app/limites")({
  component: Limites,
});

const limites = [
  { id: "pix-dia", label: "Pix por dia", used: 52_625_000, total: 100_000_000 },
  { id: "pix-noite", label: "Pix noturno (20h às 6h)", used: 5_000_000, total: 20_000_000 },
  { id: "ted", label: "TED por dia", used: 12_000_000, total: 50_000_000 },
  { id: "cartao", label: "Compras no cartão", used: 3_240_000, total: 15_000_000 },
];

function Limites() {
  const [valores, setValores] = useState(limites);

  function increase(id: string) {
    setValores((vs) =>
      vs.map((v) => (v.id === id ? { ...v, total: Math.round(v.total * 1.2) } : v)),
    );
    toast.success("Limite ampliado com sucesso");
  }

  return (
    <PhoneFrame>
      <DemoBanner />
      <BlueHeader title="Limites" showBack />
      <div className="flex-1 overflow-y-auto bg-slate-50 px-4 py-4 space-y-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-start gap-3">
            <SlidersHorizontal className="mt-0.5 text-[#cc092f]" size={20} />
            <p className="text-sm text-slate-600">
              Acompanhe quanto da sua empresa já foi usado em cada modalidade. Ampliações passam
              pela análise automática e valem no mesmo dia.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {valores.map((v) => {
            const pct = Math.min(100, Math.round((v.used / v.total) * 100));
            return (
              <div key={v.id} className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-800">{v.label}</span>
                  <span className="text-xs text-slate-500">{pct}% usado</span>
                </div>

                <div className="mt-3 h-2 w-full rounded-full bg-slate-100">
                  <div
                    className={`h-2 rounded-full ${pct > 80 ? "bg-[#cc092f]" : "bg-[#cc092f]"}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>

                <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
                  <span>Usado {formatBRL(v.used)}</span>
                  <span>Limite {formatBRL(v.total)}</span>
                </div>

                <button
                  onClick={() => increase(v.id)}
                  className="mt-3 w-full rounded-md border border-[#1a2a8a] py-2 text-sm font-semibold text-[#cc092f]"
                >
                  Solicitar ampliação
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <BottomNav />
    </PhoneFrame>
  );
}
