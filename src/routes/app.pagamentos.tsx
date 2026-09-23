import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Barcode,
  Calendar,
  FileText,
  QrCode,
  Receipt,
  Repeat,
  Zap,
  ArrowRight,
} from "lucide-react";
import { PhoneFrame, BlueHeader, BottomNav, DemoBanner } from "@/components/app-shell";
import { toast } from "sonner";

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
                onClick={() => toast.info(a.msg)}
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
            <Repeat size={16} className="text-[#1a2a8a]" /> Ver pagamentos agendados
          </span>
          <ArrowRight size={16} className="text-[#cc092f]" />
        </Link>
      </div>
      <BottomNav />
    </PhoneFrame>
  );
}
