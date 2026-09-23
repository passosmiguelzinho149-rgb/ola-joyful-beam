import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Delete, Fingerprint, KeyRound, ShieldCheck, UserPlus } from "lucide-react";
import { PhoneFrame } from "@/components/app-shell";
import { bankInfo, getPin, setPin, useSession } from "@/lib/bank-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NOVABANK — Acesso" },
      { name: "description", content: "Protótipo bancário NOVABANK com dados 100% fictícios." },
    ],
  }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const { login } = useSession();
  const [pin, setPinValue] = useState("");
  const [err, setErr] = useState("");
  const [bioOpen, setBioOpen] = useState(false);
  const [recOpen, setRecOpen] = useState(false);
  const [recStep, setRecStep] = useState<1 | 2 | 3>(1);
  const [recDoc, setRecDoc] = useState("");
  const [recPin, setRecPin] = useState("");
  const [cadOpen, setCadOpen] = useState(false);
  const [cad, setCad] = useState({ nome: "", cpf: "", email: "", pin: "" });

  function concluir(mensagem: string) {
    login();
    toast.success(mensagem);
    navigate({ to: "/app" });
  }

  function digitar(d: string) {
    setErr("");
    setPinValue((p) => (p + d).slice(0, 4));
  }

  function entrar() {
    if (pin.length < 4) {
      setErr("Digite os 4 dígitos do seu PIN.");
      return;
    }
    if (pin !== getPin()) {
      setPinValue("");
      setErr("PIN incorreto. Tente novamente.");
      return;
    }
    concluir("Bem-vinda de volta!");
  }

  function recuperar() {
    if (recDoc.trim().length < 5) {
      toast.error("Informe o CPF ou e-mail cadastrado");
      return;
    }
    setRecStep(2);
  }

  function salvarNovoPin() {
    if (recPin.length < 4) {
      toast.error("O novo PIN precisa ter 4 dígitos");
      return;
    }
    setPin(recPin);
    setRecOpen(false);
    setRecStep(1);
    setRecDoc("");
    setRecPin("");
    toast.success("PIN redefinido neste aparelho");
  }

  function criarConta() {
    if (!cad.nome.trim() || cad.cpf.trim().length < 8 || cad.pin.length < 4) {
      toast.error("Preencha nome, CPF e um PIN de 4 dígitos");
      return;
    }
    setPin(cad.pin);
    setCadOpen(false);
    setCad({ nome: "", cpf: "", email: "", pin: "" });
    concluir("Conta demonstrativa criada");
  }

  const teclas = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

  return (
    <PhoneFrame>
      <div className="bg-gradient-to-b from-[#e11d48] via-[#f43f5e] to-[#fda4af] text-white px-6 pt-8 pb-24 relative">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#e11d48] text-base font-extrabold">
            N
          </div>
          <div className="leading-tight">
            <div className="text-lg font-bold tracking-wide">NOVABANK</div>
            <div className="text-[11px] opacity-90">protótipo com dados fictícios</div>
          </div>
        </div>
        <h1 className="mt-10 text-2xl font-bold leading-tight">
          Seu banco digital,
          <br />
          simples e rápido.
        </h1>
      </div>

      <div className="-mt-16 mx-4 bg-white rounded-3xl shadow-xl p-5 z-10 relative space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-500">Acesso demonstrativo</div>
            <div className="font-semibold text-slate-900">{bankInfo.holder}</div>
            <div className="text-xs text-slate-500">Ag. {bankInfo.agency} — Conta {bankInfo.account}</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center text-[#e11d48]">
            <ShieldCheck size={18} />
          </div>
        </div>

        <div className="flex justify-center gap-3 py-1">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className={`w-3.5 h-3.5 rounded-full border ${
                pin.length > i ? "bg-[#e11d48] border-[#e11d48]" : "bg-white border-slate-300"
              }`}
            />
          ))}
        </div>

        {err && <p className="text-xs text-center text-[#e11d48]">{err}</p>}

        <div className="grid grid-cols-3 gap-2">
          {teclas.map((t) => (
            <button
              key={t}
              onClick={() => digitar(t)}
              className="rounded-2xl border border-slate-200 py-3 text-lg font-semibold text-slate-800 active:bg-rose-50"
            >
              {t}
            </button>
          ))}
          <button
            onClick={() => setBioOpen(true)}
            className="rounded-2xl border border-slate-200 py-3 flex items-center justify-center text-[#e11d48]"
            aria-label="Biometria"
          >
            <Fingerprint size={20} />
          </button>
          <button
            onClick={() => digitar("0")}
            className="rounded-2xl border border-slate-200 py-3 text-lg font-semibold text-slate-800 active:bg-rose-50"
          >
            0
          </button>
          <button
            onClick={() => setPinValue((p) => p.slice(0, -1))}
            className="rounded-2xl border border-slate-200 py-3 flex items-center justify-center text-slate-600"
            aria-label="Apagar"
          >
            <Delete size={20} />
          </button>
        </div>

        <Button
          onClick={entrar}
          className="w-full rounded-2xl bg-gradient-to-r from-[#e11d48] to-[#f43f5e] hover:opacity-90 py-6 text-base font-semibold"
        >
          Entrar
        </Button>

        <p className="text-[11px] text-center text-slate-400">PIN inicial da demonstração: 2468</p>
      </div>

      <div className="p-4 mt-auto space-y-2">
        <button
          onClick={() => {
            setRecStep(1);
            setRecOpen(true);
          }}
          className="w-full rounded-2xl border border-slate-200 py-3 flex items-center justify-center gap-2 text-sm font-semibold text-slate-700"
        >
          <KeyRound size={16} /> Recuperar acesso
        </button>
        <button
          onClick={() => setCadOpen(true)}
          className="w-full rounded-2xl border border-slate-200 py-3 flex items-center justify-center gap-2 text-sm font-semibold text-slate-700"
        >
          <UserPlus size={16} /> Criar conta demonstrativa
        </button>
      </div>

      <Dialog open={bioOpen} onOpenChange={setBioOpen}>
        <DialogContent className="max-w-sm text-center">
          <DialogHeader>
            <DialogTitle>Biometria simulada</DialogTitle>
            <DialogDescription>Nenhum dado real do seu aparelho é usado.</DialogDescription>
          </DialogHeader>
          <button
            onClick={() => {
              setBioOpen(false);
              concluir("Biometria reconhecida");
            }}
            className="mx-auto w-24 h-24 rounded-full bg-rose-50 flex items-center justify-center text-[#e11d48] animate-pulse"
            aria-label="Confirmar biometria"
          >
            <Fingerprint size={44} />
          </button>
          <p className="text-xs text-slate-500">Toque no ícone para simular a leitura.</p>
        </DialogContent>
      </Dialog>

      <Dialog
        open={recOpen}
        onOpenChange={(o) => {
          setRecOpen(o);
          if (!o) setRecStep(1);
        }}
      >
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Recuperar acesso</DialogTitle>
            <DialogDescription>
              {recStep === 1
                ? "Informe o CPF ou e-mail cadastrado na conta demonstrativa."
                : "Use o código demonstrativo para definir um novo PIN."}
            </DialogDescription>
          </DialogHeader>
          {recStep === 1 ? (
            <div className="space-y-3">
              <Input
                placeholder="CPF ou e-mail"
                value={recDoc}
                onChange={(e) => setRecDoc(e.target.value)}
              />
            </div>
          ) : (
            <div className="space-y-3">
              <div className="rounded-2xl bg-rose-50 p-3 text-sm text-slate-700">
                Código demonstrativo: <b>4821</b>
              </div>
              <Input
                inputMode="numeric"
                maxLength={4}
                placeholder="Novo PIN de 4 dígitos"
                value={recPin}
                onChange={(e) => setRecPin(e.target.value.replace(/\D/g, ""))}
              />
            </div>
          )}
          <DialogFooter>
            {recStep === 1 ? (
              <Button
                onClick={recuperar}
                className="w-full rounded-2xl bg-gradient-to-r from-[#e11d48] to-[#f43f5e]"
              >
                Enviar código
              </Button>
            ) : (
              <Button
                onClick={salvarNovoPin}
                className="w-full rounded-2xl bg-gradient-to-r from-[#e11d48] to-[#f43f5e]"
              >
                Salvar novo PIN
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={cadOpen} onOpenChange={setCadOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Criar conta demonstrativa</DialogTitle>
            <DialogDescription>
              Dados fictícios. Nada é enviado para nenhum banco de verdade.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <Input
              placeholder="Nome completo"
              value={cad.nome}
              onChange={(e) => setCad({ ...cad, nome: e.target.value })}
            />
            <Input
              placeholder="CPF (fictício)"
              value={cad.cpf}
              onChange={(e) => setCad({ ...cad, cpf: e.target.value })}
            />
            <Input
              placeholder="E-mail"
              value={cad.email}
              onChange={(e) => setCad({ ...cad, email: e.target.value })}
            />
            <Input
              inputMode="numeric"
              maxLength={4}
              placeholder="PIN de 4 dígitos"
              value={cad.pin}
              onChange={(e) => setCad({ ...cad, pin: e.target.value.replace(/\D/g, "") })}
            />
          </div>
          <DialogFooter>
            <Button
              onClick={criarConta}
              className="w-full rounded-2xl bg-gradient-to-r from-[#e11d48] to-[#f43f5e]"
            >
              Criar e entrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PhoneFrame>
  );
}
