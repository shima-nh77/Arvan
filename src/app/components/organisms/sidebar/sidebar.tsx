import { Layout, Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

export const Sidebar = () => {
  const { Sider } = Layout;
  const location = useLocation();
  const navigate = useNavigate();

  const getItemClassName = (path: string) => {
    const isActive =
      path === "/articles"
        ? location.pathname === "/articles" ||
          location.pathname.includes("/articles/page")
        : path === "/create"
        ? location.pathname === "/create" ||
          (location.pathname.startsWith("/articles/") &&
            !location.pathname.includes("page"))
        : location.pathname === path;

    return isActive ? "!text-teal-100 !bg-blue-50" : "text-gray-600";
  };

  const items = [
    {
      key: "/articles",
      label: "All Articles",
      className: getItemClassName("/articles"),
    },
    {
      key: "/articles/create",
      label: "New Article",
      className: getItemClassName("/create"),
    },
  ];

  return (
    <Sider width={200} className="bg-white">
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        items={items}
        onClick={({ key }) => navigate(key)}
        className="h-full border-r-0 text-base font-semibold"
      />
    </Sider>
  );
};
