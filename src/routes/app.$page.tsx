import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageCircle, Receipt, FileCheck, LayoutGrid } from "lucide-react";
import { PhoneFrame, BlueHeader, BottomNav } from "@/components/app-shell";

export const Route = createFileRoute("/app/$page")({
  component: Generic,
});

const titulos: Record<string, string> = {
  saldo: "Saldo",
  transferencias: "Transferências",
  emprestimos: "Empréstimos",
  investimentos: "Investimentos",
  poupanca: "Poupança",
  previdencia: "Previdência",
  cambio: "Câmbio",
  capitalizacao: "Capitalização",
  cheques: "Cheques",
  consorcio: "Consórcio",
  "conta-internacional": "Conta Internacional",
  "conta-digital": "Conta Digital",
  deposito: "Depósito",
  seguros: "Seguros",
  boletos: "Boletos",
  veiculos: "Veículos",
  "imposto-renda": "Imposto de Renda",
  "minhas-financas": "Minhas Finanças",
  recargas: "Recargas",
  saque: "Saques",
  cashback: "Cashback",
  beneficios: "Benefícios",
  "credito-imobiliario": "Crédito Imobiliário",
  renegociacao: "Renegociação",
  seguranca: "Segurança",
  autorizacoes: "Autorizações",
  "atualizacao-cadastral": "Atualização Cadastral",
  "debito-automatico": "Débito Automático",
  agendamentos: "Agendamentos",
  limites: "Limites",
  comprovantes: "Comprovantes",
};

function Generic() {
  const { page } = Route.useParams();
  const titulo = titulos[page] ?? page.replace(/-/g, " ");

  return (
    <PhoneFrame>
      <BlueHeader title={titulo} showBack />
      <div className="bg-white flex-1 px-4 py-5 space-y-4">
        <div className="rounded-3xl border border-rose-100 bg-rose-50/60 p-4">
          <h1 className="text-lg font-bold text-slate-900 capitalize">{titulo}</h1>
          <p className="text-sm text-slate-600 mt-1">
            Este recurso faz parte do NOVABANK demonstrativo. Fale com a NOVA para saber como usar
            ou volte para os serviços.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Link
            to="/app/chat"
            className="rounded-3xl border border-rose-100 p-4 shadow-sm flex flex-col gap-2 text-slate-800 hover:bg-rose-50"
          >
            <MessageCircle size={22} className="text-[#e11d48]" />
            <span className="text-sm">Falar com a NOVA</span>
          </Link>
          <Link
            to="/app/extrato"
            className="rounded-3xl border border-rose-100 p-4 shadow-sm flex flex-col gap-2 text-slate-800 hover:bg-rose-50"
          >
            <Receipt size={22} className="text-[#e11d48]" />
            <span className="text-sm">Ver saldo e extrato</span>
          </Link>
          <Link
            to="/app/comprovantes"
            className="rounded-3xl border border-rose-100 p-4 shadow-sm flex flex-col gap-2 text-slate-800 hover:bg-rose-50"
          >
            <FileCheck size={22} className="text-[#e11d48]" />
            <span className="text-sm">Comprovantes</span>
          </Link>
          <Link
            to="/app/servicos"
            className="rounded-3xl border border-rose-100 p-4 shadow-sm flex flex-col gap-2 text-slate-800 hover:bg-rose-50"
          >
            <LayoutGrid size={22} className="text-[#e11d48]" />
            <span className="text-sm">Todos os serviços</span>
          </Link>
        </div>
      </div>
      <BottomNav />
    </PhoneFrame>
  );
}
