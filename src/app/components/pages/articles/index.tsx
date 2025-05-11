import { Table, Space, Tag } from "antd";
import { useGetArticles } from "../../../../api/generated/articles/articles";
import { useNavigate, useParams } from "react-router-dom";
import { MainLayout } from "../../templates/mainLayout/mainLayout";
import { ActionDropdown } from "../../molecules/actionDropdown/actionDropdown";
import "../../../styles/paginationStyle.css";
import { ChevronLeftIcon, ChevronRightIcon } from "../../icons/icons";

export const Articles = () => {
  const navigate = useNavigate();
  const { page } = useParams();
  const currentPage = parseInt(page || "1");
  const mockData = [
    {
      slug: "how-to-train-your-dragon",
      title: "How to train your dragon",
      body: "Ever wonder how to train your dragon? This comprehensive guide covers everything from feeding to flight training...",
      author: { username: "john_doe" },
      tagList: ["dragons", "training", "pets"],
      createdAt: "2024-05-09T10:00:00.000Z",
    },
    {
      slug: "react-best-practices",
      title: "React Best Practices 2024",
      body: "A deep dive into React best practices for 2024. Learn about hooks, performance optimization, and state management...",
      author: { username: "react_guru" },
      tagList: ["react", "javascript", "frontend"],
      createdAt: "2024-05-08T15:30:00.000Z",
    },
    {
      slug: "cooking-101",
      title: "Cooking 101: Basics Everyone Should Know",
      body: "Master the basics of cooking with this beginner-friendly guide. Learn essential techniques and simple recipes...",
      author: { username: "chef_master" },
      tagList: ["cooking", "food", "basics"],
      createdAt: "2024-05-07T09:15:00.000Z",
    },
    {
      slug: "javascript-tips",
      title: "JavaScript Tips and Tricks",
      body: "Discover lesser-known JavaScript features and techniques that will make your code more efficient...",
      author: { username: "js_ninja" },
      tagList: ["javascript", "programming", "tips"],
      createdAt: "2024-05-06T14:20:00.000Z",
    },
    {
      slug: "photography-basics",
      title: "Photography Basics for Beginners",
      body: "Learn the fundamentals of photography, from composition to camera settings...",
      author: { username: "photo_pro" },
      tagList: ["photography", "beginner", "tutorial"],
      createdAt: "2024-05-05T11:45:00.000Z",
    },
    {
      slug: "healthy-living",
      title: "Guide to Healthy Living",
      body: "Comprehensive guide to maintaining a healthy lifestyle through diet, exercise, and mindfulness...",
      author: { username: "health_expert" },
      tagList: ["health", "lifestyle", "wellness"],
      createdAt: "2024-05-04T16:30:00.000Z",
    },
    {
      slug: "web-security",
      title: "Web Security Essentials",
      body: "Essential security practices every web developer should know. Protect your applications from common threats...",
      author: { username: "security_guru" },
      tagList: ["security", "web", "programming"],
      createdAt: "2024-05-03T13:25:00.000Z",
    },
    {
      slug: "travel-tips",
      title: "Essential Travel Tips",
      body: "Make your travels smoother with these essential tips and tricks for planning and during your journey...",
      author: { username: "wanderlust" },
      tagList: ["travel", "tips", "adventure"],
      createdAt: "2024-05-02T10:10:00.000Z",
    },
    {
      slug: "machine-learning-intro",
      title: "Introduction to Machine Learning",
      body: "Get started with machine learning concepts and practical applications in this beginner-friendly guide...",
      author: { username: "ai_expert" },
      tagList: ["AI", "machine-learning", "technology"],
      createdAt: "2024-05-01T12:40:00.000Z",
    },
    {
      slug: "gardening-basics",
      title: "Gardening Basics for Beginners",
      body: "Learn how to start your own garden with this comprehensive guide for beginners...",
      author: { username: "garden_guru" },
      tagList: ["gardening", "plants", "outdoor"],
      createdAt: "2024-04-30T08:55:00.000Z",
    },
  ];
  const { data } = useGetArticles({
    limit: 10,
    offset: (currentPage - 1) * 10,
  });

  const columns = [
    {
      title: "#",
      key: "index",
      width: 60,
      render: (_: any, __: any, index: number) => (
        <div className="w-8 h-8 rounded-md flex items-center justify-center bg-neutral-50 text-xs font-semibold">
          {(currentPage - 1) * 10 + index + 1}
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
      render: (_: any, record: any) => <ActionDropdown slug={record.slug} />,
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
    <MainLayout>
      <div className="bg-white px-6 rounded-md">
        <p className="text-lg font-semibold py-9">All Posts</p>
        <Table
          columns={columns}
          dataSource={mockData}
          rowKey="slug"
          //   loading={isLoading}
          pagination={{
            current: currentPage,
            total: 100,
            pageSize: 10,
            onChange: (page) => navigate(`/articles/page/${page}`),
            showSizeChanger: false,
            showQuickJumper: false,
            defaultPageSize: 10,
            showLessItems: false,
            showPrevNextJumpers: true,
            itemRender: itemRender,
          }}
          className="
          [&_.ant-table-thead_.ant-table-cell]:!bg-neutral-300
            [&_.ant-table-thead_.ant-table-cell]:!text-lg
            [&_.ant-table-thead_.ant-table-cell]:!font-semibold
            [&_.ant-table-thead_.ant-table-cell::before]:!content-none 
            [&_.ant-table-thead]:!h-12"
        />
      </div>
    </MainLayout>
  );
};
