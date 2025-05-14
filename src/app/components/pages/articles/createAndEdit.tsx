import { Form, Input as antInput } from "antd";
import { MainLayout } from "../../templates/mainLayout/mainLayout";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Input } from "../../atoms/input/input";
import { Button } from "../../atoms/button/button";
import { Checkbox } from "../../atoms/checkbox/checkbox";
import { showToast } from "../../../../utility/toast";
import {
  useCreateArticle,
  useEditArticle,
  useGetArticlesByAuthor,
} from "../../../../api/articles/articlesApis";
import { useGetTags } from "../../../../api/tag/tagApis";

interface ArticleForm {
  title: string;
  description: string;
  body: string;
  tagList: string[];
}

export const CreateEditArticle = () => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [form] = Form.useForm<ArticleForm>();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [inputTag, setInputTag] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const { data: allTags } = useGetTags();
  const author = searchParams.get("author");
  const { mutate: mutateEditArticle, isPending: pendingEditArticle } =
    useEditArticle();
  const { mutate: mutateCreateArticle, isPending: pendingCreateArticle } =
    useCreateArticle();
  const { data: articleData } = useGetArticlesByAuthor(author || "");

  const handleTagSelect = (tag: string, checked: boolean) => {
    if (checked) {
      setSelectedTags((prev) => [...prev, tag]);
    } else {
      setSelectedTags((prev) => prev.filter((t) => t !== tag));
    }
  };

  const handleOnSubmit = (values: ArticleForm) => {
    if (slug) {
      mutateEditArticle(
        {
          slug: slug!,
          data: {
            body: values.body,
          },
        },
        {
          onSuccess: () => {
            showToast.success({
              title: "Well done",
              description: "Article updated successfully",
            });
            navigate("/articles");
          },
          onError: () => {
            showToast.error({
              title: "Error",
              description: "Failed to update article",
            });
          },
        }
      );
    } else {
      mutateCreateArticle(
        {
          title: values.title,
          description: values.description,
          body: values.body,
          tagList: [...tags, ...selectedTags],
        },
        {
          onSuccess: () => {
            showToast.success({
              title: "Well done",
              description: "Article created successfuly",
            });
            navigate("/articles");
          },
          onError: () => {
            showToast.error({
              title: "Error",
              description: "Failed to create article",
            });
          },
        }
      );
    }
  };

  useEffect(() => {
    if (articleData) {
      form.setFieldsValue({
        title: articleData?.articles?.[0]?.title,
        description: articleData?.articles?.[0]?.description,
        body: articleData?.articles?.[0]?.body,
      });
      if (articleData?.articles?.[0]?.tagList) {
        setSelectedTags(articleData.articles[0].tagList);
      }
    }
  }, [articleData]);

  return (
    <MainLayout className="pt-16 !bg-transparent">
      <div className="flex flex-row w-full">
        <div className="bg-white px-6 py-9 rounded-lg w-3/4 mx-6 ">
          <p className="text-lg font-semibold mb-9">
            {slug ? "Edit Article" : "New Article"}
          </p>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleOnSubmit}
            requiredMark={false}
            className="w-full"
          >
            <Form.Item
              name="title"
              label="Title"
              rules={[{ required: true, message: "Title is required" }]}
              className="mb-3"
              validateStatus={form.getFieldError("title").length > 0 ? "error" : ""}
            >
              <Input
                placeholder="Title"
                className={`h-10 w-full ${form.getFieldError("title").length > 0 ? "!border-red-100" : ""}`}
                containerClassName="mb-2"
              />
            </Form.Item>

            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: "Description is required" }]}
              className="mb-3"
              validateStatus={form.getFieldError("description").length > 0 ? "error" : ""}
            >
              <Input
                placeholder="Description"
                className={`h-10 ${form.getFieldError("description").length > 0 ? "!border-red-100" : ""}`}
                containerClassName="mb-2"
              />
            </Form.Item>

            <Form.Item
              name="body"
              label="Body"
              rules={[{ required: true, message: "Body is required" }]}
              className="mb-3"
              validateStatus={form.getFieldError("body").length > 0 ? "error" : ""}
            >
              <antInput.TextArea 
                className={`!min-h-48 mb-2 !border-neutral-100 ${form.getFieldError("body").length > 0 ? "!border-red-100" : ""}`}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="submit"
                variant="primary"
                isDisabled={pendingEditArticle || pendingCreateArticle}
                isLoading={pendingEditArticle || pendingCreateArticle}
              >
                {slug ? "Update" : "Submit"}
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="bg-white w-full lg:w-1/4 px-4 sm:px-6 py-6 rounded-lg h-fit">
          <p className="text-sm text-neutral-200 mb-2">Tags</p>
          <Input
            containerClassName="mb-4"
            placeholder="New Tag"
            value={inputTag}
            onChange={(e) => setInputTag(e.target.value)}
          />
          <div className="flex flex-col gap-y-2 border border-neutral-100 rounded-md p-4 max-h-[300px] overflow-y-auto">
            {allTags?.tags?.map((tag: string) => (
              <Checkbox
                key={tag}
                label={tag}
                checked={selectedTags.includes(tag)}
                onChange={(checked: boolean) => handleTagSelect(tag, checked)}
              />
            ))}
          </div>
          {tags?.length > 0 && (
            <div className="mt-4">
              <p className="text-sm text-neutral-200 mb-2">Custom Tags</p>
              <div className="flex flex-wrap gap-2">
                {tags?.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-blue-50 text-teal-100 rounded-md text-sm cursor-pointer"
                    onClick={() =>
                      setTags((prev) => prev.filter((t) => t !== tag))
                    }
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};
