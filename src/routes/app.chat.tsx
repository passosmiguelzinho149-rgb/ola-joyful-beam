import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Send, Phone, Video, MoreVertical } from "lucide-react";
import { PhoneFrame, BottomNav, DemoBanner } from "@/components/app-shell";

export const Route = createFileRoute("/app/chat")({
  component: Chat,
});

type Msg = { id: number; from: "me" | "them"; text: string; time: string };

const initial: Msg[] = [
  {
    id: 1,
    from: "them",
    text: "Olá, Cleiton! Sou a Ana, sua gerente digital. Como posso ajudar hoje?",
    time: "09:12",
  },
  {
    id: 2,
    from: "me",
    text: "Bom dia! Quero entender as linhas de crédito para a minha empresa.",
    time: "09:13",
  },
  {
    id: 3,
    from: "them",
    text: "Sua empresa tem pré-aprovação de R$ 250.000,00 em capital de giro. Quer que eu detalhe as condições?",
    time: "09:13",
  },
];

function clock() {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

function Chat() {
  const [msgs, setMsgs] = useState<Msg[]>(initial);
  const [text, setText] = useState("");

  function send() {
    const t = text.trim();
    if (!t) return;
    setMsgs((m) => [...m, { id: Date.now(), from: "me", text: t, time: clock() }]);
    setText("");
    window.setTimeout(() => {
      setMsgs((m) => [
        ...m,
        {
          id: Date.now() + 1,
          from: "them",
          text: "Anotado! Já estou verificando e te respondo em instantes.",
          time: clock(),
        },
      ]);
    }, 900);
  }

  return (
    <PhoneFrame>
      <DemoBanner />
      <div className="bg-[#cc092f] text-white px-4 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold">
            A
          </div>
          <div className="leading-tight">
            <div className="font-semibold">Ana · Agência Digital</div>
            <div className="text-[11px] opacity-80">online</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Video size={20} />
          <Phone size={18} />
          <MoreVertical size={20} />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-[#f7f7f8] px-3 py-4 space-y-2">
        {msgs.map((m) => (
          <div key={m.id} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[78%] rounded-xl px-3 py-2 text-sm shadow-sm ${
                m.from === "me" ? "bg-[#fff1f2] text-slate-800" : "bg-white text-slate-800"
              }`}
            >
              <p className="whitespace-pre-wrap">{m.text}</p>
              <div className="mt-1 text-right text-[10px] text-slate-500">{m.time}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white border-t border-slate-200 px-3 py-2 flex items-center gap-2 shrink-0">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") send();
          }}
          placeholder="Digite uma mensagem"
          aria-label="Mensagem"
          className="flex-1 rounded-full bg-white px-4 py-2 text-sm outline-none border border-slate-200"
        />
        <button
          type="button"
          onClick={send}
          aria-label="Enviar"
          className="w-10 h-10 rounded-full bg-[#cc092f] text-white flex items-center justify-center"
        >
          <Send size={18} />
        </button>
      </div>

      <BottomNav />
    </PhoneFrame>
  );
}
