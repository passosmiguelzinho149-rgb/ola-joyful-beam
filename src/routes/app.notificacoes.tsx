import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDownLeft, CheckCheck, Gift, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { PhoneFrame, BlueHeader, BottomNav } from "@/components/app-shell";
import { useNotificacoes } from "@/lib/bank-store";

export const Route = createFileRoute("/app/notificacoes")({
  component: Notificacoes,
});

function Notificacoes() {
  const { lista, naoLidas, marcarLida, marcarTodas } = useNotificacoes();

  return (
    <PhoneFrame>
      <BlueHeader title="Notificações" showBack />
      <div className="bg-white flex-1 px-4 py-4 overflow-y-auto">
        <div className="flex items-center justify-between gap-3 mb-3">
          <span className="text-sm text-slate-600">
            {naoLidas.length > 0 ? `${naoLidas.length} não lida(s)` : "Tudo lido por aqui"}
          </span>
          <button
            onClick={() => {
              marcarTodas();
              toast.success("Notificações marcadas como lidas");
            }}
            className="flex items-center gap-1 text-xs font-semibold text-[#e11d48]"
          >
            <CheckCheck size={14} /> Marcar todas como lidas
          </button>
        </div>

        <div className="space-y-3">
          {lista.map((n) => {
            const Icone =
              n.tipo === "seguranca" ? ShieldCheck : n.tipo === "oferta" ? Gift : ArrowDownLeft;
            return (
              <div
                key={n.id}
                className={`rounded-2xl border p-3 flex gap-3 ${
                  n.lida ? "border-slate-200 bg-white" : "border-rose-200 bg-rose-50/60"
                }`}
              >
                <div className="w-9 h-9 rounded-full bg-white border border-rose-100 flex items-center justify-center shrink-0 text-[#e11d48]">
                  <Icone size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between gap-2">
                    <span className="font-semibold text-slate-800 text-sm">{n.titulo}</span>
                    <span className="text-[11px] text-slate-500 shrink-0">{n.data}</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">{n.mensagem}</p>
                  <div className="mt-2 flex items-center gap-3">
                    <button
                      onClick={() => marcarLida(n.id)}
                      className="text-[11px] font-semibold text-[#e11d48]"
                    >
                      {n.lida ? "Marcar como não lida" : "Marcar como lida"}
                    </button>
                    {n.tipo === "transacao" && (
                      <Link
                        to="/app/extrato"
                        className="text-[11px] font-semibold text-slate-600 underline"
                      >
                        Ver no extrato
                      </Link>
                    )}
                    {n.tipo === "seguranca" && (
                      <Link
                        to="/app/acessos"
                        className="text-[11px] font-semibold text-slate-600 underline"
                      >
                        Ver acessos
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <BottomNav />
    </PhoneFrame>
  );
}
