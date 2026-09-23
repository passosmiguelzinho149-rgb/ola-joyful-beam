import { useEffect, useState } from "react";

export type Transaction = {
  id: string;
  date: string; // dd/mm/yyyy
  time: string; // HH:mm
  description: string;
  type: "in" | "out";
  amount: number;
  origin?: string;
  documento?: string;
  instituicao?: string;
  agencia?: string;
  conta?: string;
  tipoChave?: string;
  chave?: string;
  mensagem?: string;
  canal: string;
  endToEndId: string;
  autenticacao: string;
  saldoApos: number;
};

const HOLDER = "CLEITON OLIVEIRA DOS PASSOS";
const COMPANY = "NOVABANK — conta digital demonstrativa";
const CNPJ = "12.345.678/0001-90";
const AGENCY = "2700";
const ACCOUNT = "3574-2";
const BALANCE = 132_000_000.0;

export const bankInfo = {
  bankName: "NOVABANK",
  holder: HOLDER,
  company: COMPANY,
  cnpj: CNPJ,
  agency: AGENCY,
  account: ACCOUNT,
  balance: BALANCE,
};

export const transactions: Transaction[] = [
  {
    id: "t4",
    date: "18/06/2026",
    time: "10:32",
    description: "Pix recebido",
    type: "in",
    amount: 52_625_000.0,
    origin: "MARCOS NUNES DE MIRANDA",
    documento: "44.529.644/0001-47",
    instituicao: "ITAÚ UNIBANCO S.A.",
    agencia: "0001",
    conta: "12345-6",
    tipoChave: "CNPJ",
    chave: "44.529.644/0001-47",
    mensagem: "Pix QR Code estático",
    canal: "Aplicativo NOVABANK",
    endToEndId: "E60746948202606181032AB12CD34EF5",
    autenticacao: "34A7C1.9B02D4.7E1188.A5C3F0",
    saldoApos: 132_000_000.0,
  },
  {
    id: "t3",
    date: "16/06/2026",
    time: "14:08",
    description: "Pix recebido",
    type: "in",
    amount: 52_625_000.0,
    origin: "MARCOS NUNES DE MIRANDA",
    documento: "44.529.644/0001-47",
    instituicao: "ITAÚ UNIBANCO S.A.",
    agencia: "0001",
    conta: "12345-6",
    tipoChave: "CNPJ",
    chave: "44.529.644/0001-47",
    mensagem: "Pix QR Code estático",
    canal: "Aplicativo NOVABANK",
    endToEndId: "E60746948202606161408GH56IJ78KL9",
    autenticacao: "6D18B2.C4E907.1A2B3C.778899",
    saldoApos: 79_375_000.0,
  },
  {
    id: "t2",
    date: "11/06/2026",
    time: "09:15",
    description: "Pix recebido",
    type: "in",
    amount: 26_750_000.0,
    origin: "JULIANA PEREIRA LIMA",
    documento: "123.456.789-09",
    instituicao: "BANCO DO BRASIL S.A.",
    agencia: "3344",
    conta: "7788-1",
    tipoChave: "CPF",
    chave: "123.456.789-09",
    mensagem: "Pix QR Code estático",
    canal: "Aplicativo NOVABANK",
    endToEndId: "E60746948202606110915MN12OP34QR5",
    autenticacao: "0F9E4A.B3C2D1.556677.9E0A1B",
    saldoApos: 26_750_000.0,
  },
  {
    id: "t1",
    date: "05/06/2026",
    time: "16:42",
    description: "Pix enviado",
    type: "out",
    amount: 450.0,
    origin: "JULIANA PEREIRA LIMA",
    documento: "123.456.789-09",
    instituicao: "BANCO DO BRASIL S.A.",
    agencia: "3344",
    conta: "7788-1",
    tipoChave: "CPF",
    chave: "123.456.789-09",
    mensagem: "Pagamento de serviço (demonstração)",
    canal: "Aplicativo NOVABANK",
    endToEndId: "E60746948202606051642ST56UV78WX9",
    autenticacao: "C7D8E9.F01A2B.3C4D5E.6F7081",
    saldoApos: 26_750_450.0,
  },
];

export function formatBRL(n: number) {
  return n.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
}

export type Dispositivo = {
  id: string;
  nome: string;
  modelo: string;
  local: string;
  ultimoAcesso: string;
  atual?: boolean;
};

export const dispositivos: Dispositivo[] = [
  {
    id: "disp-1",
    nome: "Galaxy S23",
    modelo: "Android 14",
    local: "São Paulo/SP",
    ultimoAcesso: "18/06/2026 às 10:32",
    atual: true,
  },
  {
    id: "disp-2",
    nome: "iPhone 13",
    modelo: "iOS 17",
    local: "Rio de Janeiro/RJ",
    ultimoAcesso: "12/06/2026 às 19:04",
  },
  {
    id: "disp-3",
    nome: "Chrome — Windows 11",
    modelo: "Navegador web",
    local: "Osasco/SP",
    ultimoAcesso: "02/06/2026 às 08:47",
  },
];

export type Acesso = {
  id: string;
  data: string;
  dispositivo: string;
  local: string;
  ip: string;
  status: "sucesso" | "falha";
};

