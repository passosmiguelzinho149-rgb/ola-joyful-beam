import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check, Share2, Download, Printer } from "lucide-react";
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
          <Link to="/app/extrato" className="text-[#cc092f] underline">
            Voltar ao extrato
          </Link>
        </div>
      </div>
      <BottomNav />
    </PhoneFrame>
  ),
  errorComponent: ({ error }) => <div className="p-6 text-red-600">{error.message}</div>,
  loader: ({ params }) => {
    const t = transactions.find((x) => x.id === params.id);
    if (!t) throw notFound();
    return t;
  },
});

function Comprovante() {
  const t = Route.useLoaderData();

  // Padrão Pix Bacen (EndToEndId): E + ISPB(8) + AAAAMMDDHHMM + 11 alfanuméricos = 32 chars
  const ispb = "60746948"; // ISPB Bradesco
  const [dd, mm, yyyy] = t.date.split("/");
  const time = "10:32";
  const stamp = `${yyyy}${mm}${dd}${time.replace(":", "")}`;
  const seedStr = `${t.id}-${t.amount}-${t.date}`;
  let seed = 0;
  for (let i = 0; i < seedStr.length; i++) seed = (seed * 31 + seedStr.charCodeAt(i)) >>> 0;
  const alfa = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const rand = Array.from({ length: 11 }, () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return alfa[seed % 36];
  }).join("");
  const e2e = `E${ispb}${stamp}${rand}`;

  // ID/Autenticação no padrão Bradesco (hex blocos)
  const hex = "0123456789ABCDEF";
  let s2 = seed;
  const auth = Array.from({ length: 4 }, () =>
    Array.from({ length: 6 }, () => {
      s2 = (s2 * 22695477 + 1) >>> 0;
      return hex[s2 % 16];
    }).join(""),
  ).join(".");

  // Heurística pagador
  const origin = t.origin ?? "";
  const cnpjMatch = origin.match(/\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}/);
  const payerCnpj = cnpjMatch?.[0] ?? "44.529.644/0001-47";
  const payerName = origin.split(" - ")[0] || "MARCOS NUNES DE MIRANDA";

  const isIn = t.type === "in";
  const fromName = isIn ? payerName : bankInfo.holder;
  const fromDoc = isIn ? payerCnpj : bankInfo.cnpj;
  const toName = isIn ? bankInfo.holder : payerName;
  const toDoc = isIn ? bankInfo.cnpj : payerCnpj;

  return (
    <PhoneFrame>
      <DemoBanner />
      <BlueHeader title="Comprovante" showBack />
      <div className="bg-slate-100 flex-1 overflow-y-auto">
        <div className="px-4 py-4 space-y-3">
          {/* Cartão principal */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {/* Cabeçalho Bradesco */}
            <div className="bg-[#cc092f] px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center">
                  <span className="text-[#cc092f] font-black text-sm">B</span>
                </div>
                <span className="text-white font-bold tracking-wide">Bradesco</span>
              </div>
              <span className="text-white/90 text-xs">Comprovante</span>
            </div>

            {/* Status */}
            <div className="px-4 pt-5 pb-3 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-green-50 ring-4 ring-green-100 flex items-center justify-center">
                <Check className="text-green-600" size={32} strokeWidth={3} />
              </div>
              <h1 className="text-base font-bold text-slate-900 mt-3">
                {isIn ? "Pix recebido" : "Pix enviado"}
              </h1>
              <div className="text-xs text-slate-500 mt-0.5">
                {t.date} às {time}
              </div>
              <div className="mt-3 text-[28px] leading-none font-bold text-slate-900">
                {formatBRL(t.amount)}
              </div>
            </div>

            <div className="border-t border-dashed border-slate-200 mx-4" />

            {/* Quem pagou */}
            <Section title="Quem pagou">
              <Row label="Nome" value={fromName} />
              <Row label="CPF/CNPJ" value={maskDoc(fromDoc)} />
              <Row label="Instituição" value={isIn ? "ITAÚ UNIBANCO S.A." : "BRADESCO S.A."} />
              <Row label="Agência" value={isIn ? "0001" : bankInfo.agency} />
              <Row label="Conta" value={isIn ? "12345-6" : bankInfo.account} />
              <Row label="Tipo de conta" value="Conta corrente" />
            </Section>

            <div className="border-t border-dashed border-slate-200 mx-4" />

            {/* Quem recebeu */}
            <Section title="Quem recebeu">
              <Row label="Nome" value={toName} />
              <Row label="CPF/CNPJ" value={maskDoc(toDoc)} />
              <Row label="Instituição" value={isIn ? "BRADESCO S.A." : "ITAÚ UNIBANCO S.A."} />
              <Row label="Agência" value={isIn ? bankInfo.agency : "0001"} />
              <Row label="Conta" value={isIn ? bankInfo.account : "12345-6"} />
              <Row label="Tipo de conta" value="Conta corrente" />
            </Section>

            <div className="border-t border-dashed border-slate-200 mx-4" />

            {/* Detalhes da operação */}
            <Section title="Dados da transação">
              <Row label="Tipo de transferência" value="Pix" />
              <Row label="Tipo de chave" value="CNPJ" />
              <Row label="Descrição" value={t.description} />
              <Row label="Data/Hora" value={`${t.date} ${time}`} />
            </Section>

            <div className="border-t border-dashed border-slate-200 mx-4" />

            {/* Autenticação */}
            <div className="px-4 py-4 space-y-3">
              <div>
                <div className="text-[11px] uppercase tracking-wider text-slate-500 mb-1">
                  ID da transação
                </div>
                <div className="text-[11px] font-mono text-slate-800 break-all">{e2e}</div>
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-slate-500 mb-1">
                  Autenticação Bradesco
                </div>
                <div className="text-[12px] font-mono text-slate-800 tracking-wider">{auth}</div>
              </div>
            </div>

            {/* Rodapé do comprovante */}
            <div className="bg-slate-50 px-4 py-3 text-center">
              <div className="text-[10px] text-slate-500 leading-tight">
                Banco Bradesco S.A. — CNPJ 60.746.948/0001-12
                <br />
                Núcleo Cidade de Deus, s/nº — Vila Yara — Osasco/SP
              </div>
            </div>
          </div>

          {/* Ações */}
          <div className="grid grid-cols-3 gap-2">
            <ActionBtn icon={<Share2 size={16} />} label="Compartilhar" />
            <ActionBtn icon={<Printer size={16} />} label="Imprimir" />
            <ActionBtn icon={<Download size={16} />} label="Baixar PDF" primary />
          </div>

          <p className="text-[11px] text-slate-400 text-center pb-2">
            Comprovante de demonstração. Nenhuma operação real foi realizada.
          </p>
        </div>
      </div>
      <BottomNav />
    </PhoneFrame>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="px-4 py-3">
      <div className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold mb-2">
        {title}
      </div>
      <div className="space-y-1.5">{children}</div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3 text-[13px]">
      <span className="text-slate-500">{label}</span>
      <span className="text-slate-900 font-medium text-right">{value}</span>
    </div>
  );
}

function ActionBtn({
  icon,
  label,
  primary,
}: {
  icon: React.ReactNode;
  label: string;
  primary?: boolean;
}) {
  const cls = primary
    ? "bg-[#cc092f] text-white"
    : "bg-white border border-slate-200 text-slate-700";
  return (
    <button
      className={`${cls} rounded-xl py-2.5 flex flex-col items-center justify-center gap-1 text-[11px] font-medium`}
    >
      {icon}
      {label}
    </button>
  );
}

function maskDoc(doc: string) {
  // Mascara CPF/CNPJ ocultando dígitos do meio, padrão usado por bancos
  if (/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(doc)) {
    return doc.replace(/^\d{3}\.(\d{3})\.(\d{3})-/, "***.$1.$2-");
  }
  if (/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(doc)) {
    return doc.replace(/^\d{2}\.(\d{3})\.(\d{3})\//, "**.$1.$2/");
  }
  return doc;
}
