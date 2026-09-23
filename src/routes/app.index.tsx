import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeftRight,
  Barcode,
  Bell,
  ChevronRight,
  CreditCard,
  Eye,
  EyeOff,
  Gift,
  Globe,
  HandCoins,
  Landmark,
  MessageCircle,
  PieChart,
  PiggyBank,
  ShieldCheck,
  SlidersHorizontal,
  Smartphone,
  Sparkles,
  TrendingUp,
  Wallet,
  Zap,
  Receipt,
  Banknote,
  CalendarDays,
} from "lucide-react";
import { PhoneFrame, BlueHeader, BottomNav, DemoBanner } from "@/components/app-shell";
import { bankInfo, formatBRL, useNotificacoes } from "@/lib/bank-store";

export const Route = createFileRoute("/app/")({ component: Home });

const favoritos = [
  { to: "/app/transferencias", label: "Transferências", icon: ArrowLeftRight },
  { to: "/app/pix", label: "Pix", icon: Zap },
  { to: "/app/pagamentos", label: "Pagamentos", icon: Barcode },
  { to: "/app/cartoes", label: "Cartões", icon: CreditCard },
  { to: "/app/emprestimos", label: "Empréstimos", icon: HandCoins },
  { to: "/app/investimentos", label: "Investimentos", icon: TrendingUp },
  { to: "/app/open-finance", label: "Open Finance", icon: PieChart },
  { to: "/app/servicos", label: "Personalizar", icon: SlidersHorizontal },
] as const;

const diaADia = [
  { to: "/app/pagamentos", label: "Pagamentos", icon: Barcode },
  { to: "/app/pix", label: "Pix", icon: Zap },
  { to: "/app/cartoes", label: "Cartões", icon: CreditCard },
  { to: "/app/extrato", label: "Saldo e extrato", icon: Receipt },
  { to: "/app/transferencias", label: "Transferências", icon: ArrowLeftRight },
  { to: "/app/servicos", label: "Recargas", icon: Smartphone },
];

const financeiros = [
  { to: "/app/emprestimos", label: "Empréstimos", icon: HandCoins },
  { to: "/app/linhas-credito", label: "Limites de crédito", icon: Banknote },
  { to: "/app/servicos", label: "Renegociação de dívidas", icon: ShieldCheck },
  { to: "/app/servicos", label: "Consórcio", icon: Landmark },
  { to: "/app/servicos", label: "Capitalização", icon: Gift },
  { to: "/app/investimentos", label: "Previdência", icon: PiggyBank },
];

const ofertas = [
  { titulo: "Oferta com cashback", texto: "Benefícios e ofertas especiais no Shop.", to: "/app/shop" },
  { titulo: "Crédito pré-aprovado", texto: "Simule uma proposta demonstrativa.", to: "/app/emprestimos" },
  { titulo: "Invista a partir de R$ 50,00", texto: "Produtos de investimento em modo demonstração.", to: "/app/investimentos" },
];

