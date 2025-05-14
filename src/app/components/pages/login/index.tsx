import { useNavigate } from "react-router-dom";
import { AuthForm } from "../../organisms/authForm/authForm";
import { useEffect } from "react";
import { cookieManager } from "../../../../utility/cookieManager";
import { FormValues } from "../../organisms/authForm/authForm.types";
import { showToast } from "../../../../utility/toast";
import { useLogin } from "../../../../api/auth/authApis";

export const Login = () => {
  const navigate = useNavigate();
  const { mutate: mutateLogin, isPending: loginPending } = useLogin();

  useEffect(() => {
    const token = cookieManager.getToken();
    if (token) {
      navigate("/articles");
    }
  }, [navigate]);

  const handleSubmit = (formData: FormValues) => {
    mutateLogin(
      {
        user: {
          email: formData?.email,
          password: formData?.password,
        },
      },
      {
        onSuccess: (response: any) => {
          if (response?.user?.token) {
            cookieManager.setToken(response?.user?.token);
            showToast.success({
              title: "Success!",
              description: "Login successfully",
            });
            navigate("/articles");
          }
        },
        onError: () => {
          showToast.error({
            title: "Sign-in Failed!",
            description: "Username and/or Password is invalid",
          });
        },
      }
    );
  };

  return (
    <AuthForm mode="login" onSubmit={handleSubmit} isLoading={loginPending} />
  );
};
