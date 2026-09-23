import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Building2, ChevronRight, RefreshCw, ShieldCheck } from "lucide-react";
import { PhoneFrame, BlueHeader, BottomNav, DemoBanner } from "@/components/app-shell";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/app/open-finance")({
  component: OpenFinance,
});

const institutions = [
  { id: "i1", name: "Banco do Brasil", detail: "Conta corrente · Ag. 1234" },
  { id: "i2", name: "Itaú Unibanco", detail: "Conta PJ · Ag. 5678" },
  { id: "i3", name: "Nubank", detail: "Conta PJ" },
  { id: "i4", name: "Caixa Econômica Federal", detail: "Poupança empresa" },
];

function OpenFinance() {
  const [shared, setShared] = useState<Record<string, boolean>>({
    i1: true,
    i2: true,
    i3: false,
    i4: false,
  });

  const ativos = Object.values(shared).filter(Boolean).length;

  return (
    <PhoneFrame>
      <DemoBanner />
      <BlueHeader title="Open Finance" showBack />
      <div className="flex-1 overflow-y-auto bg-slate-50 px-4 py-4 space-y-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-0.5 text-[#cc092f]" size={20} />
            <div>
              <div className="font-semibold text-slate-800">Seus dados, seu controle</div>
              <p className="mt-1 text-sm text-slate-600">
                Você escolhe com quais instituições compartilhar as informações da sua empresa. Pode
                revogar o consentimento a qualquer momento.
              </p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
            <RefreshCw size={14} /> Atualizado agora · {ativos} consentimento(s) ativo(s)
          </div>
        </div>

        <h2 className="text-sm font-semibold text-slate-700">Instituições</h2>

        <div className="divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white">
          {institutions.map((i) => (
            <div key={i.id} className="flex items-center gap-3 px-4 py-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
                <Building2 size={18} className="text-[#cc092f]" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-medium leading-tight text-slate-800">{i.name}</div>
                <div className="text-xs text-slate-500">{i.detail}</div>
              </div>
              <Switch
                checked={shared[i.id]}
                onCheckedChange={(v) => setShared((s) => ({ ...s, [i.id]: v }))}
                aria-label={`Compartilhar dados com ${i.name}`}
              />
            </div>
          ))}
        </div>

        <button className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-left">
          <span className="text-sm text-slate-700">Conectar nova instituição</span>
          <ChevronRight size={16} className="text-[#cc092f]" />
        </button>
      </div>
      <BottomNav />
    </PhoneFrame>
  );
}
