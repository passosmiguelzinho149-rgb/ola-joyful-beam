import { useEffect, useState } from "react";

export type Transaction = {
  id: string;
  date: string; // dd/mm/yyyy
  description: string;
  type: "in" | "out";
  amount: number;
  origin?: string;
};

const HOLDER = "MARIANA COSTA ALMEIDA";
const COMPANY = "NOVABANK — conta digital demonstrativa";
const CNPJ = "12.345.678/0001-90";
const AGENCY = "0001";
const ACCOUNT = "12345-6";
const BALANCE = 13_240.75;

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
    description: "Pix recebido",
    origin: "MARCOS NUNES DE MIRANDA",
    type: "in",
    amount: 3_250.0,
  },
  {
    id: "t3",
    date: "17/06/2026",
    description: "Pagamento de boleto",
    origin: "Concessionária de energia (fictícia)",
    type: "out",
    amount: 289.9,
  },
  {
    id: "t2",
    date: "16/06/2026",
    description: "Pix enviado",
    origin: "JULIANA PEREIRA LIMA",
    type: "out",
    amount: 450.0,
  },
  {
    id: "t1",
    date: "11/06/2026",
    description: "Depósito",
    origin: "Depósito em conta",
    type: "in",
    amount: 2_000.0,
  },
];

export function formatBRL(n: number) {
  return n.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
}

const PHOTO_KEY = "novabank_photo";
const PIN_KEY = "novabank_pin";
const PIN_PADRAO = "2468";
let activeSession = false;

export function getPin(): string {
  if (typeof window === "undefined") return PIN_PADRAO;
  return localStorage.getItem(PIN_KEY) ?? PIN_PADRAO;
}

export function setPin(pin: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(PIN_KEY, pin);
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
