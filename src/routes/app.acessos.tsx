import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, MapPin, Smartphone, XCircle } from "lucide-react";
import { PhoneFrame, BlueHeader, BottomNav } from "@/components/app-shell";
import { acessos } from "@/lib/bank-store";

export const Route = createFileRoute("/app/acessos")({
  component: Acessos,
});

const filtros = [
  { id: "todos", label: "Todos" },
  { id: "sucesso", label: "Bem-sucedidos" },
  { id: "falha", label: "Bloqueados" },
] as const;

function Acessos() {
  const [filtro, setFiltro] = useState<"todos" | "sucesso" | "falha">("todos");
  const lista = acessos.filter((a) => (filtro === "todos" ? true : a.status === filtro));

  return (
    <PhoneFrame>
      <BlueHeader title="Histórico de acessos" showBack />
      <div className="bg-white flex-1 px-4 py-4 space-y-4 overflow-y-auto">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {filtros.map((f) => (
            <button
              key={f.id}
              onClick={() => setFiltro(f.id)}
              className={`shrink-0 rounded-2xl px-4 py-2 text-xs font-semibold ${
                filtro === f.id
                  ? "bg-gradient-to-r from-[#e11d48] to-[#f43f5e] text-white"
                  : "border border-rose-100 text-slate-700"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {lista.map((a) => {
            const ok = a.status === "sucesso";
            return (
              <div
                key={a.id}
                className={`rounded-2xl border p-3 flex gap-3 ${
                  ok ? "border-slate-200" : "border-rose-200 bg-rose-50/50"
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                    ok ? "bg-emerald-50 text-emerald-600" : "bg-rose-100 text-[#be123c]"
                  }`}
                >
                  {ok ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between gap-2">
                    <span className="text-sm font-semibold text-slate-800">
                      {ok ? "Acesso realizado" : "Acesso bloqueado"}
                    </span>
                    <span className="text-[11px] text-slate-500 shrink-0">{a.data}</span>
                  </div>
                  <div className="text-xs text-slate-600 mt-1 flex items-center gap-1">
                    <Smartphone size={12} /> {a.dispositivo}
                  </div>
                  <div className="text-xs text-slate-600 flex items-center gap-1">
                    <MapPin size={12} /> {a.local} — IP {a.ip}
                  </div>
                </div>
              </div>
            );
          })}

          {lista.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">
              Nenhum registro para este filtro.
            </div>
          )}
        </div>

        <p className="text-[11px] text-slate-400 text-center pb-2">
          Registros fictícios de demonstração.
        </p>
      </div>
      <BottomNav />
    </PhoneFrame>
  );
}
