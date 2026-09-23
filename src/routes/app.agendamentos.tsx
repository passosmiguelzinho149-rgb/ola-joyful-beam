import { createFileRoute } from "@tanstack/react-router";
import { Calendar, Clock, Plus, Repeat } from "lucide-react";
import { PhoneFrame, BlueHeader, BottomNav, DemoBanner } from "@/components/app-shell";
import { formatBRL } from "@/lib/bank-store";
import { toast } from "sonner";

export const Route = createFileRoute("/app/agendamentos")({
  component: Agendamentos,
});

const agendados = [
  {
    id: "a1",
    title: "Pagamento de boleto",
    detail: "Energia elétrica · Vencimento 25/06/2026",
    amount: 1_240_000,
    date: "25/06/2026",
  },
  {
    id: "a2",
    title: "TED programada",
    detail: "Fornecedores Alfa Ltda · Ag. 3344",
    amount: 8_500_000,
    date: "30/06/2026",
  },
  {
    id: "a3",
    title: "Débito automático",
    detail: "Prestação de veículo · Frota",
    amount: 2_730_000,
    date: "05/07/2026",
  },
];

function Agendamentos() {
  const total = agendados.reduce((s, a) => s + a.amount, 0);

  return (
    <PhoneFrame>
      <DemoBanner />
      <BlueHeader title="Agendamentos" showBack />
      <div className="flex-1 overflow-y-auto bg-slate-50 px-4 py-4 space-y-4">
        <div className="rounded-xl bg-[#cc092f] p-4 text-white">
          <div className="flex items-center gap-2 text-sm opacity-90">
            <Calendar size={16} /> Total agendado
          </div>
          <div className="mt-1 text-2xl font-bold">{formatBRL(total)}</div>
          <div className="mt-1 text-xs opacity-90">{agendados.length} lançamentos futuros</div>
        </div>

        <div className="divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white">
          {agendados.map((a) => (
            <div key={a.id} className="flex items-center gap-3 px-4 py-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
                <Clock size={18} className="text-[#cc092f]" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium leading-tight text-slate-800">{a.title}</div>
                <div className="text-xs text-slate-500">{a.detail}</div>
                <div className="mt-0.5 text-xs text-slate-500">Data: {a.date}</div>
              </div>
              <div className="text-sm font-semibold text-slate-800">{formatBRL(a.amount)}</div>
            </div>
          ))}
        </div>

        <button
          onClick={() => toast.info("Escolha o tipo de lançamento para agendar")}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 py-3 text-sm text-slate-600"
        >
          <Plus size={16} /> Novo agendamento
        </button>

        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Repeat size={14} /> Agendamentos são processados no primeiro horário útil do dia escolhido.
        </div>
      </div>
      <BottomNav />
    </PhoneFrame>
  );
}
