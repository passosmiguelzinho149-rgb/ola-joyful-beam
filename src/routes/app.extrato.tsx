import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, EyeOff, Search, SlidersHorizontal } from "lucide-react";
import { PhoneFrame, BottomNav, DemoBanner } from "@/components/app-shell";
import { bankInfo, formatBRL, transactions } from "@/lib/bank-store";

export const Route = createFileRoute("/app/extrato")({
  component: Extrato,
});

function Extrato() {
  const navigate = useNavigate();

  return (
    <PhoneFrame>
      <DemoBanner />
      <div className="bg-bank-blue text-bank-blue-foreground px-6 pt-8 pb-8">
        <div className="flex items-center gap-5">
          <button
            type="button"
            onClick={() => navigate({ to: "/app" })}
            aria-label="Voltar"
            className="-ml-2 p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bank-blue-foreground"
          >
            <ArrowLeft size={30} strokeWidth={3} />
          </button>
          <h1 className="text-3xl font-bold tracking-normal">Extrato</h1>
        </div>

        <div className="mt-8 rounded-2xl bg-bank-blue-soft px-4 py-5 shadow-lg shadow-black/10">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-base font-medium opacity-95">Saldo disponível</div>
              <div className="mt-2 flex items-center gap-2 text-3xl font-extrabold leading-none">
                {formatBRL(bankInfo.balance)}
                <EyeOff size={26} strokeWidth={2.4} />
              </div>
            </div>
            <Link to="/app" className="pt-1 text-lg font-bold underline underline-offset-2">
              Ver detalhes
            </Link>
          </div>
        </div>
      </div>

      <div className="-mt-5 bg-bank-sheet flex-1 rounded-t-[28px] px-4 pt-5 pb-4">
        <div className="mx-auto mb-5 h-1.5 w-16 rounded-full bg-muted-foreground/25" />

        <label className="flex h-12 items-center rounded-xl border border-muted-foreground/35 bg-background px-3 text-foreground">
          <span className="sr-only">Buscar lançamentos</span>
          <input
            aria-label="Buscar lançamentos"
            placeholder="Buscar lançamentos"
            className="min-w-0 flex-1 bg-transparent text-[22px] outline-none placeholder:text-foreground"
          />
          <span className="mx-3 h-8 w-px bg-muted-foreground/25" />
          <Search size={28} className="text-muted-foreground" />
        </label>

        <div className="mt-5 flex gap-3 overflow-x-auto pb-1 text-lg font-bold text-bank-blue">
          <button className="flex shrink-0 items-center gap-2 rounded-xl bg-bank-chip px-4 py-2">
            Filtrar <SlidersHorizontal size={24} />
          </button>
          <button className="shrink-0 rounded-xl bg-bank-blue px-5 py-2 text-bank-blue-foreground">
            7 dias
          </button>
          <button className="shrink-0 rounded-xl bg-bank-chip px-5 py-2">15 dias</button>
          <button className="shrink-0 rounded-xl bg-bank-chip px-5 py-2">30 dias</button>
        </div>

        <div className="mt-4 grid grid-cols-4 border-b border-border text-center text-xl font-medium text-foreground/75">
          <button className="relative py-3 font-semibold text-foreground after:absolute after:bottom-[-1px] after:left-0 after:h-1 after:w-full after:rounded-t-full after:bg-bank-blue">
            Todos
          </button>
          <button className="py-3">Entradas</button>
          <button className="py-3">Saídas</button>
          <button className="py-3">Futuros</button>
        </div>

        <div className="divide-y divide-border">
          {transactions.map((t) => (
            <Link
              key={t.id}
              to="/app/comprovante/$id"
              params={{ id: t.id }}
              className="grid grid-cols-[72px_1fr_auto] gap-3 py-5 text-foreground hover:bg-muted/50"
            >
              <div className="pt-1 text-center leading-none">
                <div className="text-4xl font-bold">{t.date.slice(0, 2)}</div>
                <div className="mt-2 text-lg font-semibold">Jun</div>
              </div>

              <div className="min-w-0">
                <div className="flex items-start gap-3">
                  <span
                    className={`mt-2 h-2.5 w-2.5 shrink-0 rounded-full ${t.type === "in" ? "bg-emerald-800" : "bg-destructive"}`}
                  />
                  <div className="min-w-0">
                    <div className="text-xl font-extrabold uppercase leading-snug tracking-normal">
                      PIX QR CODE STATIC
                    </div>
                    <div className="mt-1 text-lg uppercase leading-snug text-muted-foreground">
                      REM: CLEITON OLIVEIRA DOS
                    </div>
                    <div className="text-lg leading-snug text-muted-foreground">
                      {t.date.slice(0, 5)}
                    </div>
                    <div className="text-lg leading-snug text-muted-foreground">Documento</div>
                    <div className="text-lg leading-snug text-muted-foreground">2254545</div>
                  </div>
                </div>
              </div>

              <div
                className={`pt-16 text-right text-xl font-semibold ${t.type === "in" ? "text-emerald-800" : "text-destructive"}`}
              >
                {formatBRL(t.amount)}
              </div>
            </Link>
          ))}

          <div className="flex items-center justify-between py-4 text-lg font-medium">
            <span>Saldo do dia</span>
            <span>{formatBRL(bankInfo.balance)}</span>
          </div>
        </div>
      </div>
      <BottomNav />
    </PhoneFrame>
  );
}