export const acessos: Acesso[] = [
  {
    id: "ac-1",
    data: "18/06/2026 às 10:32",
    dispositivo: "Galaxy S23",
    local: "São Paulo/SP",
    ip: "200.145.10.4",
    status: "sucesso",
  },
  {
    id: "ac-2",
    data: "16/06/2026 às 14:05",
    dispositivo: "Galaxy S23",
    local: "São Paulo/SP",
    ip: "200.145.10.4",
    status: "sucesso",
  },
  {
    id: "ac-3",
    data: "14/06/2026 às 22:18",
    dispositivo: "Aparelho não reconhecido",
    local: "Curitiba/PR",
    ip: "177.92.44.201",
    status: "falha",
  },
  {
    id: "ac-4",
    data: "12/06/2026 às 19:04",
    dispositivo: "iPhone 13",
    local: "Rio de Janeiro/RJ",
    ip: "189.4.88.17",
    status: "sucesso",
  },
  {
    id: "ac-5",
    data: "02/06/2026 às 08:47",
    dispositivo: "Chrome — Windows 11",
    local: "Osasco/SP",
    ip: "201.17.120.9",
    status: "sucesso",
  },
];

export type Notificacao = {
  id: string;
  tipo: "transacao" | "seguranca" | "oferta";
  titulo: string;
  mensagem: string;
  data: string;
};

export const notificacoes: Notificacao[] = [
  {
    id: "n1",
    tipo: "transacao",
    titulo: "Pix recebido",
    mensagem: "R$ 52.625.000,00 de MARCOS NUNES DE MIRANDA",
    data: "18/06/2026 às 10:32",
  },
  {
    id: "n2",
    tipo: "seguranca",
    titulo: "Tentativa de acesso bloqueada",
    mensagem: "Login não concluído em Curitiba/PR. Se não foi você, bloqueie a conta.",
    data: "14/06/2026 às 22:18",
  },
  {
    id: "n3",
    tipo: "oferta",
    titulo: "Crédito pré-aprovado",
    mensagem: "Simule até R$ 25.000,00 com taxa demonstrativa.",
    data: "13/06/2026 às 09:00",
  },
];

const PHOTO_KEY = "novabank_photo";
const PIN_KEY = "novabank_pin";
const PIN_PADRAO = "2468";
const NOTIF_KEY = "novabank_notificacoes_lidas";
let activeSession = false;

export function getPin(): string {
  if (typeof window === "undefined") return PIN_PADRAO;
  return localStorage.getItem(PIN_KEY) ?? PIN_PADRAO;
}

export function setPin(pin: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(PIN_KEY, pin);
}

export function codigoDemo() {
  return "4821";
}

export function hasActiveSession() {
  return activeSession;
}

export function useSession() {
  const [logged, setLogged] = useState<boolean>(false);
  useEffect(() => {
    setLogged(activeSession);
  }, []);
  return {
    logged,
    login: () => {
      activeSession = true;
      setLogged(true);
    },
    logout: () => {
      activeSession = false;
      setLogged(false);
    },
  };
}

export function usePhoto() {
  const [photo, setPhoto] = useState<string | null>(null);
  useEffect(() => {
    setPhoto(localStorage.getItem(PHOTO_KEY));
  }, []);
  return {
    photo,
    setPhoto: (data: string | null) => {
      if (data) localStorage.setItem(PHOTO_KEY, data);
      else localStorage.removeItem(PHOTO_KEY);
      setPhoto(data);
    },
  };
}

const BLOQUEIO_KEY = "novabank_conta_bloqueada";
const DOIS_FATORES_KEY = "novabank_dois_fatores";
const BIOMETRIA_KEY = "novabank_biometria";

function lerFlag(key: string, padrao: boolean) {
  if (typeof window === "undefined") return padrao;
  const valor = localStorage.getItem(key);
  return valor === null ? padrao : valor === "1";
}

function gravarFlag(key: string, valor: boolean) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, valor ? "1" : "0");
}

export function useSecurity() {
  const [bloqueado, setBloqueadoState] = useState(false);
  const [doisFatores, setDoisFatoresState] = useState(true);
  const [biometria, setBiometriaState] = useState(true);

  useEffect(() => {
    setBloqueadoState(lerFlag(BLOQUEIO_KEY, false));
    setDoisFatoresState(lerFlag(DOIS_FATORES_KEY, true));
    setBiometriaState(lerFlag(BIOMETRIA_KEY, true));
  }, []);

  return {
    bloqueado,
    doisFatores,
    biometria,
    setBloqueado: (v: boolean) => {
      gravarFlag(BLOQUEIO_KEY, v);
      setBloqueadoState(v);
    },
    setDoisFatores: (v: boolean) => {
      gravarFlag(DOIS_FATORES_KEY, v);
      setDoisFatoresState(v);
    },
    setBiometria: (v: boolean) => {
      gravarFlag(BIOMETRIA_KEY, v);
      setBiometriaState(v);
    },
  };
}

export function useNotificacoes() {
  const [lidas, setLidas] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = localStorage.getItem(NOTIF_KEY);
    if (!raw) return;
    try {
      setLidas(JSON.parse(raw) as string[]);
    } catch {
      setLidas([]);
    }
  }, []);

  function gravar(ids: string[]) {
    setLidas(ids);
    if (typeof window !== "undefined") localStorage.setItem(NOTIF_KEY, JSON.stringify(ids));
  }

  return {
    lista: notificacoes.map((n) => ({ ...n, lida: lidas.includes(n.id) })),
    naoLidas: notificacoes.filter((n) => !lidas.includes(n.id)),
    marcarLida: (id: string) =>
      gravar(lidas.includes(id) ? lidas.filter((x) => x !== id) : [...lidas, id]),
    marcarTodas: () => gravar(notificacoes.map((n) => n.id)),
  };
}
