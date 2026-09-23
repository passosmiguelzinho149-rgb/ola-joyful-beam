import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Info, ChevronDown, ChevronUp } from "lucide-react";
import { PhoneFrame, BlueHeader, BottomNav, DemoBanner } from "@/components/app-shell";

export const Route = createFileRoute("/app/linhas-credito")({
  component: Linhas,
});

const lines = [
  { title: "Capital de giro", text: "Recursos para o dia a dia da sua empresa." },
  { title: "Cheque empresarial", text: "Limite extra na conta para imprevistos." },
  { title: "Microcrédito", text: "Crédito para pequenos negócios começarem." },
];

function Linhas() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <PhoneFrame>
      <DemoBanner />
      <BlueHeader title="Linhas de Crédito" showBack />
      <div className="bg-[#cc092f] text-white px-4 pb-8">
        <h1 className="text-2xl font-bold">Crédito para empresa</h1>
      </div>
      <div className="bg-white flex-1 px-4 py-4 -mt-4 space-y-4">
        <div className="rounded-xl bg-white border border-slate-200 shadow-sm p-4">
          <div className="flex items-start gap-2">
            <Info className="text-[#cc092f]" size={18} />
            <div>
              <div className="font-semibold text-slate-800">Procura por uma linha de crédito?</div>
              <p className="text-sm text-slate-600 mt-1">
                Confira com nossa Agência Digital se há opções para sua empresa — das 8h às 20h, em
                dias úteis, horário de Brasília.
              </p>
              <button className="text-[#cc092f] font-semibold text-sm mt-2">
                Falar com Agência Digital
              </button>
            </div>
          </div>
        </div>

        <h2 className="font-semibold text-slate-800">Saiba mais sobre as linhas de crédito</h2>
        <div className="divide-y border-y">
          {lines.map((l) => (
            <button
              key={l.title}
              onClick={() => setOpen(open === l.title ? null : l.title)}
              className="w-full py-3 text-left"
            >
              <div className="flex justify-between items-center">
                <span className="text-slate-800">{l.title}</span>
                {open === l.title ? (
                  <ChevronUp size={18} className="text-[#cc092f]" />
                ) : (
                  <ChevronDown size={18} className="text-[#cc092f]" />
                )}
              </div>
              {open === l.title && <p className="text-sm text-slate-600 mt-2">{l.text}</p>}
            </button>
          ))}
        </div>
      </div>
      <BottomNav />
    </PhoneFrame>
  );
}
