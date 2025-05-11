import { useNavigate } from "react-router-dom";
import { useLogin } from "../../../../api/generated/user-and-authentication/user-and-authentication";
import { AuthForm } from "../../organisms/authForm/authForm";

export const Login = () => {
  const navigate = useNavigate();
  const { mutate: login, status } = useLogin();
  const isLoading = status === "pending";

  const handleSubmit = (formData: any) => {
    login(
      {
        data: {
          user: {
            email: formData.email,
            password: formData.password,
          },
        },
      },
      {
        onSuccess: (response) => {
          localStorage.setItem("token", response.data.user.token);
          navigate("/");
        },
        onError: (error) => {
          console.error("Login failed:", error);
        },
      }
    );
  };

  return (
    <AuthForm mode="login" onSubmit={handleSubmit} isLoading={isLoading} />
  );
};
