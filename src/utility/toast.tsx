import { toast, ToastOptions } from "react-toastify";

interface ToastMessage {
  title: string;
  description: string;
}

const toastConfig: ToastOptions = {
  position: "top-center",
  autoClose: 10000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  icon: false,
  closeButton: false,
};

export const showToast = {
  success: ({ title, description }: ToastMessage) =>
    toast.success(
      <div>
        <span className="toast-title">{title}</span>
        <span className="toast-description toast-description--success">
          {description}
        </span>
      </div>,
      toastConfig
    ),
  error: ({ title, description }: ToastMessage) =>
    toast.error(
      <div>
        <span className="toast-title toast-title--error">{title}</span>
        <span className="toast-description toast-description--error">
          {description}
        </span>
      </div>,
      toastConfig
    ),
};
