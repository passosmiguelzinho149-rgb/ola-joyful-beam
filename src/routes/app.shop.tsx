import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Search, ShoppingCart, Plus, Minus, Package, BadgePercent } from "lucide-react";
import { PhoneFrame, BlueHeader, BottomNav } from "@/components/app-shell";
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
import { formatBRL } from "@/lib/bank-store";
import { toast } from "sonner";

export const Route = createFileRoute("/app/shop")({
  component: Shop,
});

type Produto = {
  id: string;
  nome: string;
  categoria: string;
  preco: number;
  cashback: number;
};

type Pedido = {
  id: string;
  itens: number;
  total: number;
  cashback: number;
  data: string;
};

const categorias = ["Todos", "Eletrônicos", "Casa", "Viagem", "Bem-estar", "Serviços"];

const produtos: Produto[] = [
  { id: "p1", nome: "Fone bluetooth NOVA Buds", categoria: "Eletrônicos", preco: 199.9, cashback: 5 },
  { id: "p2", nome: "Caixa de som portátil", categoria: "Eletrônicos", preco: 249.0, cashback: 4 },
  { id: "p3", nome: "Air fryer 4L", categoria: "Casa", preco: 379.9, cashback: 3 },
  { id: "p4", nome: "Jogo de panelas antiaderente", categoria: "Casa", preco: 289.0, cashback: 3 },
  { id: "p5", nome: "Mochila de viagem 40L", categoria: "Viagem", preco: 219.9, cashback: 6 },
  { id: "p6", nome: "Kit skincare facial", categoria: "Bem-estar", preco: 149.9, cashback: 8 },
  { id: "p7", nome: "Assinatura de streaming (3 meses)", categoria: "Serviços", preco: 89.9, cashback: 10 },
  { id: "p8", nome: "Seguro celular (mensal)", categoria: "Serviços", preco: 24.9, cashback: 2 },
];

const PEDIDOS_KEY = "novabank_pedidos";

