import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Lock, Camera, User, RotateCw, Menu, HelpCircle } from "lucide-react";
import { PhoneFrame, DemoBanner } from "@/components/app-shell";
import { useSession, usePhoto } from "@/lib/bank-store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bradesco — Login" },
      { name: "description", content: "App bancário fictício de demonstração." },
    ],
  }),
  component: Login,
});

// CPF: 061.151.571-70 — exibimos os 3 dígitos do meio
const CPF_MIDDLE = "151";

function Login() {
  const navigate = useNavigate();
  const { logged, login } = useSession();
  const { photo, setPhoto } = usePhoto();
  const [showPwd, setShowPwd] = useState(false);
  const [senha, setSenha] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    if (logged) navigate({ to: "/app" });
  }, [logged, navigate]);

  function onAccess() {
    if (!showPwd) {
      setShowPwd(true);
      return;
    }
    if (senha.length < 4) return setErr("Senha deve ter ao menos 4 dígitos.");
    login();
    navigate({ to: "/app" });
  }

  function onPhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => setPhoto(String(r.result));
    r.readAsDataURL(f);
  }

  return (
    <PhoneFrame>
      <DemoBanner />
      <div className="bg-gradient-to-b from-[#1a2a8a] via-[#5b1a8a] to-[#cc092f] text-white px-6 pt-6 pb-28 relative flex-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#cc092f] text-sm font-extrabold">
              B
            </div>
            <div className="leading-tight">
              <div className="text-base font-bold tracking-wide">bradesco</div>
              <div className="text-[11px] opacity-90">empresas e negócios</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <HelpCircle size={20} />
            <Menu size={22} />
          </div>
        </div>

        <h1 className="mt-10 text-2xl font-bold leading-tight">
          Uma nova experiência<br />para o seu negócio
        </h1>
      </div>

      <div className="-mt-20 mx-4 bg-white rounded-2xl shadow-xl p-5 z-10 relative">
        <div className="flex items-center justify-between text-slate-800">
          <div className="flex items-center gap-3">
            <label className="cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden flex items-center justify-center border border-slate-200">
                {photo ? (
                  <img src={photo} alt="foto" className="w-full h-full object-cover" />
                ) : (
                  <User size={18} className="text-slate-400" />
                )}
              </div>
              <input type="file" accept="image/*" onChange={onPhoto} className="hidden" />
            </label>
            <div className="font-medium tracking-wide text-[15px]">
              CPF <span className="mx-1">•••</span> {CPF_MIDDLE}{" "}
              <span className="mx-1">•••</span>
            </div>
          </div>
          <button className="flex items-center gap-1 text-[#1a2a8a] text-sm font-medium">
            Remover <RotateCw size={14} />
          </button>
        </div>

        {showPwd && (
          <div className="mt-4">
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite sua senha"
              autoFocus
              className="w-full border-b border-slate-300 py-2 outline-none focus:border-[#cc092f] text-slate-900"
            />
          </div>
        )}

        {err && <p className="text-xs text-red-600 mt-2">{err}</p>}

        <button
          onClick={onAccess}
          className="w-full bg-[#3b2bb0] hover:bg-[#2f2390] text-white font-semibold py-3 rounded-md mt-4"
        >
          Acessar conta
        </button>
      </div>

      <div className="p-4 mt-auto">
        <button className="w-full border border-slate-300 text-slate-700 rounded-md py-3 flex items-center justify-center gap-2 text-sm">
          <Lock size={16} /> Chave de segurança
        </button>
      </div>
    </PhoneFrame>
  );
}
