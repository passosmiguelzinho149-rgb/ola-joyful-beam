import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check, Copy, Download, Printer, Share2 } from "lucide-react";
import { toast } from "sonner";
import { PhoneFrame, BlueHeader, BottomNav } from "@/components/app-shell";
import { bankInfo, formatBRL, transactions } from "@/lib/bank-store";

export const Route = createFileRoute("/app/comprovante/$id")({
  component: Comprovante,
  notFoundComponent: () => (
    <PhoneFrame>
      <BlueHeader title="Comprovante" showBack />
      <div className="bg-white flex-1 px-4 py-6 text-slate-700">
        Comprovante não encontrado.
        <div className="mt-4">
          <Link to="/app/extrato" className="text-[#e11d48] underline">
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
  const [geradoEm, setGeradoEm] = useState("");

  useEffect(() => {
    setGeradoEm(new Date().toLocaleString("pt-BR"));
  }, []);

  const isIn = t.type === "in";
  const fromName = isIn ? (t.origin ?? "—") : bankInfo.holder;
  const toName = isIn ? bankInfo.holder : (t.origin ?? "—");
  const fromDoc = isIn ? (t.documento ?? "—") : bankInfo.cnpj;
  const toDoc = isIn ? bankInfo.cnpj : (t.documento ?? "—");
  const fromInstituicao = isIn ? (t.instituicao ?? "BANCO EMISSOR S.A.") : bankInfo.bankName;
  const fromAgencia = isIn ? (t.agencia ?? "0001") : bankInfo.agency;
  const fromConta = isIn ? (t.conta ?? "00000-0") : bankInfo.account;
  const toInstituicao = isIn ? bankInfo.bankName : (t.instituicao ?? "BANCO DESTINO S.A.");
  const toAgencia = isIn ? bankInfo.agency : (t.agencia ?? "0001");
  const toConta = isIn ? bankInfo.account : (t.conta ?? "00000-0");

  function textoComprovante() {
    return [
      "Comprovante NOVABANK (demonstração)",
      `${isIn ? "Pix recebido" : "Pix enviado"} — ${formatBRL(t.amount)}`,
      `Data: ${t.date} às ${t.time}`,
      `Quem pagou: ${fromName}`,
      `Quem recebeu: ${toName}`,
      `Descrição: ${t.description}`,
      `ID da transação: ${t.endToEndId}`,
      `Autenticação: ${t.autenticacao}`,
    ].join("\n");
  }

  async function copiar(valor: string, mensagem: string) {
    try {
      await navigator.clipboard.writeText(valor);
      toast.success(mensagem);
    } catch {
      toast.error("Não foi possível copiar agora");
    }
  }

  async function compartilhar() {
    const texto = textoComprovante();
    if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
      try {
        await navigator.share({ title: "Comprovante NOVABANK", text: texto });
        return;
      } catch {
        return;
      }
    }
    await copiar(texto, "Comprovante copiado para a área de transferência");
  }

  function imprimir() {
    window.print();
  }

  function baixar() {
    const html = `<!doctype html><html lang='pt-BR'><head><meta charset='utf-8' /><title>Comprovante NOVABANK</title><style>body{font-family:Arial,Helvetica,sans-serif;padding:24px;color:#0f172a}h1{font-size:18px;margin:0 0 4px}small{color:#64748b}table{width:100%;border-collapse:collapse;margin-top:16px}td{padding:6px 0;border-bottom:1px solid #e2e8f0;font-size:13px;vertical-align:top}td:first-child{color:#64748b;width:38%}</style></head><body><h1>NOVABANK — ${isIn ? "Pix recebido" : "Pix enviado"}</h1><small>Comprovante de demonstração — nenhuma operação real foi realizada.</small><p><b>${formatBRL(t.amount)}</b><br />${t.date} às ${t.time}</p><table><tr><td>Quem pagou</td><td>${fromName}</td></tr><tr><td>CPF/CNPJ do pagador</td><td>${maskDoc(fromDoc)}</td></tr><tr><td>Instituição</td><td>${fromInstituicao}</td></tr><tr><td>Agência / conta</td><td>${fromAgencia} / ${fromConta}</td></tr><tr><td>Quem recebeu</td><td>${toName}</td></tr><tr><td>CPF/CNPJ do recebedor</td><td>${maskDoc(toDoc)}</td></tr><tr><td>Instituição</td><td>${toInstituicao}</td></tr><tr><td>Agência / conta</td><td>${toAgencia} / ${toConta}</td></tr><tr><td>Tipo de transferência</td><td>Pix</td></tr><tr><td>Tipo de chave</td><td>${t.tipoChave ?? "—"}</td></tr><tr><td>Descrição</td><td>${t.description}</td></tr><tr><td>Mensagem</td><td>${t.mensagem ?? "—"}</td></tr><tr><td>Canal</td><td>${t.canal}</td></tr><tr><td>Saldo após a transação</td><td>${formatBRL(t.saldoApos)}</td></tr><tr><td>ID da transação</td><td>${t.endToEndId}</td></tr><tr><td>Autenticação</td><td>${t.autenticacao}</td></tr></table></body></html>`;

    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `comprovante-${t.id}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Comprovante baixado");
  }

  return (
    <PhoneFrame>
      <BlueHeader title="Comprovante" showBack />
      <div className="bg-slate-100 flex-1 overflow-y-auto">
        <div className="px-4 py-4 space-y-3">
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="bg-[#cc092f] px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center">
                  <span className="text-[#cc092f] font-black text-sm">B</span>
                </div>
                <span className="text-white font-bold tracking-wide">Bradesco</span>
              </div>
              <span className="text-white/90 text-xs">Comprovante</span>
            </div>

            <div className="px-4 pt-5 pb-3 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-green-50 ring-4 ring-green-100 flex items-center justify-center">
                <Check className="text-green-600" size={32} strokeWidth={3} />
              </div>
              <h1 className="text-base font-bold text-slate-900 mt-3">
                {isIn ? "Pix recebido" : "Pix enviado"}
              </h1>
              <div className="text-xs text-slate-500 mt-0.5">
                {t.date} às {t.time}
              </div>
              <div className="mt-3 text-[28px] leading-none font-bold text-slate-900">
                {formatBRL(t.amount)}
              </div>
              <span className="mt-2 text-[11px] font-semibold rounded-full bg-emerald-50 text-emerald-700 px-2 py-0.5">
                Concluída
              </span>
            </div>

            <div className="border-t border-dashed border-slate-200 mx-4" />

            <Section title="Quem pagou">
              <Row label="Nome" value={fromName} />
              <Row label="CPF/CNPJ" value={maskDoc(fromDoc)} />
              <Row label="Instituição" value={fromInstituicao} />
              <Row label="Agência" value={fromAgencia} />
              <Row label="Conta" value={fromConta} />
              <Row label="Tipo de conta" value="Conta corrente" />
            </Section>

            <div className="border-t border-dashed border-slate-200 mx-4" />

            <Section title="Quem recebeu">
              <Row label="Nome" value={toName} />
              <Row label="CPF/CNPJ" value={maskDoc(toDoc)} />
              <Row label="Instituição" value={toInstituicao} />
              <Row label="Agência" value={toAgencia} />
              <Row label="Conta" value={toConta} />
              <Row label="Tipo de conta" value="Conta corrente" />
            </Section>

            <div className="border-t border-dashed border-slate-200 mx-4" />

            <Section title="Dados da transação">
              <Row label="Tipo de transferência" value="Pix" />
              <Row label="Forma de pagamento" value={isIn ? "Pix — QR Code" : "Pix — chave"} />
              <Row label="Tipo de chave" value={t.tipoChave ?? "—"} />
              <Row label="Chave de destino" value={t.chave ?? "—"} />
              <Row label="Descrição" value={t.description} />
              <Row label="Mensagem" value={t.mensagem ?? "—"} />
              <Row label="Canal" value={t.canal} />
              <Row label="Data/Hora" value={`${t.date} ${t.time}`} />
            </Section>

            <div className="border-t border-dashed border-slate-200 mx-4" />

            <Section title="Saldos">
              <Row label="Saldo após a transação" value={formatBRL(t.saldoApos)} />
              <Row label="Saldo disponível agora" value={formatBRL(bankInfo.balance)} />
            </Section>

            <div className="border-t border-dashed border-slate-200 mx-4" />

            <div className="px-4 py-4 space-y-3">
              <RowCopy
                label="ID da transação"
                value={t.endToEndId}
                onCopy={() => copiar(t.endToEndId, "ID da transação copiado")}
              />
              <RowCopy
                label="Autenticação"
                value={t.autenticacao}
                onCopy={() => copiar(t.autenticacao, "Autenticação copiada")}
              />
              <Row
                label="Comprovante gerado em"
                value={geradoEm || "—"}
              />
            </div>

            <div className="bg-slate-50 px-4 py-3 text-center">
              <div className="text-[10px] text-slate-500 leading-tight">
                Comprovante de demonstração do NOVABANK — dados 100% fictícios.
                <br />
                Nenhuma operação real foi realizada.
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <ActionBtn icon={<Share2 size={16} />} label="Compartilhar" onClick={compartilhar} />
            <ActionBtn icon={<Printer size={16} />} label="Imprimir" onClick={imprimir} />
            <ActionBtn icon={<Download size={16} />} label="Baixar" onClick={baixar} primary />
          </div>

          <div className="flex items-center justify-between rounded-2xl border border-rose-100 bg-white px-4 py-3">
            <span className="text-xs text-slate-600">Precisa do comprovante de outra transação?</span>
            <Link to="/app/extrato" className="text-xs font-semibold text-[#e11d48] underline">
              Ver extrato
            </Link>
          </div>

          <p className="text-[11px] text-slate-400 text-center pb-2">
            Guarde este comprovante pelos próximos 90 dias.
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

function RowCopy({
  label,
  value,
  onCopy,
}: {
  label: string;
  value: string;
  onCopy: () => void;
}) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-wider text-slate-500 mb-1">{label}</div>
      <div className="flex items-start gap-2">
        <span className="text-[11px] font-mono text-slate-800 break-all flex-1">{value}</span>
        <button
          onClick={onCopy}
          aria-label={`Copiar ${label}`}
          className="p-1 rounded-lg text-[#e11d48] hover:bg-rose-50 shrink-0"
        >
          <Copy size={14} />
        </button>
      </div>
    </div>
  );
}

function ActionBtn({
  icon,
  label,
  onClick,
  primary,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  primary?: boolean;
}) {
  const cls = primary
    ? "bg-[#cc092f] text-white"
    : "bg-white border border-slate-200 text-slate-700";
  return (
    <button
      onClick={onClick}
      className={`${cls} rounded-xl py-2.5 flex flex-col items-center justify-center gap-1 text-[11px] font-medium`}
    >
      {icon}
      {label}
    </button>
  );
}

function maskDoc(doc: string) {
  // Mascara CPF/CNPJ ocultando os primeiros dígitos, padrão usado por bancos
  if (doc.length === 18) return `**${doc.slice(2)}`;
  if (doc.length === 14) return `***${doc.slice(3)}`;
  return doc;
}
