import { createFileRoute } from "@tanstack/react-router";
import { PhoneFrame, BlueHeader, BottomNav, DemoBanner } from "@/components/app-shell";

export const Route = createFileRoute("/app/$page")({
  component: Generic,
});

const titles: Record<string, string> = {
  saldo: "Saldo",
  cartoes: "Cartões",
  pagamentos: "Pagamentos",
  "open-finance": "Open Finance",
  chat: "Chat",
  agendamentos: "Agendamentos",
  limites: "Limites",
  comprovantes: "Comprovantes",
  solucoes: "Soluções",
  "informe-rendimentos": "Informe Rendimentos",
  debitos: "Débitos",
  buscador: "Buscador",
  recebiveis: "Recebíveis",
  investimentos: "Investimentos",
  "debito-automatico": "Débito Automático",
};

function Generic() {
  const { page } = Route.useParams();
  const title = titles[page] ?? page;
  return (
    <PhoneFrame>
      <DemoBanner />
      <BlueHeader title={title} showBack />
      <div className="bg-white flex-1 px-4 py-6">
        <h1 className="text-xl font-bold text-slate-900">{title}</h1>
        <p className="text-sm text-slate-600 mt-2">
          Tela de demonstração de <b>{title}</b>. Nenhuma operação real é realizada aqui.
        </p>
        <div className="mt-6 grid grid-cols-2 gap-3">
          {["Consultar", "Solicitar", "Histórico", "Ajuda"].map((b) => (
            <button key={b} className="rounded-xl border border-slate-200 py-6 text-slate-700">
              {b}
            </button>
          ))}
        </div>
      </div>
      <BottomNav />
    </PhoneFrame>
  );
}
