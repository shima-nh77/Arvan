import { useNavigate } from "react-router-dom";
import { AuthForm } from "../../organisms/authForm/authForm";
import { useRegister } from "../../../../api/auth/authApis";
import { FormValues } from "../../organisms/authForm/authForm.types";
import { showToast } from "../../../../utility/toast";
import { cookieManager } from "../../../../utility/cookieManager";

export const Register = () => {
  const navigate = useNavigate();
  const { mutate: mutateUserRegister, isPending: registerPending } =
    useRegister();
  const handleSubmit = (formData: FormValues) => {
    mutateUserRegister(
      {
        user: {
          username: formData.username || "",
          email: formData.email,
          password: formData.password,
        },
      },
      {
        onSuccess: (response: any) => {
          if (response.user?.token) {
            cookieManager.setToken(response.user.token);
          }

          showToast.success({
            title: "Success",
            description: "Registration successfully",
          });
          navigate("/login");
        },
        onError: () => {
          showToast.error({
            title: "Error",
            description: "Registration failed",
          });
        },
      }
    );
  };

  return (
    <AuthForm
      mode="register"
      onSubmit={handleSubmit}
      isLoading={registerPending}
    />
  );
};