function Shop() {
  const [busca, setBusca] = useState("");
  const [cat, setCat] = useState("Todos");
  const [carrinho, setCarrinho] = useState<Record<string, number>>({});
  const [carrinhoOpen, setCarrinhoOpen] = useState(false);
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(PEDIDOS_KEY);
      if (raw) setPedidos(JSON.parse(raw) as Pedido[]);
    } catch {
      setPedidos([]);
    }
  }, []);

  const filtrados = produtos.filter(
    (p) =>
      (cat === "Todos" || p.categoria === cat) &&
      p.nome.toLowerCase().includes(busca.trim().toLowerCase()),
  );

  const itens = Object.entries(carrinho)
    .map(([id, qtd]) => ({ produto: produtos.find((p) => p.id === id), qtd }))
    .filter((i): i is { produto: Produto; qtd: number } => Boolean(i.produto));

  const qtdTotal = itens.reduce((s, i) => s + i.qtd, 0);
  const total = itens.reduce((s, i) => s + i.produto.preco * i.qtd, 0);
  const cashback = itens.reduce(
    (s, i) => s + (i.produto.preco * i.produto.cashback) / 100 * i.qtd,
    0,
  );

  function adicionar(id: string) {
    setCarrinho((c) => ({ ...c, [id]: (c[id] ?? 0) + 1 }));
    toast.success("Produto adicionado ao carrinho");
  }

  function remover(id: string) {
    setCarrinho((c) => {
      const q = (c[id] ?? 0) - 1;
      const novo = { ...c };
      if (q <= 0) delete novo[id];
      else novo[id] = q;
      return novo;
    });
  }

  function finalizar() {
    if (itens.length === 0) {
      toast.error("Seu carrinho está vazio");
      return;
    }
    const pedido: Pedido = {
      id: `NV${Date.now().toString().slice(-6)}`,
      itens: qtdTotal,
      total,
      cashback,
      data: new Date().toLocaleDateString("pt-BR"),
    };
    const lista = [pedido, ...pedidos];
    setPedidos(lista);
    localStorage.setItem(PEDIDOS_KEY, JSON.stringify(lista));
    setCarrinho({});
    setCarrinhoOpen(false);
    toast.success(`Pedido ${pedido.id} registrado (demonstração)`);
  }

  return (
    <PhoneFrame>
      <BlueHeader />
      <div className="bg-white flex-1 px-4 py-4 overflow-y-auto">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-2xl font-bold text-slate-900">Shop NOVA</h1>
          <button
            onClick={() => setCarrinhoOpen(true)}
            className="relative rounded-full border border-rose-200 p-2 text-[#e11d48]"
            aria-label="Abrir carrinho"
          >
            <ShoppingCart size={18} />
            {qtdTotal > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-full bg-[#e11d48] text-white text-[10px] font-bold flex items-center justify-center">
                {qtdTotal}
              </span>
            )}
          </button>
        </div>

        <div className="relative mb-3">
          <Search size={16} className="absolute left-3 top-3.5 text-slate-400" />
          <Input
            placeholder="Buscar produtos"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="pl-9 rounded-2xl"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 mb-2">
          {categorias.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium border transition-colors ${
                cat === c
                  ? "bg-gradient-to-r from-[#e11d48] to-[#f43f5e] text-white border-transparent"
                  : "border-slate-200 text-slate-600"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3">
          {filtrados.map((p) => (
            <div key={p.id} className="rounded-3xl border border-rose-100 p-3 shadow-sm flex flex-col">
              <div className="w-full aspect-square rounded-2xl bg-rose-50 flex items-center justify-center text-[#e11d48]">
                <Package size={28} />
              </div>
              <div className="text-xs text-slate-500 mt-2">{p.categoria}</div>
              <div className="text-sm font-semibold text-slate-800 leading-tight">{p.nome}</div>
              <div className="mt-1 font-bold text-slate-900">{formatBRL(p.preco)}</div>
              <div className="flex items-center gap-1 text-[11px] text-emerald-700 mt-0.5">
                <BadgePercent size={12} /> {p.cashback}% de cashback
              </div>
              <Button
                onClick={() => adicionar(p.id)}
                className="mt-2 w-full rounded-2xl bg-gradient-to-r from-[#e11d48] to-[#f43f5e] hover:opacity-90 text-xs py-4"
              >
                Adicionar
              </Button>
            </div>
          ))}
        </div>

        {filtrados.length === 0 && (
          <p className="text-center text-sm text-slate-500 py-6">Nenhum produto encontrado.</p>
        )}

        <div className="mt-6">
          <h2 className="font-semibold text-slate-800 mb-2">Meus pedidos</h2>
          {pedidos.length === 0 ? (
            <p className="text-sm text-slate-500">Você ainda não fez pedidos nesta demonstração.</p>
          ) : (
            <div className="space-y-2">
              {pedidos.map((p) => (
                <div
                  key={p.id}
                  className="rounded-2xl border border-rose-100 p-3 flex items-center justify-between text-sm"
                >
                  <div>
                    <div className="font-semibold text-slate-800">Pedido {p.id}</div>
                    <div className="text-xs text-slate-500">
                      {p.itens} item(ns) — {p.data}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-slate-900">{formatBRL(p.total)}</div>
                    <div className="text-[11px] text-emerald-700">
                      +{formatBRL(p.cashback)} cashback
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Dialog open={carrinhoOpen} onOpenChange={setCarrinhoOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Seu carrinho</DialogTitle>
            <DialogDescription>Compra fictícia — nenhum valor é cobrado.</DialogDescription>
          </DialogHeader>
          {itens.length === 0 ? (
            <p className="text-sm text-slate-500">Carrinho vazio.</p>
          ) : (
            <div className="space-y-3">
              {itens.map((i) => (
                <div key={i.produto.id} className="flex items-center justify-between gap-2 text-sm">
                  <span className="flex-1 text-slate-700">{i.produto.nome}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => remover(i.produto.id)}
                      className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center"
                      aria-label="Diminuir"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="w-5 text-center">{i.qtd}</span>
                    <button
                      onClick={() => adicionar(i.produto.id)}
                      className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center"
                      aria-label="Aumentar"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                  <span className="w-20 text-right font-medium">
                    {formatBRL(i.produto.preco * i.qtd)}
                  </span>
                </div>
              ))}
              <div className="border-t border-rose-100 pt-3 text-sm space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">Total</span>
                  <span className="font-bold text-slate-900">{formatBRL(total)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Cashback</span>
                  <span className="font-semibold text-emerald-700">{formatBRL(cashback)}</span>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              onClick={finalizar}
              disabled={itens.length === 0}
              className="w-full rounded-2xl bg-gradient-to-r from-[#e11d48] to-[#f43f5e]"
            >
              Finalizar pedido
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <BottomNav />
    </PhoneFrame>
  );
}
