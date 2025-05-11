import { Layout } from "antd";
import { useNavigate } from "react-router-dom";
import { Button } from "../../atoms/button/button";

export const Header = () => {
  const { Header: AntHeader } = Layout;
  const navigate = useNavigate();
  const username = localStorage?.getItem("username") || "user";

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AntHeader className="bg-white px-6 grid grid-cols-3 items-center border-b border-neutral-50">
      <div className="justify-self-start">
        <p className="text-sm text-neutral-200 ">
          Welcome <span className="font-semibold"> {username}</span>
        </p>
      </div>
      <p className="justify-self-center rounded-md text-base font-semibold bg-neutral-50 px-3 py-2 ">
        Arvancloud Challenge
      </p>
      <div className="justify-self-end">
        <Button variant="outline" onClick={handleLogout}>
          Log out
        </Button>
      </div>
    </AntHeader>
  );
};
