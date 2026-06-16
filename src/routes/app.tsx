import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useSession } from "@/lib/bank-store";

export const Route = createFileRoute("/app")({
  component: AppLayout,
});

function AppLayout() {
  const { logged } = useSession();
  const navigate = useNavigate();
  useEffect(() => {
    const t = setTimeout(() => {
      if (sessionStorage.getItem("banco_demo_session") !== "1") {
        navigate({ to: "/" });
      }
    }, 50);
    return () => clearTimeout(t);
  }, [logged, navigate]);
  return <Outlet />;
}
