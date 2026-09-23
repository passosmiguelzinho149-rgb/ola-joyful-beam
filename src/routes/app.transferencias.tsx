import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Building2, CheckCircle2, ChevronRight, UserRound } from "lucide-react";
import { PhoneFrame, BottomNav, DemoBanner } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatBRL, registrarSaida } from "@/lib/bank-store";
import { toast } from "sonner";

export const Route = createFileRoute("/app/transferencias")({ component: Transferencias });

type Step = "dados" | "valor" | "confirmacao";

function Transferencias() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("dados");
  const [nome, setNome] = useState("");
  const [banco, setBanco] = useState("");
  const [agencia, setAgencia] = useState("");
  const [conta, setConta] = useState("");
  const [valor, setValor] = useState("");
  const [descricao, setDescricao] = useState("");

  const continuarDados = () => {
    if (!nome.trim() || !banco.trim() || !agencia.trim() || !conta.trim()) {
      toast.error("Preencha nome, banco, agência e conta");
      return;
    }
    setStep("valor");
  };

  const continuarValor = () => {
    const v = Number(valor.replace(".", "").replace(",", "."));
    if (!v || v <= 0) {
      toast.error("Informe um valor válido");
      return;
    }
    if (v > 132_000_000) {
      toast.error("Saldo insuficiente para esta demonstração");
      return;
    }
    setStep("confirmacao");
  };

  const confirmar = () => {
    const v = Number(valor.replace(".", "").replace(",", "."));
    const tx = registrarSaida({
      descricao: descricao.trim() || "Transferência bancária",
      valor: v,
      destinatario: nome,
      instituicao: banco,
      agencia,
      conta,
    });
    toast.success("Transferência demonstrativa realizada");
    navigate({ to: "/app/comprovante/$id", params: { id: tx.id } });
  };

  return (
    <PhoneFrame>
      <DemoBanner />
      <div className="bg-[#cc092f] text-white px-4 pt-3 pb-5 flex items-center gap-3">
        <button onClick={() => navigate({ to: "/app" })} className="p-1" aria-label="Voltar"><ArrowLeft size={22} /></button>
        <div>
          <div className="text-lg font-semibold">Transferências</div>
          <div className="text-xs opacity-85">Operação demonstrativa</div>
        </div>
      </div>

      <div className="bg-[#f7f7f8] flex-1 overflow-y-auto px-4 py-4">
        <div className="flex items-center gap-2 mb-4">
          {(["dados", "valor", "confirmacao"] as Step[]).map((s, i) => (
            <div key={s} className={`h-1.5 flex-1 rounded-full ${(["dados","valor","confirmacao"].indexOf(step) >= i) ? "bg-[#cc092f]" : "bg-slate-200"}`} />
          ))}
        </div>

        {step === "dados" && (
          <section className="rounded-2xl bg-white border border-rose-100 shadow-sm p-4 space-y-4">
            <div>
              <h1 className="text-lg font-bold text-slate-800">Para quem você quer transferir?</h1>
              <p className="text-xs text-slate-500 mt-1">Informe os dados da conta de destino.</p>
            </div>
            <div className="rounded-2xl bg-[#fff1f2] p-3 flex items-center gap-3">
              <UserRound className="text-[#cc092f]" size={20} />
              <span className="text-xs text-[#9f1239]">Confira os dados antes de confirmar.</span>
            </div>
            <Field label="Nome do favorecido" value={nome} setValue={setNome} placeholder="Nome completo ou empresa" />
            <Field label="Banco" value={banco} setValue={setBanco} placeholder="Banco de destino" icon={<Building2 size={16} />} />
            <div className="grid grid-cols-2 gap-3">
              <Field label="Agência" value={agencia} setValue={setAgencia} placeholder="0001" />
              <Field label="Conta" value={conta} setValue={setConta} placeholder="00000-0" />
            </div>
            <Button onClick={continuarDados} className="w-full bg-[#cc092f] hover:bg-[#a30725]">Continuar <ChevronRight size={17} /></Button>
          </section>
        )}

        {step === "valor" && (
          <section className="rounded-2xl bg-white border border-rose-100 shadow-sm p-4 space-y-4">
            <div>
              <h1 className="text-lg font-bold text-slate-800">Quanto você quer transferir?</h1>
              <p className="text-xs text-slate-500 mt-1">Destino: {nome}</p>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600">Valor (R$)</label>
              <Input autoFocus inputMode="decimal" value={valor} onChange={e => setValor(e.target.value)} placeholder="0,00" className="mt-1 text-xl h-12" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600">Descrição (opcional)</label>
              <Input value={descricao} onChange={e => setDescricao(e.target.value)} placeholder="Ex.: pagamento de fornecedor" className="mt-1" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setStep("dados")}>Voltar</Button>
              <Button className="flex-1 bg-[#cc092f] hover:bg-[#a30725]" onClick={continuarValor}>Continuar</Button>
            </div>
          </section>
        )}

        {step === "confirmacao" && (
          <section className="rounded-2xl bg-white border border-rose-100 shadow-sm p-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-[#fff1f2] p-2"><CheckCircle2 className="text-[#cc092f]" size={24} /></div>
              <div><h1 className="font-bold text-slate-800">Confirme a transferência</h1><p className="text-xs text-slate-500">Revise os dados.</p></div>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4 space-y-2 text-sm">
              <Row label="Favorecido" value={nome} />
              <Row label="Banco" value={banco} />
              <Row label="Agência" value={agencia} />
              <Row label="Conta" value={conta} />
              <Row label="Valor" value={formatBRL(Number(valor.replace(".", "").replace(",", ".")) || 0)} strong />
              {descricao && <Row label="Descrição" value={descricao} />}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setStep("valor")}>Voltar</Button>
              <Button className="flex-1 bg-[#cc092f] hover:bg-[#a30725]" onClick={confirmar}>Confirmar</Button>
            </div>
          </section>
        )}
      </div>
      <BottomNav />
    </PhoneFrame>
  );
}

function Field({label,value,setValue,placeholder,icon}:{label:string;value:string;setValue:(v:string)=>void;placeholder:string;icon?:React.ReactNode}) {
  return <div><label className="text-xs font-semibold text-slate-600">{label}</label><div className="relative mt-1">{icon && <span className="absolute left-3 top-3 text-slate-400">{icon}</span>}<Input className={icon ? "pl-9" : ""} value={value} onChange={e=>setValue(e.target.value)} placeholder={placeholder}/></div></div>;
}
function Row({label,value,strong}:{label:string;value:string;strong?:boolean}) {
  return <div className="flex justify-between gap-3"><span className="text-slate-500">{label}</span><span className={`text-right ${strong ? "font-bold text-[#cc092f]" : "font-medium text-slate-800"}`}>{value}</span></div>;
}
