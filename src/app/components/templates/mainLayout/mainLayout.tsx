import { Layout } from "antd";
import { MainLayoutProps } from "./mainLayout.types";
import { Header } from "../../organisms/header/header";
import { Sidebar } from "../../organisms/sidebar/sidebar";

export const MainLayout = ({ children, className = "" }: MainLayoutProps) => {
  const { Content } = Layout;
  return (
    <>
      <Header />
      <Layout className={`min-h-screen ${className}`}>
        <Sidebar />

        <div className="w-full p-6">{children}</div>
      </Layout>
    </>
  );
};
