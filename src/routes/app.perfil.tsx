import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { User, ChevronRight, Camera, LogOut } from "lucide-react";
import { PhoneFrame, BottomNav, DemoBanner } from "@/components/app-shell";
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
      <div className="bg-gradient-to-b from-[#1a2a8a] via-[#5b1a8a] to-[#cc092f] text-white px-4 pt-4 pb-8">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-[#cc092f] text-sm font-extrabold">
            B
          </div>
          <div className="leading-tight">
            <div className="text-sm font-bold tracking-wide">Bradesco</div>
            <div className="text-[10px] opacity-80">empresas e negócios</div>
          </div>
        </div>
        <div className="flex items-center gap-3 mt-6">
          <label className="cursor-pointer relative">
            <div className="w-14 h-14 rounded-full bg-white/15 overflow-hidden flex items-center justify-center">
              {photo ? (
                <img src={photo} className="w-full h-full object-cover" />
              ) : (
                <User size={28} />
              )}
            </div>
            <span className="absolute -bottom-1 -right-1 bg-white text-[#cc092f] rounded-full p-1">
              <Camera size={12} />
            </span>
            <input type="file" accept="image/*" onChange={onPhoto} className="hidden" />
          </label>
          <div className="leading-tight">
            <div className="font-bold text-lg">{bankInfo.holder}</div>
            <div className="text-xs">{bankInfo.company}</div>
            <div className="text-xs">CNPJ: {bankInfo.cnpj}</div>
          </div>
        </div>
      </div>

      <div className="bg-white flex-1 px-4 py-4">
        <div className="grid grid-cols-3 gap-2 -mt-12 mb-4">
          {cards.map((c) => (
            <div
              key={c}
              className="bg-white rounded-xl border border-slate-200 shadow-sm p-3 text-center text-sm text-slate-700 min-h-[90px] flex items-end"
            >
              {c}
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-slate-200 divide-y">
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
