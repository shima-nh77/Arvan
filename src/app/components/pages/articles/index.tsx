import { Table, Space, Tag } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { MainLayout } from "../../templates/mainLayout/mainLayout";
import { ActionDropdown } from "../../molecules/actionDropdown/actionDropdown";
import "../../../styles/paginationStyle.css";
import { ChevronLeftIcon, ChevronRightIcon } from "../../icons/icons";
import { useGetArticles } from "../../../../api/articles/articlesApis";

export const Articles = () => {
  const navigate = useNavigate();
  const { page } = useParams();
  const currentPage = parseInt(page || "1");
  const { data: allArticles, isLoading: articlesLoading } = useGetArticles();
  const totalArticles = allArticles?.articlesCount || 0;
  const pageSize = 5;

  const columns = [
    {
      title: "#",
      key: "index",
      width: 60,
      render: (_: any, __: any, index: number) => (
        <div className="w-8 h-8 rounded-md flex items-center justify-center bg-neutral-50 text-xs font-semibold">
          {(currentPage - 1) * pageSize + index + 1}
        </div>
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: 150,
    },
    {
      title: "Author",
      dataIndex: ["author", "username"],
      key: "author",
      width: 150,
    },
    {
      title: "Tags",
      dataIndex: "tagList",
      key: "tags",
      width: 200,
      render: (tags: string[]) => (
        <Space size={[0, 8]} wrap>
          {tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </Space>
      ),
    },
    {
      title: "Excerpt",
      dataIndex: "body",
      key: "excerpt",
      render: (text: string) => text?.slice(0, 20) + "...",
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      key: "created",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      key: "actions",
      render: (_: any, record: any) => {
        return (
          <ActionDropdown
            slug={record.slug}
            author={record?.author?.username}
          />
        );
      },
    },
  ];

  const itemRender = (
    _: number,
    type: "page" | "prev" | "next" | "jump-prev" | "jump-next",
    originalElement: React.ReactNode
  ) => {
    if (type === "prev") {
      return <ChevronLeftIcon width={24} height={24} fill="#4C4C4C" />;
    }
    if (type === "next") {
      return <ChevronRightIcon width={24} height={24} fill="#4C4C4C" />;
    }
    return originalElement;
  };

  return (
    <MainLayout className="pt-16 !bg-transparent">
      <div className="bg-white px-2 sm:px-6 rounded-md w-full overflow-x-auto">
        <p className="text-lg font-semibold py-9">All Posts</p>
        <Table
          columns={columns}
          dataSource={allArticles?.articles}
          rowKey="slug"
          loading={articlesLoading}
          pagination={{
            current: currentPage,
            total: totalArticles,
            pageSize: pageSize,
            onChange: (page) => navigate(`/articles/page/${page}`),
            showSizeChanger: false,
            showQuickJumper: false,
            showLessItems: false,
            showPrevNextJumpers: true,
            itemRender: itemRender,
          }}
        />
      </div>
    </MainLayout>
  );
};
