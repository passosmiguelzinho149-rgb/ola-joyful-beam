import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  Copy,
  Star,
  Building2,
  QrCode,
  DollarSign,
  FileText,
  SlidersHorizontal,
  KeyRound,
  Hand,
  Bell,
  ArrowRight,
} from "lucide-react";
import { PhoneFrame, BlueHeader, BottomNav, DemoBanner } from "@/components/app-shell";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formatBRL, registrarSaida } from "@/lib/bank-store";
import { toast } from "sonner";

export const Route = createFileRoute("/app/pix")({
  component: Pix,
});

function Pix() {
  const navigate = useNavigate();
  const [sendOpen, setSendOpen] = useState(false);
  const [pixKey, setPixKey] = useState("");
  const [amount, setAmount] = useState("");
  const [step, setStep] = useState<"form" | "confirm">("form");

  const openSend = (prefill = "") => {
    setPixKey(prefill);
    setAmount("");
    setStep("form");
    setSendOpen(true);
  };

  const proceed = () => {
    if (!pixKey.trim()) {
      toast.error("Informe a chave Pix");
      return;
    }
    const v = parseFloat(amount.replace(",", "."));
    if (!v || v <= 0) {
      toast.error("Informe um valor válido");
      return;
    }
    setStep("confirm");
  };

  const confirmSend = () => {
    const v = parseFloat(amount.replace(",", "."));
    if (v > 132_000_000) {
      toast.error("Saldo insuficiente para esta demonstração");
      return;
    }
    const tx = registrarSaida({
      descricao: "Pix enviado",
      valor: v,
      destinatario: pixKey,
      chave: pixKey,
    });
    setSendOpen(false);
    toast.success("Pix demonstrativo realizado com sucesso");
    setTimeout(() => navigate({ to: "/app/comprovante/$id", params: { id: tx.id } }), 500);
  };

  const sub = [
    { label: "Pix Copia e Cola", icon: Copy, onClick: () => openSend() },
    {
      label: "Ler um QR Code",
      icon: QrCode,
      onClick: () => toast.info("Câmera indisponível na demo"),
    },
    {
      label: "Receber por QR Code",
      icon: DollarSign,
      onClick: () => toast.info("QR de recebimento gerado"),
    },
  ];

  const more = [
    { label: "Extrato Pix", icon: FileText, onClick: () => navigate({ to: "/app/extrato" }) },
    {
      label: "Limites Pix",
      icon: SlidersHorizontal,
      onClick: () => toast.info("Limite: R$ 100.000.000,00"),
    },
    { label: "Chaves Pix", icon: KeyRound, onClick: () => toast.info("CNPJ 63.031.988/0001-76") },
    { label: "Gerenciar contatos", icon: Star, onClick: () => toast.info("Em breve") },
    { label: "Contestações", icon: Hand, onClick: () => toast.info("Nenhuma contestação") },
    { label: "Notificações Pix", icon: Bell, onClick: () => navigate({ to: "/app/notificacoes" }) },
  ];

  return (
    <PhoneFrame>
      <DemoBanner />
      <BlueHeader title="Pix" showBack />
      <div className="bg-[#cc092f] text-white px-4 pb-6">
        <h1 className="text-xl font-bold">Pix para sua empresa</h1>
        <p className="text-sm mt-1">Como você quer transferir?</p>
      </div>
      <div className="bg-white flex-1 px-4 py-4 space-y-4 -mt-3">
        <button
          onClick={() => openSend()}
          className="w-full rounded-xl border border-slate-200 p-3 bg-white shadow-sm text-left hover:bg-slate-50 transition"
        >
          <div className="flex items-center justify-between">
            <span className="text-slate-700">Digitar ou colar nome/chave</span>
            <ArrowRight size={16} className="text-[#cc092f]" />
          </div>
          <div className="mt-2 w-full text-sm border-t border-slate-200 pt-2 text-slate-400">
            Pode ser o nome do contato ou uma chave Pix
          </div>
        </button>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => openSend()}
            className="rounded-xl border border-slate-200 p-3 flex items-start gap-2 hover:bg-slate-50 transition text-left"
          >
            <Star className="text-[#cc092f]" size={20} />
            <span className="text-sm">Escolher um contato</span>
          </button>
          <button
            onClick={() => openSend()}
            className="rounded-xl border border-slate-200 p-3 flex items-start gap-2 hover:bg-slate-50 transition text-left"
          >
            <Building2 className="text-[#cc092f]" size={20} />
            <span className="text-sm">Digitar agência e conta</span>
          </button>
        </div>

        <div>
          <h3 className="font-semibold text-slate-800 mb-2">Transferir, pagar e receber</h3>
          <div className="grid grid-cols-3 gap-3">
            {sub.map((s) => {
              const I = s.icon;
              return (
                <button
                  key={s.label}
                  onClick={s.onClick}
                  className="rounded-xl border border-slate-200 p-3 text-center hover:bg-slate-50 transition"
                >
                  <I className="text-[#cc092f] mx-auto" size={22} />
                  <div className="text-[11px] mt-2 text-slate-700">{s.label}</div>
                </button>
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
                <button
                  key={m.label}
                  onClick={m.onClick}
                  className="rounded-xl border border-slate-200 p-3 flex items-center gap-2 hover:bg-slate-50 transition text-left"
                >
                  <I className="text-[#cc092f]" size={18} />
                  <span className="text-sm text-slate-700">{m.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <Dialog open={sendOpen} onOpenChange={setSendOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>{step === "form" ? "Enviar Pix" : "Confirmar envio"}</DialogTitle>
            <DialogDescription>
              {step === "form"
                ? "Informe a chave Pix do destinatário e o valor."
                : "Revise os dados antes de confirmar."}
            </DialogDescription>
          </DialogHeader>

          {step === "form" ? (
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-slate-600">Chave Pix</label>
                <Input
                  placeholder="CPF, CNPJ, e-mail, celular ou chave aleatória"
                  value={pixKey}
                  onChange={(e) => setPixKey(e.target.value)}
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-600">Valor (R$)</label>
                <Input
                  inputMode="decimal"
                  placeholder="0,00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>
          ) : (
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Chave</span>
                <span className="font-medium">{pixKey}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Valor</span>
                <span className="font-bold text-[#cc092f]">
                  {formatBRL(parseFloat(amount.replace(",", ".")) || 0)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Data</span>
                <span>Hoje</span>
              </div>
            </div>
          )}

          <DialogFooter>
            {step === "form" ? (
              <Button onClick={proceed} className="w-full bg-[#cc092f] hover:bg-[#a30725]">
                Continuar
              </Button>
            ) : (
              <div className="flex gap-2 w-full">
                <Button variant="outline" className="flex-1" onClick={() => setStep("form")}>
                  Voltar
                </Button>
                <Button className="flex-1 bg-[#cc092f] hover:bg-[#a30725]" onClick={confirmSend}>
                  Confirmar
                </Button>
              </div>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <BottomNav />
    </PhoneFrame>
  );
}
