import { createFileRoute } from "@tanstack/react-router";
import { Copy, Star, Building2, QrCode, DollarSign, FileText, SlidersHorizontal, KeyRound, Hand, Bell } from "lucide-react";
import { PhoneFrame, BlueHeader, BottomNav, DemoBanner } from "@/components/app-shell";

export const Route = createFileRoute("/app/pix")({
  component: Pix,
});

const sub = [
  { label: "Pix Copia e Cola", icon: Copy },
  { label: "Ler um QR Code", icon: QrCode },
  { label: "Receber por QR Code", icon: DollarSign },
];

const more = [
  { label: "Extrato Pix", icon: FileText },
  { label: "Limites Pix", icon: SlidersHorizontal },
  { label: "Chaves Pix", icon: KeyRound },
  { label: "Gerenciar contatos", icon: Star },
  { label: "Contestações", icon: Hand },
  { label: "Notificações Pix", icon: Bell },
];

function Pix() {
  return (
    <PhoneFrame>
      <DemoBanner />
      <BlueHeader title="Pix" showBack />
      <div className="bg-[#1f2db4] text-white px-4 pb-6">
        <h1 className="text-xl font-bold">Pix para sua empresa</h1>
        <p className="text-sm mt-1">Como você quer transferir?</p>
      </div>
      <div className="bg-white flex-1 px-4 py-4 space-y-4 -mt-3">
        <div className="rounded-xl border border-slate-200 p-3 bg-white shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-slate-700">Digitar ou colar nome/chave</span>
            <Copy size={16} className="text-[#1f2db4]" />
          </div>
          <input className="mt-2 w-full text-sm border-t border-slate-200 pt-2 outline-none" placeholder="Pode ser o nome do contato ou uma chave Pix" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button className="rounded-xl border border-slate-200 p-3 flex items-start gap-2">
            <Star className="text-[#1f2db4]" size={20} />
            <span className="text-sm text-left">Escolher um contato</span>
          </button>
          <button className="rounded-xl border border-slate-200 p-3 flex items-start gap-2">
            <Building2 className="text-[#1f2db4]" size={20} />
            <span className="text-sm text-left">Digitar agência e conta</span>
          </button>
        </div>

        <div>
          <h3 className="font-semibold text-slate-800 mb-2">Transferir, pagar e receber</h3>
          <div className="grid grid-cols-3 gap-3">
            {sub.map((s) => {
              const I = s.icon;
              return (
                <div key={s.label} className="rounded-xl border border-slate-200 p-3 text-center">
                  <I className="text-[#1f2db4] mx-auto" size={22} />
                  <div className="text-[11px] mt-2 text-slate-700">{s.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-slate-800 mb-2">Mais serviços</h3>
          <div className="grid grid-cols-2 gap-3">
            {more.map((m) => {
              const I = m.icon;
              return (
                <div key={m.label} className="rounded-xl border border-slate-200 p-3 flex items-center gap-2">
                  <I className="text-[#1f2db4]" size={18} />
                  <span className="text-sm text-slate-700">{m.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <BottomNav />
    </PhoneFrame>
  );
}
