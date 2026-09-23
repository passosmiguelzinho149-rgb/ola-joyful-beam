import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  CheckCircle2,
  Laptop,
  MapPin,
  ShieldCheck,
  Smartphone,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { PhoneFrame, BlueHeader, BottomNav } from "@/components/app-shell";
import { dispositivos } from "@/lib/bank-store";

export const Route = createFileRoute("/app/dispositivos")({
  component: Dispositivos,
});

function Dispositivos() {
  const [lista, setLista] = useState(dispositivos);

  function remover(id: string, nome: string) {
    setLista((l) => l.filter((d) => d.id !== id));
    toast.success(`${nome} removido dos dispositivos autorizados`);
  }

  return (
    <PhoneFrame>
      <BlueHeader title="Dispositivos autorizados" showBack />
      <div className="bg-white flex-1 px-4 py-4 space-y-3 overflow-y-auto">
        <p className="text-xs text-slate-600">
          Estes aparelhos podem acessar a conta demonstrativa. Remova os que você não reconhece —
          eles precisam de um novo acesso com PIN.
        </p>

        {lista.map((d) => {
          const ehNavegador = d.modelo.toLowerCase().includes("navegador");
          return (
            <div
              key={d.id}
              className="rounded-2xl border border-slate-200 p-4 flex items-start gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-rose-50 text-[#e11d48] flex items-center justify-center shrink-0">
                {ehNavegador ? <Laptop size={18} /> : <Smartphone size={18} />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-slate-800 text-sm">{d.nome}</span>
                  {d.atual && (
                    <span className="text-[10px] font-bold rounded-full bg-emerald-50 text-emerald-700 px-2 py-0.5 flex items-center gap-1">
                      <CheckCircle2 size={10} /> este aparelho
                    </span>
                  )}
                </div>
                <div className="text-xs text-slate-600 mt-1">{d.modelo}</div>
                <div className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                  <MapPin size={12} /> {d.local}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Último acesso: {d.ultimoAcesso}
                </div>
              </div>
              <button
                onClick={() => remover(d.id, d.nome)}
                disabled={d.atual}
                aria-label={`Remover ${d.nome}`}
                className={`p-2 rounded-xl ${
                  d.atual ? "text-slate-300" : "text-[#e11d48] hover:bg-rose-50"
                }`}
              >
                <Trash2 size={16} />
              </button>
            </div>
          );
        })}

        {lista.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">
            Nenhum outro dispositivo autorizado.
          </div>
        )}

        <Link
          to="/app/acessos"
          className="flex items-center justify-center gap-2 rounded-2xl border border-rose-100 py-3 text-sm font-semibold text-[#e11d48]"
        >
          <ShieldCheck size={16} /> Ver histórico de acessos
        </Link>
      </div>
      <BottomNav />
    </PhoneFrame>
  );
}
