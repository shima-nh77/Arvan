import { Button } from "../../atoms/button/button";
import { Dropdown } from "antd";
import { MoreIcon } from "../../icons/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "../../templates/modal/modal";
import { useDeleteArticle } from "../../../../api/articles/articlesApis";
import { showToast } from "../../../../utility/toast";

type ActionDropdownProps = {
  slug: string;
  author: string;
};

export const ActionDropdown = ({ slug, author }: ActionDropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { mutate: deleteArticle } = useDeleteArticle();

  const handleSubmitDelete = () => {
    deleteArticle(slug, {
      onSuccess: () => {
        setIsModalOpen(false);
        showToast.success({
          description: "Article deleted successfuly",
        });
      },
      onError: () => {
        showToast.error({
          title: "Error!",
          description: "Failed to delete article",
        });
      },
    });
  };

  return (
    <>
      <Dropdown
        menu={{
          items: [
            {
              key: "edit",
              label: "Edit",
              onClick: () => navigate(`/articles/${slug}?author=${author}`),
            },
            {
              key: "delete",
              label: "Delete",
              onClick: () => setIsModalOpen(true),
            },
          ],
          className: "w-36",
        }}
        trigger={["click"]}
        placement="bottomRight"
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <Button
          className={`h-10 w-10 ${
            isOpen ? "!border-neutral-300" : "border-neutral-100"
          }`}
          variant="outline"
        >
          <div className="flex justify-center items-center">
            <MoreIcon width={24} height={24} fill="#4C4C4C" />
          </div>
        </Button>
      </Dropdown>
      <Modal
        isOpen={isModalOpen}
        onCloseModal={() => setIsModalOpen(false)}
        title="Delete Article"
        onSubmitModal={handleSubmitDelete}
        confirmModal={false}
      >
        <p>Are you sure you want to delete this article?</p>
      </Modal>
    </>
  );
};
