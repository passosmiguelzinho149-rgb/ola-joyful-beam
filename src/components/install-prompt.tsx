import { useEffect, useState } from "react";
import { Download, Share, Plus, X } from "lucide-react";

type BIPEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const DISMISS_KEY = "pwa-install-dismissed-at";
const DISMISS_DAYS = 7;

function isStandalone() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    // iOS
    (window.navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}

function isIOS() {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  return /iPhone|iPad|iPod/i.test(ua) && !/CriOS|FxiOS|EdgiOS/i.test(ua);
}

function recentlyDismissed() {
  try {
    const v = localStorage.getItem(DISMISS_KEY);
    if (!v) return false;
    const days = (Date.now() - Number(v)) / (1000 * 60 * 60 * 24);
    return days < DISMISS_DAYS;
  } catch {
    return false;
  }
}

export function InstallPrompt() {
  const [deferred, setDeferred] = useState<BIPEvent | null>(null);
  const [open, setOpen] = useState(false);
  const [showIOS, setShowIOS] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (isStandalone() || recentlyDismissed()) return;

    const onBIP = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BIPEvent);
      setOpen(true);
    };
    window.addEventListener("beforeinstallprompt", onBIP);

    if (isIOS()) {
      const t = setTimeout(() => setShowIOS(true), 1500);
      return () => {
        clearTimeout(t);
        window.removeEventListener("beforeinstallprompt", onBIP);
      };
    }

    return () => window.removeEventListener("beforeinstallprompt", onBIP);
  }, []);

  function dismiss() {
    try {
      localStorage.setItem(DISMISS_KEY, String(Date.now()));
    } catch {
      /* empty */
    }
    setOpen(false);
    setShowIOS(false);
  }

  async function install() {
    if (!deferred) return;
    await deferred.prompt();
    await deferred.userChoice;
    setDeferred(null);
    setOpen(false);
  }

  if (!open && !showIOS) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] p-3 pointer-events-none">
      <div className="pointer-events-auto mx-auto max-w-md rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden">
        <div className="bg-gradient-to-r from-[#1a2a8a] to-[#cc092f] text-white px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/icons/icon-192.png" alt="" width={28} height={28} className="rounded-md" />
            <div className="text-sm font-semibold">Instalar Bradesco</div>
          </div>
          <button onClick={dismiss} aria-label="Fechar" className="p-1">
            <X size={18} />
          </button>
        </div>
        <div className="p-4 text-sm text-slate-700">
          {open && deferred && (
            <>
              <p>Instale o app na tela inicial para uma experiência mais rápida e fluida.</p>
              <div className="mt-3 flex gap-2 justify-end">
                <button onClick={dismiss} className="px-3 py-2 text-slate-600 text-sm">
                  Agora não
                </button>
                <button
                  onClick={install}
                  className="inline-flex items-center gap-2 bg-[#1a2a8a] hover:bg-[#142073] text-white font-semibold rounded-md px-4 py-2"
                >
                  <Download size={16} /> Instalar
                </button>
              </div>
            </>
          )}
          {showIOS && !open && (
            <>
              <p className="font-medium text-slate-800">Adicione à Tela de Início</p>
              <ol className="mt-2 space-y-1 list-decimal pl-5 text-slate-700">
                <li className="flex items-center gap-1">
                  Toque em <Share size={14} className="inline text-[#1a2a8a]" /> compartilhar
                  no Safari
                </li>
                <li className="flex items-center gap-1">
                  Escolha <b>Adicionar à Tela de Início</b> <Plus size={14} className="inline" />
                </li>
                <li>
                  Confirme em <b>Adicionar</b>.
                </li>
              </ol>
              <div className="mt-3 flex justify-end">
                <button onClick={dismiss} className="text-sm text-slate-600 px-3 py-1">
                  Entendi
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
