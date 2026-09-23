import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { FileCheck, Search } from "lucide-react";
import { PhoneFrame, BlueHeader, BottomNav, DemoBanner } from "@/components/app-shell";
import { formatBRL, transactions } from "@/lib/bank-store";

export const Route = createFileRoute("/app/comprovantes")({
  component: Comprovantes,
});

function Comprovantes() {
  const [term, setTerm] = useState("");

  const lista = transactions.filter((t) =>
    `${t.description} ${t.origin ?? ""} ${t.date}`.toLowerCase().includes(term.toLowerCase()),
  );

  return (
    <PhoneFrame>
      <DemoBanner />
      <BlueHeader title="Comprovantes" showBack />
      <div className="flex-1 overflow-y-auto bg-slate-50 px-4 py-4 space-y-4">
        <label className="flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3">
          <span className="sr-only">Buscar comprovante</span>
          <input
            aria-label="Buscar comprovante"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Buscar por data ou descrição"
            className="min-w-0 flex-1 bg-transparent text-sm outline-none"
          />
          <Search size={18} className="text-slate-400" />
        </label>

        <div className="divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white">
          {lista.map((t) => (
            <Link
              key={t.id}
              to="/app/comprovante/$id"
              params={{ id: t.id }}
              className="flex items-center gap-3 px-4 py-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
                <FileCheck size={18} className="text-[#1a2a8a]" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium leading-tight text-slate-800">
                  {t.description}
                </div>
                <div className="text-xs text-slate-500">{t.date}</div>
              </div>
              <div
                className={`text-sm font-semibold ${
                  t.type === "in" ? "text-emerald-700" : "text-red-600"
                }`}
              >
                {formatBRL(t.amount)}
              </div>
            </Link>
          ))}

          {lista.length === 0 && (
            <div className="px-4 py-8 text-center text-sm text-slate-500">
              Nenhum comprovante encontrado.
            </div>
          )}
        </div>
      </div>
      <BottomNav />
    </PhoneFrame>
  );
}
