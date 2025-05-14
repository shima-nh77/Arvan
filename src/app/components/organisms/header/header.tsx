import { Layout } from "antd";
import { useNavigate } from "react-router-dom";
import { Button } from "../../atoms/button/button";
import { cookieManager } from "../../../../utility/cookieManager";
import { useGetCurrentUser } from "../../../../api/auth/authApis";

export const Header = () => {
  const { Header: AntHeader } = Layout;
  const navigate = useNavigate();
  const { data: userData } = useGetCurrentUser();
  const username = userData?.user?.username;

  const handleLogout = () => {
    cookieManager.removeToken();
    navigate("/login");
  };

  return (
    <AntHeader className="bg-white border-b border-neutral-50 fixed top-0 left-0 right-0 z-50 px-6">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0 py-2 sm:py-0">
          <div className="order-2 sm:order-1">
            <p className="text-sm text-neutral-200">
              Welcome <span className="font-semibold">{username}</span>
            </p>
          </div>
          <p className="text-base font-semibold bg-neutral-50 px-3 py-2 rounded-md order-1 sm:order-2">
            Arvancloud Challenge
          </p>
          <div className="order-3">
            <Button variant="outline" onClick={handleLogout}>
              Log out
            </Button>
          </div>
        </div>
      </div>
    </AntHeader>
  );
};
