import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CheckCircle2, Share2, Download } from "lucide-react";
import { PhoneFrame, BlueHeader, BottomNav, DemoBanner } from "@/components/app-shell";
import { bankInfo, formatBRL, transactions } from "@/lib/bank-store";

export const Route = createFileRoute("/app/comprovante/$id")({
  component: Comprovante,
  notFoundComponent: () => (
    <PhoneFrame>
      <DemoBanner />
      <BlueHeader title="Comprovante" showBack />
      <div className="bg-white flex-1 px-4 py-6 text-slate-700">
        Comprovante não encontrado.
        <div className="mt-4">
          <Link to="/app/extrato" className="text-[#cc092f] underline">Voltar ao extrato</Link>
        </div>
      </div>
      <BottomNav />
    </PhoneFrame>
  ),
  errorComponent: ({ error }) => (
    <div className="p-6 text-red-600">{error.message}</div>
  ),
  loader: ({ params }) => {
    const t = transactions.find((x) => x.id === params.id);
    if (!t) throw notFound();
    return t;
  },
});

function Comprovante() {
  const t = Route.useLoaderData();
  const auth = "E" + Math.random().toString(36).slice(2, 12).toUpperCase() + Date.now().toString(36).toUpperCase();

  // Heurística para extrair pagador/CNPJ do campo origin
  const origin = t.origin ?? "";
  const cnpjMatch = origin.match(/\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}/);
  const cnpj = cnpjMatch?.[0];
  const payer = origin.replace(/\s*-?\s*CNPJ.*/i, "").trim() || "Transferência entre contas";

  return (
    <PhoneFrame>
      <DemoBanner />
      <BlueHeader title="Comprovante" showBack />
      <div className="bg-white flex-1 px-4 py-5 space-y-4">
        <div className="flex flex-col items-center text-center">
          <CheckCircle2 className="text-green-600" size={56} />
          <h1 className="text-lg font-bold text-slate-900 mt-2">
            {t.type === "in" ? "Pix recebido" : "Pix enviado"}
          </h1>
          <div className={`text-2xl font-bold mt-1 ${t.type === "in" ? "text-green-700" : "text-red-700"}`}>
            {t.type === "in" ? "+" : "-"} {formatBRL(t.amount)}
          </div>
          <div className="text-xs text-slate-500 mt-1">{t.date} • 10:32</div>
        </div>

        <div className="rounded-xl border border-slate-200 divide-y divide-slate-200">
          <Row label={t.type === "in" ? "Pagador" : "Recebedor"} value={payer} />
          {cnpj && <Row label="CNPJ" value={cnpj} />}
          <Row label="Instituição" value="Banco do demo - 001" />
          <Row label="Tipo" value="Pix" />
          <Row label="Descrição" value={t.description} />
        </div>

        <div className="rounded-xl border border-slate-200 divide-y divide-slate-200">
          <Row label="Recebedor" value={bankInfo.holder} />
          <Row label="CNPJ" value={bankInfo.cnpj} />
          <Row label="Agência" value={bankInfo.agency} />
          <Row label="Conta" value={bankInfo.account} />
        </div>

        <div className="rounded-xl border border-slate-200 p-3 text-xs text-slate-600 break-all">
          <div className="font-semibold text-slate-800 mb-1">Autenticação</div>
          {auth}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button className="rounded-xl border border-slate-200 py-3 flex items-center justify-center gap-2 text-slate-700">
            <Share2 size={16} /> Compartilhar
          </button>
          <button className="rounded-xl bg-[#cc092f] text-white py-3 flex items-center justify-center gap-2">
            <Download size={16} /> Baixar PDF
          </button>
        </div>

        <p className="text-[11px] text-slate-400 text-center">
          Comprovante de demonstração. Nenhuma operação real foi realizada.
        </p>
      </div>
      <BottomNav />
    </PhoneFrame>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3 p-3 text-sm">
      <span className="text-slate-500">{label}</span>
      <span className="text-slate-800 font-medium text-right">{value}</span>
    </div>
  );
}
