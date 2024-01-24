import { toast } from "react-toastify";

export const toastMessage = (message: string, type: "info" | "success" | "warn" | "error") => {
  toast[type](message, {
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};
