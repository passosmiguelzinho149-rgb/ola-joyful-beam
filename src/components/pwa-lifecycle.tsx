import { useEffect } from "react";
import { toast } from "sonner";

/**
 * PWA lifecycle component (no service worker).
 * Tracks install, online/offline and visibility events.
 */
export function PwaLifecycle() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const onInstalled = () => {
      try {
        localStorage.setItem("pwa-installed-at", String(Date.now()));
      } catch {
        /* empty */
      }
      toast.success("App instalado com sucesso!");
    };

    const onOnline = () => toast.success("Você está online novamente.");
    const onOffline = () => toast.warning("Você está offline.");

    const onVisibility = () => {
      if (document.visibilityState === "visible") {
        window.dispatchEvent(new CustomEvent("pwa:resume"));
      } else {
        window.dispatchEvent(new CustomEvent("pwa:pause"));
      }
    };

    const onDisplayModeChange = (e: MediaQueryListEvent) => {
      window.dispatchEvent(
        new CustomEvent("pwa:display-mode", {
          detail: { standalone: e.matches },
        }),
      );
    };

    window.addEventListener("appinstalled", onInstalled);
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);
    document.addEventListener("visibilitychange", onVisibility);

    const mql = window.matchMedia("(display-mode: standalone)");
    mql.addEventListener?.("change", onDisplayModeChange);

    return () => {
      window.removeEventListener("appinstalled", onInstalled);
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
      document.removeEventListener("visibilitychange", onVisibility);
      mql.removeEventListener?.("change", onDisplayModeChange);
    };
  }, []);

  return null;
}
