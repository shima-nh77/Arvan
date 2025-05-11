import { Modal as AntModal } from "antd";
import { Button } from "../../atoms/button/button";
import { ModalProps } from "./modal.types";

export const Modal = ({
  isOpen,
  onCloseModal,
  title,
  children,
  onSubmitModal,
  width = 400,
  confirmModal = true,
}: ModalProps) => {
  return (
    <AntModal
      title={<p className="text-base font-semibold text-neutral-200">{title}</p>}
      open={isOpen}
      onCancel={onCloseModal}
      footer={
        confirmModal
          ? [
              <Button key="cancel" onClick={onCloseModal} variant="outline">
                Cancel
              </Button>,
              <Button key="Confirm" onClick={onSubmitModal} variant="primary">
                Confirm
              </Button>,
            ]
          : [
              <Button key="cancel" onClick={onCloseModal} variant="outline">
                Cancel
              </Button>,
              <Button key="Confirm" onClick={onSubmitModal} variant="danger">
                Delete
              </Button>,
            ]
      }
      width={width}
      centered
      className="[&_.ant-modal-content]:rounded-xl [&_.ant-modal-header]:pb-4 [&_.ant-modal-body]:py-6"
    >
      {children}
    </AntModal>
  );
};
