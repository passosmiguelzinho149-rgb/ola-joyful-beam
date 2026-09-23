import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { User, ChevronRight, Camera, LogOut } from "lucide-react";
import { PhoneFrame, BlueHeader, BottomNav, DemoBanner } from "@/components/app-shell";
import { bankInfo, useSession, usePhoto } from "@/lib/bank-store";

export const Route = createFileRoute("/app/perfil")({
  component: Perfil,
});

function Perfil() {
  const navigate = useNavigate();
  const { logout } = useSession();
  const { photo, setPhoto } = usePhoto();

  function onPhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => setPhoto(String(r.result));
    r.readAsDataURL(f);
  }

  const cards = ["Dados pessoais", "Dados da empresa", "Dados da conta"];
  const items = [
    "Falar com o Gerente",
    "Sobre o App",
    "Gerenciar dados e privacidade",
    "Propostas da empresa",
  ];

  return (
    <PhoneFrame>
      <DemoBanner />
      <BlueHeader title="Perfil" showBack />
      <div className="bg-[#cc092f] text-white px-4 pt-3 pb-7">
        <div className="flex items-center gap-3">
          <label className="cursor-pointer relative shrink-0">
            <div className="w-14 h-14 rounded-full bg-white/15 overflow-hidden flex items-center justify-center">
              {photo ? <img src={photo} className="w-full h-full object-cover" /> : <User size={28} />}
            </div>
            <span className="absolute -bottom-1 -right-1 bg-white text-[#cc092f] rounded-full p-1"><Camera size={12} /></span>
            <input type="file" accept="image/*" onChange={onPhoto} className="hidden" />
          </label>
          <div className="leading-tight min-w-0">
            <div className="font-bold text-lg truncate">{bankInfo.holder}</div>
            <div className="text-xs opacity-90">{bankInfo.company}</div>
            <div className="text-xs opacity-90">CNPJ: {bankInfo.cnpj}</div>
          </div>
        </div>
      </div>

      <div className="bg-[#f7f7f8] flex-1 px-4 py-4 overflow-y-auto">
        <div className="grid grid-cols-3 gap-2 -mt-12 mb-4">
          {cards.map((c) => (
            <div
              key={c}
              className="bg-white rounded-2xl border border-rose-100 shadow-sm p-3 text-center text-sm text-slate-700 min-h-[90px] flex items-end"
            >
              {c}
            </div>
          ))}
        </div>
        <div className="rounded-2xl border border-rose-100 divide-y bg-white shadow-sm">
          {items.map((i) => (
            <button
              key={i}
              className="w-full flex items-center justify-between px-4 py-3 text-slate-800"
            >
              {i} <ChevronRight size={16} className="text-[#cc092f]" />
            </button>
          ))}
          <button
            onClick={() => {
              logout();
              navigate({ to: "/" });
            }}
            className="w-full flex items-center justify-between px-4 py-3 text-red-600"
          >
            <span className="flex items-center gap-2">
              <LogOut size={16} /> Sair
            </span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
      <BottomNav />
    </PhoneFrame>
  );
}
