import { createContext, useCallback, useContext, useState, type ReactNode } from "react";

interface ToastContextValue {
  showToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  const showToast = useCallback((msg: string) => {
    setMessage(msg);
    setVisible(true);
    window.setTimeout(() => setVisible(false), 3500);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        className={`fixed left-1/2 bottom-8 z-[100] -translate-x-1/2 rounded bg-dark px-5 py-3.5 text-sm text-white shadow-2xl transition-all duration-300 ${
          visible ? "opacity-100 translate-y-0" : "pointer-events-none translate-y-3 opacity-0"
        }`}
        role="status"
      >
        {message}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
