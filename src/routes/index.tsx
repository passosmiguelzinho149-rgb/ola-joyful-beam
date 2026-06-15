import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Lock, Camera, User } from "lucide-react";
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

function Login() {
  const navigate = useNavigate();
  const { logged, login } = useSession();
  const { photo, setPhoto } = usePhoto();
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    if (logged) navigate({ to: "/app" });
  }, [logged, navigate]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const clean = cpf.replace(/\D/g, "");
    if (clean.length < 11) return setErr("Informe um CPF válido (11 dígitos).");
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
      <div className="bg-gradient-to-b from-[#cc092f] via-[#a8092a] to-[#6b0a25] text-white px-6 pt-8 pb-24 relative">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#cc092f] text-base font-extrabold">
            B
          </div>
          <div className="leading-tight">
            <div className="text-base font-bold tracking-wide">Bradesco</div>
            <div className="text-[11px] opacity-80">empresas e negócios</div>
          </div>
        </div>
        <h1 className="mt-12 text-2xl font-bold leading-tight">
          Uma nova experiência<br />para o seu negócio
        </h1>
      </div>

      <div className="-mt-16 mx-4 bg-white rounded-2xl shadow-xl p-5 z-10 relative">
        <form onSubmit={onSubmit} className="space-y-3">
          <label className="block">
            <span className="text-xs text-slate-600">CPF</span>
            <input
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              inputMode="numeric"
              placeholder="000.000.000-00"
              className="mt-1 w-full border-b border-slate-300 py-2 outline-none focus:border-[#cc092f] text-slate-900"
            />
          </label>
          <label className="block">
            <span className="text-xs text-slate-600">Senha</span>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="••••••"
              className="mt-1 w-full border-b border-slate-300 py-2 outline-none focus:border-[#cc092f] text-slate-900"
            />
          </label>

          <div className="flex items-center gap-3 pt-2">
            <label className="cursor-pointer flex items-center gap-2 text-sm text-[#cc092f]">
              <div className="w-12 h-12 rounded-full bg-slate-100 overflow-hidden flex items-center justify-center border border-slate-200">
                {photo ? (
                  <img src={photo} alt="foto" className="w-full h-full object-cover" />
                ) : (
                  <User size={22} className="text-slate-400" />
                )}
              </div>
              <span className="flex items-center gap-1">
                <Camera size={14} /> {photo ? "Trocar foto" : "Adicionar foto"}
              </span>
              <input type="file" accept="image/*" onChange={onPhoto} className="hidden" />
            </label>
          </div>

          {err && <p className="text-xs text-red-600">{err}</p>}

          <button
            type="submit"
            className="w-full bg-[#cc092f] text-white font-semibold py-3 rounded-md mt-2"
          >
            Acessar conta
          </button>
        </form>
      </div>

      <div className="flex-1" />

      <div className="p-4">
        <button className="w-full border border-slate-300 text-slate-700 rounded-md py-3 flex items-center justify-center gap-2 text-sm">
          <Lock size={16} /> Chave de segurança
        </button>
      </div>
    </PhoneFrame>
  );
}
