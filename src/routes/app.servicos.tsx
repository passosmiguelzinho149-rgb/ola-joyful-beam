import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { PhoneFrame, BlueHeader, BottomNav, DemoBanner } from "@/components/app-shell";

export const Route = createFileRoute("/app/servicos")({
  component: Servicos,
});

const categorias = [
  {
    titulo: "Transações e consultas",
    itens: [
      { label: "Agendamentos", to: "/app/agendamentos" },
      { label: "Boletos", to: "/app/boletos" },
      { label: "Cartões", to: "/app/cartoes" },
      { label: "Comprovantes", to: "/app/comprovantes" },
      { label: "Débito automático", to: "/app/debito-automatico" },
      { label: "Veículos", to: "/app/veiculos" },
      { label: "Imposto de renda", to: "/app/imposto-renda" },
      { label: "Minhas finanças", to: "/app/minhas-financas" },
      { label: "Pagamentos", to: "/app/pagamentos" },
      { label: "Pix", to: "/app/pix" },
      { label: "Recargas", to: "/app/recargas" },
      { label: "Saldo e extrato", to: "/app/extrato" },
      { label: "Saque", to: "/app/saque" },
      { label: "Transferências", to: "/app/transferencias" },
    ],
  },
  {
    titulo: "Empréstimos e financiamentos",
    itens: [
      { label: "Crédito imobiliário", to: "/app/credito-imobiliario" },
      { label: "Empréstimos", to: "/app/emprestimos" },
      { label: "Limites", to: "/app/limites" },
      { label: "Renegociação", to: "/app/renegociacao" },
    ],
  },
  {
    titulo: "Investimentos",
    itens: [
      { label: "Investimentos", to: "/app/investimentos" },
      { label: "Poupança", to: "/app/poupanca" },
      { label: "Previdência", to: "/app/previdencia" },
    ],
  },
  {
    titulo: "Mais produtos e contas",
    itens: [
      { label: "Câmbio", to: "/app/cambio" },
      { label: "Capitalização", to: "/app/capitalizacao" },
      { label: "Cheques", to: "/app/cheques" },
      { label: "Consórcio", to: "/app/consorcio" },
      { label: "Conta internacional", to: "/app/conta-internacional" },
      { label: "Conta digital", to: "/app/conta-digital" },
      { label: "Depósito", to: "/app/deposito" },
      { label: "Seguros", to: "/app/seguros" },
    ],
  },
  {
    titulo: "Compras e benefícios",
    itens: [
      { label: "Shop", to: "/app/shop" },
      { label: "Cashback", to: "/app/cashback" },
      { label: "Benefícios", to: "/app/beneficios" },
    ],
  },
  {
    titulo: "Perfil e ajuda",
    itens: [
      { label: "Atualização cadastral", to: "/app/atualizacao-cadastral" },
      { label: "Autorizações", to: "/app/autorizacoes" },
      { label: "Chat", to: "/app/chat" },
      { label: "Perfil", to: "/app/perfil" },
      { label: "Segurança", to: "/app/seguranca" },
    ],
  },
] as const;

function Servicos() {
  return (
    <PhoneFrame>
      <DemoBanner />
      <BlueHeader title="Serviços" showBack />
      <div className="bg-[#f7f7f8] flex-1 px-4 py-4 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-lg font-bold text-slate-800">Todos os serviços</h1>
          <Link
            to="/app/servicos"
            className="rounded-full border border-[#e11d48] text-[#e11d48] px-4 py-1 text-sm font-medium"
          >
            Personalizar
          </Link>
        </div>

        <div className="space-y-6 pb-4">
          {categorias.map((cat) => (
            <div key={cat.titulo}>
              <h2 className="text-sm font-bold text-slate-800 mb-2">
                {cat.titulo}
              </h2>
              <div className="rounded-2xl border border-rose-100 divide-y divide-rose-50 overflow-hidden shadow-sm bg-white">
                {cat.itens.map((i) => (
                  <Link
                    key={i.to}
                    to={i.to}
                    className="flex items-center justify-between px-4 py-3 text-slate-800 hover:bg-rose-50 transition-colors"
                  >
                    <span className="text-sm">{i.label}</span>
                    <ChevronRight size={16} className="text-[#e11d48]" />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <BottomNav />
    </PhoneFrame>
  );
}
