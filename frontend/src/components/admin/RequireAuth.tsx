import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../../api/client";

export default function RequireAuth({ children }: { children: ReactNode }) {
  if (!isLoggedIn()) {
    return <Navigate to="/admin/login" replace />;
  }
  return <>{children}</>;
}
