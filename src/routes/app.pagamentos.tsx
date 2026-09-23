import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  Barcode,
  Calendar,
  FileText,
  QrCode,
  Receipt,
  Repeat,
  Zap,
  ArrowRight,
  X,
} from "lucide-react";
import { PhoneFrame, BlueHeader, BottomNav, DemoBanner } from "@/components/app-shell";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatBRL, registrarSaida } from "@/lib/bank-store";

export const Route = createFileRoute("/app/pagamentos")({
  component: Pagamentos,
});

const actions = [
  { label: "Pagar boleto", icon: Barcode, msg: "Aponte a câmera para o código de barras" },
  { label: "Pix Copia e Cola", icon: Zap, msg: "Cole o código Pix para pagar" },
  { label: "Ler QR Code", icon: QrCode, msg: "Câmera indisponível na demo" },
  { label: "Tributos e impostos", icon: Receipt, msg: "Selecione o tributo a pagar" },
  { label: "Convênios", icon: FileText, msg: "Selecione o convênio da sua empresa" },
  { label: "Agendar pagamento", icon: Calendar, msg: "Escolha a data do agendamento" },
] as const;

function Pagamentos() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [tipo, setTipo] = useState("");
  const [codigo, setCodigo] = useState("");
  const [valor, setValor] = useState("");

  const iniciar = (label: string) => {
    if (label === "Agendar pagamento" || label === "Tributos e impostos" || label === "Convênios") {
      toast.info("Fluxo demonstrativo preparado. Informe os dados para continuar.");
    }
    setTipo(label);
    setCodigo("");
    setValor("");
    setOpen(true);
  };

  const confirmar = () => {
    const v = Number(valor.replace(".", "").replace(",", "."));
    if (!codigo.trim() || !v || v <= 0) {
      toast.error("Informe o código e um valor válido");
      return;
    }
    const tx = registrarSaida({
      descricao: tipo,
      valor: v,
      destinatario: codigo,
      chave: codigo,
      tipoChave: "Código de pagamento",
    });
    setOpen(false);
    toast.success("Pagamento demonstrativo realizado");
    navigate({ to: "/app/comprovante/$id", params: { id: tx.id } });
  };

  return (
    <PhoneFrame>
      <DemoBanner />
      <BlueHeader title="Pagamentos" showBack />
      <div className="flex-1 overflow-y-auto bg-slate-50 px-4 py-4 space-y-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="font-semibold text-slate-800">O que você quer pagar?</div>
          <p className="mt-1 text-sm text-slate-600">
            Confira sempre os dados do beneficiário antes de confirmar.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {actions.map((a) => {
            const Icon = a.icon;
            return (
              <button
                key={a.label}
                onClick={() => iniciar(a.label)}
                className="rounded-xl border border-slate-200 bg-white p-4 text-left transition hover:bg-slate-50"
              >
                <Icon size={22} className="text-[#cc092f]" />
                <div className="mt-2 text-sm text-slate-700">{a.label}</div>
              </button>
            );
          })}
        </div>

        <Link
          to="/app/agendamentos"
          className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3"
        >
          <span className="flex items-center gap-2 text-sm text-slate-700">
            <Repeat size={16} className="text-[#cc092f]" /> Ver pagamentos agendados
          </span>
          <ArrowRight size={16} className="text-[#cc092f]" />
        </Link>
      </div>
      <BottomNav />
      {open && (
        <div className="absolute inset-0 z-40 bg-black/40 flex items-end">
          <div className="w-full rounded-t-3xl bg-white p-5 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div><h2 className="font-bold text-lg text-slate-800">{tipo}</h2><p className="text-xs text-slate-500">Pagamento demonstrativo</p></div>
              <button onClick={() => setOpen(false)} aria-label="Fechar"><X size={20}/></button>
            </div>
            <div className="space-y-3">
              <div><label className="text-xs font-semibold text-slate-600">Código / referência</label><Input value={codigo} onChange={e=>setCodigo(e.target.value)} placeholder="Digite ou cole o código"/></div>
              <div><label className="text-xs font-semibold text-slate-600">Valor (R$)</label><Input inputMode="decimal" value={valor} onChange={e=>setValor(e.target.value)} placeholder="0,00"/></div>
              <div className="rounded-2xl bg-[#fff1f2] p-3 text-xs text-[#9f1239]">Valor informado: {formatBRL(Number(valor.replace(".", "").replace(",", ".")) || 0)}</div>
              <Button onClick={confirmar} className="w-full bg-[#cc092f] hover:bg-[#a30725]">Continuar e confirmar</Button>
            </div>
          </div>
        </div>
      )}
    </PhoneFrame>
  );
}
