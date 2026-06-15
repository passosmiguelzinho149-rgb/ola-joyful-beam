import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Zap, FileText, Receipt, HandCoins, CreditCard, Barcode, PieChart,
  MessageCircle, Calendar, SlidersHorizontal, FileCheck, Calculator,
  FileBarChart, Car, ScanLine, RefreshCw, TrendingUp, FileSignature,
} from "lucide-react";
import { PhoneFrame, BlueHeader, BottomNav, DemoBanner } from "@/components/app-shell";

export const Route = createFileRoute("/app/servicos")({
  component: Servicos,
});

const services = [
  { to: "/app/pix", label: "Pix", icon: Zap },
  { to: "/app/saldo", label: "Saldo", icon: FileText },
  { to: "/app/extrato", label: "Extrato", icon: Receipt },
  { to: "/app/linhas-credito", label: "Linhas de Crédito", icon: HandCoins },
  { to: "/app/cartoes", label: "Cartões", icon: CreditCard },
  { to: "/app/pagamentos", label: "Pagamentos", icon: Barcode },
  { to: "/app/open-finance", label: "Open Finance", icon: PieChart },
  { to: "/app/chat", label: "WhatsApp", icon: MessageCircle },
  { to: "/app/agendamentos", label: "Agendamentos", icon: Calendar },
  { to: "/app/limites", label: "Limites", icon: SlidersHorizontal },
  { to: "/app/comprovantes", label: "Comprovantes", icon: FileCheck },
  { to: "/app/solucoes", label: "Soluções", icon: Calculator },
  { to: "/app/informe-rendimentos", label: "Informe Rendimentos", icon: FileBarChart },
  { to: "/app/debitos", label: "Débitos", icon: Car },
  { to: "/app/buscador", label: "Buscador", icon: ScanLine },
  { to: "/app/recebiveis", label: "Recebíveis", icon: RefreshCw },
  { to: "/app/investimentos", label: "Investimentos", icon: TrendingUp },
  { to: "/app/debito-automatico", label: "Débito Automático", icon: FileSignature },
] as const;

function Servicos() {
  return (
    <PhoneFrame>
      <DemoBanner />
      <BlueHeader />
      <div className="bg-white flex-1 px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-slate-900">Serviços</h1>
          <button className="border border-[#cc092f] text-[#cc092f] rounded-full px-4 py-1 text-sm">
            Personalizar
          </button>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <Link
                key={s.to}
                to={s.to}
                className="aspect-square rounded-xl border border-slate-200 hover:bg-slate-50 flex flex-col items-center justify-center p-2 text-center"
              >
                <Icon size={26} className="text-[#cc092f]" />
                <span className="text-[11px] mt-2 text-slate-700 leading-tight">{s.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
      <BottomNav />
    </PhoneFrame>
  );
}
