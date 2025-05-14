import { Modal as AntModal } from "antd";
import { Button } from "../../atoms/button/button";
import { ModalProps } from "./modal.types";
import { TickCircleOutlineIcon, WarningIcon } from "../../icons/icons";

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
      title={
        <p className="text-base font-semibold text-neutral-200 border-b border-neutral-300 pb-4 px-6">
          {title}
        </p>
      }
      open={isOpen}
      onCancel={onCloseModal}
      footer={
        confirmModal
          ? [
              <Button
                key="cancel"
                onClick={onCloseModal}
                variant="outline"
                className="mr-4 !rounded-xl"
              >
                Cancel
              </Button>,
              <Button
                key="Confirm"
                onClick={onSubmitModal}
                variant="primary"
                className="!rounded-xl"
              >
                Confirm
              </Button>,
            ]
          : [
              <Button
                key="cancel"
                onClick={onCloseModal}
                variant="outline"
                className="mr-4 !rounded-xl"
              >
                Cancel
              </Button>,
              <Button
                key="Confirm"
                onClick={onSubmitModal}
                variant="danger"
                className="rounded-xl"
              >
                Delete
              </Button>,
            ]
      }
      width={width}
      centered
      className="[&_.ant-modal-content]:rounded-xl [&_.ant-modal-content]:px-0 [&_.ant-modal-content]:py-4 [&_.ant-modal-footer]:px-6
    "
    >
      <div className="flex flex-col justify-center items-center border-b border-neutral-300 pt-4 pb-6">
        {confirmModal ? (
          <div className="flex justify-center items-center h-14 w-14 rounded-full bg-green-50 mb-2">
            <TickCircleOutlineIcon width={24} height={24} fill="#17B24A" />
          </div>
        ) : (
          <div className="flex justify-center items-center h-14 w-14 rounded-full bg-red-400 mb-2">
            <WarningIcon width={24} height={24} fill="#D61E20" />
          </div>
        )}
        {children}
      </div>
    </AntModal>
  );
};
