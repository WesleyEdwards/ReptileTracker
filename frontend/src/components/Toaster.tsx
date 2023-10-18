import { Alert, Snackbar } from "@mui/material";
import { createContext, useContext, useState } from "react";

export const useToast = () => {
  const { showToast } = useContext(ToastContext);
  return showToast;
};

const ToastContext = createContext({
  showToast: {} as (message: string, status: "success" | "error") => void,
});

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [toastInfo, setToastInfo] = useState<{
    message: string;
    status: "success" | "error";
  }>();

  const handleClose = () => setOpen(false);

  return (
    <ToastContext.Provider
      value={{
        showToast: (message: string, status: "success" | "error") => {
          setOpen(true);
          setToastInfo({ message, status });
        },
      }}
    >
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {toastInfo?.message}
        </Alert>
      </Snackbar>
      {children}
    </ToastContext.Provider>
  );
};
