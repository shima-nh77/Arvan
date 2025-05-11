import { ReactNode } from "react";

export type ModalProps = {
  isOpen: boolean;
  onCloseModal: () => void;
  title: string;
  children: ReactNode;
  onSubmitModal?: () => void;
  width?: number;
  confirmModal?: boolean;
};
