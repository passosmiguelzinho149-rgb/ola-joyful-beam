import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  BellRing,
  ChevronRight,
  Fingerprint,
  History,
  KeyRound,
  Lock,
  LogOut,
  ShieldCheck,
  Smartphone,
  Unlock,
} from "lucide-react";
import { toast } from "sonner";
import { PhoneFrame, BlueHeader, BottomNav } from "@/components/app-shell";
import { getPin, setPin, useSecurity, useSession } from "@/lib/bank-store";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/app/seguranca")({
  component: Seguranca,
});

function Seguranca() {
  const navigate = useNavigate();
  const { logout } = useSession();
  const { bloqueado, doisFatores, biometria, setBloqueado, setDoisFatores, setBiometria } =
    useSecurity();

  const [pinOpen, setPinOpen] = useState(false);
  const [confirmBloqueio, setConfirmBloqueio] = useState(false);
  const [atual, setAtual] = useState("");
  const [novo, setNovo] = useState("");
  const [confirma, setConfirma] = useState("");

  function trocarPin() {
    if (atual !== getPin()) {
      toast.error("PIN atual incorreto");
      return;
    }
    if (novo.length < 4) {
      toast.error("O novo PIN precisa ter 4 dígitos");
      return;
    }
    if (novo !== confirma) {
      toast.error("A confirmação não confere com o novo PIN");
      return;
    }
    setPin(novo);
    setPinOpen(false);
    setAtual("");
    setNovo("");
    setConfirma("");
    toast.success("PIN alterado neste aparelho");
  }

  function alternarBloqueio() {
    setBloqueado(!bloqueado);
    setConfirmBloqueio(false);
    toast.success(bloqueado ? "Conta desbloqueada" : "Conta bloqueada");
  }

  function sair() {
    logout();
    toast.success("Sessão encerrada");
    navigate({ to: "/" });
  }

  return (
    <PhoneFrame>
      <BlueHeader title="Segurança" showBack />
      <div className="bg-slate-50 flex-1 px-4 py-4 space-y-4 overflow-y-auto">
        <div className="rounded-3xl border border-rose-100 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-semibold text-slate-800">
              {bloqueado ? (
                <Lock size={18} className="text-[#e11d48]" />
              ) : (
                <Unlock size={18} className="text-emerald-600" />
              )}
              Conta {bloqueado ? "bloqueada" : "ativa"}
            </div>
            <span
              className={`text-[11px] rounded-full px-2 py-0.5 font-semibold ${
                bloqueado ? "bg-rose-100 text-[#be123c]" : "bg-emerald-50 text-emerald-700"
              }`}
            >
              {bloqueado ? "Bloqueada" : "Ativa"}
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-2">
            Ao bloquear, o acesso pelo aplicativo e as transações ficam suspensos até o desbloqueio.
            Conta demonstrativa, dados fictícios.
          </p>
          <Button
            onClick={() => (bloqueado ? alternarBloqueio() : setConfirmBloqueio(true))}
            className="mt-3 w-full rounded-2xl bg-gradient-to-r from-[#e11d48] to-[#f43f5e] py-5 font-semibold gap-2"
          >
            {bloqueado ? <Unlock size={16} /> : <Lock size={16} />}
            {bloqueado ? "Desbloquear conta" : "Bloquear conta"}
          </Button>
        </div>

        <div className="rounded-3xl border border-rose-100 bg-white p-4 shadow-sm space-y-4">
          <h2 className="font-semibold text-slate-800 flex items-center gap-2">
            <ShieldCheck size={16} className="text-[#e11d48]" /> Proteção do acesso
          </h2>

          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-sm font-semibold text-slate-800">
                Autenticação em duas etapas
              </div>
              <p className="text-xs text-slate-600">
                Pede um código de 6 dígitos depois do PIN (demonstração: 4821).
              </p>
            </div>
            <Switch checked={doisFatores} onCheckedChange={setDoisFatores} />
          </div>

          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                <Fingerprint size={14} className="text-[#e11d48]" /> Biometria
              </div>
              <p className="text-xs text-slate-600">Entrada por digital simulada na tela de login.</p>
            </div>
            <Switch checked={biometria} onCheckedChange={setBiometria} />
          </div>
        </div>

        <div className="rounded-3xl border border-rose-100 bg-white p-4 shadow-sm">
          <button
            onClick={() => setPinOpen(true)}
            className="w-full flex items-center justify-between text-slate-800"
          >
            <span className="flex items-center gap-2 text-sm font-semibold">
              <KeyRound size={16} className="text-[#e11d48]" /> Trocar PIN de acesso
            </span>
            <ChevronRight size={16} className="text-slate-400" />
          </button>
        </div>

        <div className="rounded-3xl border border-rose-100 bg-white divide-y divide-slate-100 shadow-sm">
          <Link to="/app/dispositivos" className="flex items-center justify-between px-4 py-3">
            <span className="flex items-center gap-2 text-sm font-semibold text-slate-800">
              <Smartphone size={16} className="text-[#e11d48]" /> Dispositivos autorizados
            </span>
            <ChevronRight size={16} className="text-slate-400" />
          </Link>
          <Link to="/app/acessos" className="flex items-center justify-between px-4 py-3">
            <span className="flex items-center gap-2 text-sm font-semibold text-slate-800">
              <History size={16} className="text-[#e11d48]" /> Histórico de acessos
            </span>
            <ChevronRight size={16} className="text-slate-400" />
          </Link>
          <Link to="/app/notificacoes" className="flex items-center justify-between px-4 py-3">
            <span className="flex items-center gap-2 text-sm font-semibold text-slate-800">
              <BellRing size={16} className="text-[#e11d48]" /> Alertas de segurança
            </span>
            <ChevronRight size={16} className="text-slate-400" />
          </Link>
        </div>

        <Button
          onClick={sair}
          variant="outline"
          className="w-full rounded-2xl border-slate-200 py-5 font-semibold text-[#e11d48] gap-2"
        >
          <LogOut size={16} /> Sair da conta
        </Button>

        <p className="text-[11px] text-slate-400 text-center pb-2">
          Recursos de demonstração — nenhuma informação real é usada.
        </p>
      </div>

      <Dialog open={confirmBloqueio} onOpenChange={setConfirmBloqueio}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Bloquear a conta?</DialogTitle>
            <DialogDescription>
              Você poderá desbloquear depois informando o PIN ou o código de desbloqueio.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setConfirmBloqueio(false)}
              className="rounded-2xl"
            >
              Cancelar
            </Button>
            <Button
              onClick={alternarBloqueio}
              className="rounded-2xl bg-gradient-to-r from-[#e11d48] to-[#f43f5e]"
            >
              Bloquear
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={pinOpen} onOpenChange={setPinOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Trocar PIN</DialogTitle>
            <DialogDescription>
              O PIN é usado para entrar no aplicativo neste aparelho (demonstração).
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <Input
              inputMode="numeric"
              maxLength={4}
              placeholder="PIN atual"
              value={atual}
              onChange={(e) => setAtual(e.target.value.replace(/\D/g, ""))}
            />
            <Input
              inputMode="numeric"
              maxLength={4}
              placeholder="Novo PIN"
              value={novo}
              onChange={(e) => setNovo(e.target.value.replace(/\D/g, ""))}
            />
            <Input
              inputMode="numeric"
              maxLength={4}
              placeholder="Confirmar novo PIN"
              value={confirma}
              onChange={(e) => setConfirma(e.target.value.replace(/\D/g, ""))}
            />
          </div>
          <DialogFooter>
            <Button
              onClick={trocarPin}
              className="w-full rounded-2xl bg-gradient-to-r from-[#e11d48] to-[#f43f5e]"
            >
              Salvar novo PIN
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <BottomNav />
    </PhoneFrame>
  );
}
