import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Eye, EyeOff, Search, SlidersHorizontal } from "lucide-react";
import { PhoneFrame, BottomNav, DemoBanner } from "@/components/app-shell";
import { bankInfo, formatBRL, transactions } from "@/lib/bank-store";

export const Route = createFileRoute("/app/extrato")({ component: Extrato });

function Extrato() {
  const navigate = useNavigate();

  return (
    <PhoneFrame>
      <DemoBanner />
      <div className="bg-[#cc092f] text-white px-4 pt-3 pb-5">
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => navigate({ to: "/app" })} aria-label="Voltar" className="p-1">
            <ArrowLeft size={22} />
          </button>
          <h1 className="text-lg font-semibold">Extrato</h1>
        </div>
        <div className="mt-4 rounded-2xl bg-white/12 border border-white/10 px-4 py-3">
          <div className="flex items-center justify-between">
            <span className="text-sm opacity-90">Saldo disponível</span>
            <EyeOff size={17} />
          </div>
          <div className="mt-1 text-2xl font-bold">{formatBRL(bankInfo.balance)}</div>
          <Link to="/app" className="text-xs underline underline-offset-2">Voltar para início</Link>
        </div>
      </div>

      <div className="bg-[#f7f7f8] flex-1 overflow-y-auto px-4 py-4">
        <label className="flex h-11 items-center rounded-2xl border border-slate-200 bg-white px-3 shadow-sm">
          <Search size={18} className="text-slate-400" />
          <input aria-label="Buscar lançamentos" placeholder="Buscar lançamentos"
            className="min-w-0 flex-1 bg-transparent px-2 text-sm outline-none placeholder:text-slate-400" />
        </label>

        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          <button className="flex shrink-0 items-center gap-1 rounded-full bg-[#fff1f2] px-3 py-2 text-xs font-semibold text-[#cc092f]">
            Filtrar <SlidersHorizontal size={14} />
          </button>
          <button className="shrink-0 rounded-full bg-[#cc092f] px-4 py-2 text-xs font-semibold text-white">7 dias</button>
          <button className="shrink-0 rounded-full bg-white border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600">15 dias</button>
          <button className="shrink-0 rounded-full bg-white border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600">30 dias</button>
        </div>

        <div className="mt-4 grid grid-cols-4 rounded-2xl bg-white border border-slate-100 p-1 shadow-sm text-center text-xs font-semibold">
          {["Todos", "Entradas", "Saídas", "Futuros"].map((label, i) => (
            <button key={label} className={`rounded-xl py-2 ${i === 0 ? "bg-[#fff1f2] text-[#cc092f]" : "text-slate-500"}`}>{label}</button>
          ))}
        </div>

        <div className="mt-3 rounded-2xl bg-white border border-slate-100 shadow-sm overflow-hidden divide-y divide-slate-100">
          {transactions.map((t) => (
            <Link key={t.id} to="/app/comprovante/$id" params={{ id: t.id }}
              className="flex items-center gap-3 px-4 py-3 hover:bg-[#fff8f9]">
              <div className={`h-9 w-9 shrink-0 rounded-full flex items-center justify-center ${t.type === "in" ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-[#cc092f]"}`}>
                <span className="text-xs font-bold">{t.date.slice(0, 2)}</span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold text-slate-800">PIX QR CODE STATIC</div>
                <div className="truncate text-xs text-slate-500">REM: CLEITON OLIVEIRA DOS</div>
                <div className="text-[10px] text-slate-400">{t.date.slice(0, 5)} · Documento 2254545</div>
              </div>
              <div className={`text-sm font-bold ${t.type === "in" ? "text-emerald-700" : "text-[#cc092f]"}`}>
                {formatBRL(t.amount)}
              </div>
            </Link>
          ))}
          <div className="flex items-center justify-between px-4 py-3 text-sm font-semibold text-slate-700">
            <span>Saldo do dia</span><span>{formatBRL(bankInfo.balance)}</span>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2 rounded-2xl border border-rose-100 bg-[#fff1f2] p-3 text-xs text-[#9f1239]">
          <Eye size={15} /> Toque em um lançamento para abrir o comprovante demonstrativo.
        </div>
      </div>
      <BottomNav />
    </PhoneFrame>
  );
}
