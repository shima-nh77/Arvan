import { Form, Tag } from "antd";
import { MainLayout } from "../../templates/mainLayout/mainLayout";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "../../atoms/input/input";
import { Button } from "../../atoms/button/button";
import { Checkbox } from "../../atoms/checkbox/checkbox";
import { showToast } from "../../../../utility/toast";
import { Modal } from "../../templates/modal/modal";

interface ArticleForm {
  title: string;
  description: string;
  body: string;
  tagList: string[];
}

export const CreateEditArticle = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm<ArticleForm>();
  const [tags, setTags] = useState<string[]>([]);
  const [inputTag, setInputTag] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [availableTags] = useState([
    "Tag 1",
    "Tag 2",
    "Tag 3",
    "Tag 4",
    "Tag 5",
    "Tag 6",
    "Tag 7",
    "Tag 8",
    "Tag 9",
    "Tag 10",
  ]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputTag.trim()) {
      e.preventDefault();
      if (!tags.includes(inputTag.trim())) {
        setTags((prev) => [...prev, inputTag.trim()]);
        setInputTag("");
      }
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const onFinish = (values: ArticleForm) => {
    const payload = {
      ...values,
      tagList: tags,
    };
    console.log(payload);
    // Handle API call here
  };

  return (
    <MainLayout className="">
      <div className="flex flex-row w-full">
        <div className="bg-white px-6 py-9 rounded-lg w-3/4 m-6">
          <p className="text-lg font-semibold mb-9">
            {slug ? "Edit Article" : "New Article"}
          </p>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            className="w-full"
          >
            <Input
              placeholder="Title"
              className="h-10cw-full"
              containerClassName="mb-6"
              label="Title"
              name="title"
              required
            />

            <Input
              placeholder="Description"
              className="h-10"
              label="Description"
              name="description"
              containerClassName="mb-6"
              required
            />

            <Input
              containerClassName="mb-6"
              type="textarea"
              className="min-h-[200px]"
              required
              name="body"
              label="Body"
            />

            <div className="flex justify-start">
              <Button type="submit" variant="primary">
                submit
              </Button>
            </div>
          </Form>
        </div>
        <div className="bg-white w-1/4 m-6 p-6 rounded-lg h-fit">
          <p className="text-sm text-neutral-200 mb-2">Tags</p>
          <Input
            containerClassName="mb-4 !rounded-xl"
            placeholder="New Tag"
            value={inputTag}
            onChange={(e) => setInputTag(e.target.value)}
            onKeyDown={handleKeyDown}
            onClick={() =>
              //   showToast.error({
              //     title: "failed",
              //     description: "Operation completed successfully",
              //   })
              setIsModalOpen(true)
            }
          />
          <div className="flex flex-col gap-y-2 border border-neutral-100 rounded-md p-4">
            {availableTags.map((tag) => (
              <Checkbox
                key={tag}
                label={tag}
                checked={selectedTags.includes(tag)}
                onChange={() => handleTagToggle(tag)}
              />
            ))}
          </div>
        </div>
      </div>
      {/* <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Confirmation"
        onOk={() => setIsModalOpen(false)}
        okText="Confirm"
        cancelText="Cancel"
      >
        <p>Are you sure you want to proceed?</p>
      </Modal> */}
    </MainLayout>
  );
};