function Home() {
  const [show, setShow] = useState(true);
  const { naoLidas } = useNotificacoes();
  const primeiroNome = bankInfo.holder.split(" ")[0];

  return (
    <PhoneFrame>
      <div className="bg-[#cc092f] text-white">
        <BlueHeader />
        <div className="px-4 pt-3 pb-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm opacity-90">Olá, {primeiroNome}</p>
              <p className="text-[11px] opacity-80 mt-1">Agência {bankInfo.agency} · Conta {bankInfo.account}</p>
            </div>
            <span className="rounded-full border border-white/30 px-2 py-1 text-[9px] font-semibold">DEMO</span>
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between">
              <span className="text-sm opacity-90">Saldo</span>
              <button onClick={() => setShow((s) => !s)} aria-label={show ? "Ocultar saldo" : "Mostrar saldo"} className="p-1">
                {show ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>
            <div className="text-[28px] font-bold tracking-tight mt-0.5">
              {show ? formatBRL(bankInfo.balance) : "R$ ••••••"}
            </div>
            <Link to="/app/extrato" className="inline-flex items-center gap-1 mt-1 text-xs underline underline-offset-2">
              Ver extrato <ChevronRight size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-4">
            <Link to="/app/pix" className="flex items-center justify-center gap-2 rounded-2xl bg-white/15 py-2.5 text-sm font-semibold">
              <Zap size={16} /> Pix
            </Link>
            <Link to="/app/notificacoes" className="flex items-center justify-center gap-2 rounded-2xl bg-white/15 py-2.5 text-sm font-semibold">
              <Bell size={16} /> Notificações
              {naoLidas.length > 0 && <span className="min-w-[16px] h-[16px] rounded-full bg-white text-[#cc092f] text-[9px] font-bold flex items-center justify-center">{naoLidas.length}</span>}
            </Link>
          </div>
        </div>
      </div>

      <DemoBanner />

      <div className="bg-white flex-1 px-4 py-4 overflow-y-auto space-y-6">
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-slate-800">Favoritos</h3>
            <Link to="/app/servicos" className="text-xs text-[#cc092f] font-semibold">Personalizar</Link>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {favoritos.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.label} to={item.to} className="rounded-2xl bg-white p-2.5 text-center text-[10px] text-slate-700 aspect-square flex flex-col items-center justify-center gap-1.5 shadow-sm border border-slate-100">
                  <Icon size={21} className="text-[#cc092f]" />
                  <span className="leading-tight">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </section>

        <section>
          <h3 className="font-semibold text-slate-800 mb-3">Ofertas</h3>
          <div className="flex gap-2 overflow-x-auto pb-1 snap-x">
            {ofertas.map((item) => (
              <Link key={item.titulo} to={item.to} className="min-w-[260px] snap-start rounded-2xl bg-[#c8102e] text-white p-4 shadow-sm">
                <div className="flex items-center gap-2 font-semibold"><Gift size={18} /> {item.titulo}</div>
                <p className="text-xs opacity-90 mt-2">{item.texto}</p>
                <span className="inline-flex items-center gap-1 text-xs font-semibold mt-3">Ver oferta <ChevronRight size={13} /></span>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h3 className="font-semibold text-slate-800 mb-3">Para seu dia a dia</h3>
          <div className="grid grid-cols-3 gap-2">
            {diaADia.map((item) => {
              const Icon = item.icon;
              return <Link key={item.label} to={item.to} className="rounded-2xl border border-slate-100 p-3 min-h-[92px] flex flex-col items-center justify-center text-center gap-2 shadow-sm"><Icon size={21} className="text-[#cc092f]" /><span className="text-[11px] leading-tight text-slate-700">{item.label}</span></Link>;
            })}
          </div>
        </section>

        <section>
          <h3 className="font-semibold text-slate-800 mb-3">Mais serviços financeiros</h3>
          <div className="grid grid-cols-3 gap-2">
            {financeiros.map((item) => {
              const Icon = item.icon;
              return <Link key={item.label} to={item.to} className="rounded-2xl border border-slate-100 p-3 min-h-[92px] flex flex-col items-center justify-center text-center gap-2 shadow-sm"><Icon size={21} className="text-[#cc092f]" /><span className="text-[11px] leading-tight text-slate-700">{item.label}</span></Link>;
            })}
          </div>
        </section>

        <section>
          <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2"><Sparkles size={16} className="text-[#cc092f]" /> Benefícios e parcerias</h3>
          <div className="grid grid-cols-2 gap-2">
            <Link to="/app/shop" className="rounded-2xl bg-[#c8102e] text-white p-4 min-h-[110px]">
              <ShoppingBagIcon />
              <div className="font-semibold mt-2 text-sm">Oferta com cashback</div>
              <div className="text-[11px] opacity-90 mt-1">Consulte benefícios no Shop.</div>
            </Link>
            <Link to="/app/shop" className="rounded-2xl bg-[#c8102e] text-white p-4 min-h-[110px]">
              <ShoppingBagIcon />
              <div className="font-semibold mt-2 text-sm">Superoferta no Shop</div>
              <div className="text-[11px] opacity-90 mt-1">Produtos em demonstração.</div>
            </Link>
          </div>
        </section>

        <section>
          <h3 className="font-semibold text-slate-800 mb-3">Dicas e novidades</h3>
          <div className="rounded-2xl bg-[#c8102e] text-white p-4">
            <div className="font-semibold flex items-center gap-2"><CalendarDays size={18} /> Seus extratos</div>
            <p className="text-xs opacity-90 mt-2">Consulte o histórico e veja os comprovantes disponíveis neste protótipo.</p>
            <Link to="/app/extrato" className="inline-flex items-center gap-1 text-xs font-semibold mt-3 underline">Consultar extrato <ChevronRight size={13} /></Link>
          </div>
        </section>

        <section>
          <h3 className="font-semibold text-slate-800 mb-3">Acesso rápido</h3>
          <div className="grid grid-cols-2 gap-2">
            <Link to="/app/comprovantes" className="rounded-2xl bg-slate-50 p-3 text-sm font-semibold text-slate-700 flex items-center gap-2"><Receipt size={18} className="text-[#cc092f]" /> Comprovantes</Link>
            <Link to="/app/seguranca" className="rounded-2xl bg-slate-50 p-3 text-sm font-semibold text-slate-700 flex items-center gap-2"><ShieldCheck size={18} className="text-[#cc092f]" /> Segurança</Link>
            <Link to="/app/perfil" className="rounded-2xl bg-slate-50 p-3 text-sm font-semibold text-slate-700 flex items-center gap-2"><UserIcon /> Perfil</Link>
            <Link to="/app/chat" className="rounded-2xl bg-slate-50 p-3 text-sm font-semibold text-slate-700 flex items-center gap-2"><MessageCircle size={18} className="text-[#cc092f]" /> Atendimento</Link>
          </div>
        </section>
      </div>

      <BottomNav />
    </PhoneFrame>
  );
}

function ShoppingBagIcon() {
  return <span className="inline-flex w-8 h-8 rounded-full bg-white/15 items-center justify-center text-white">⌂</span>;
}

function UserIcon() {
  return <span className="inline-flex w-[18px] h-[18px] rounded-full border-2 border-[#cc092f] items-center justify-center text-[9px]">•</span>;
}
