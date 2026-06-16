import { useEffect, useState } from "react";

export type Transaction = {
  id: string;
  date: string; // dd/mm/yyyy
  description: string;
  type: "in" | "out";
  amount: number;
  origin?: string;
};

const HOLDER = "CLEITON OLIVEIRA DOS PASSOS";
const COMPANY = "63.031.988 CLEITON OLIVEIRA DOS PASSOS";
const CNPJ = "63.031.988/0001-76";
const AGENCY = "2700";
const ACCOUNT = "3574-2";
const BALANCE = 132_000_000;

export const bankInfo = {
  holder: HOLDER,
  company: COMPANY,
  cnpj: CNPJ,
  agency: AGENCY,
  account: ACCOUNT,
  balance: BALANCE,
};

export const transactions: Transaction[] = [
  {
    id: "t3",
    date: "18/06/2026",
    description: "Pix recebido",
    origin: "MARCOS NUNES DE MIRANDA - CNPJ 44.529.644/0001-47",
    type: "in",
    amount: 52_625_000,
  },
  {
    id: "t2",
    date: "16/06/2026",
    description: "Pix recebido",
    origin: "MARCOS NUNES DE MIRANDA - CNPJ 44.529.644/0001-47",
    type: "in",
    amount: 52_625_000,
  },
  {
    id: "t1",
    date: "11/06/2026",
    description: "Pix recebido",
    origin: "MARCOS NUNES DE MIRANDA - CNPJ 44.529.644/0001-47",
    type: "in",
    amount: 26_750_000,
  },
];

export function formatBRL(n: number) {
  return n.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
}

const SESSION_KEY = "banco_demo_session";
const PHOTO_KEY = "banco_demo_photo";
let activeSession = false;

function readSession() {
  return activeSession;
}

export function useSession() {
  const [logged, setLogged] = useState<boolean>(false);
  useEffect(() => {
    setLogged(readSession());
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
