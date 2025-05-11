import { Button } from "../../atoms/button/button";
import { Dropdown } from "antd";
import { MoreIcon } from "../../icons/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type ActionDropdownProps = {
  slug: string;
};

export const ActionDropdown = ({ slug }: ActionDropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <Dropdown
      menu={{
        items: [
          {
            key: "edit",
            label: "Edit",
            onClick: () => navigate(`/articles/${slug}/edit`),
          },
          {
            key: "delete",
            label: "Delete",
            onClick: () => console.log("Delete", slug),
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
  );
};
