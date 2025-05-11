import { useNavigate } from "react-router-dom";
import { useCreateUser } from "../../../../api/generated/user-and-authentication/user-and-authentication";
import { AuthForm } from "../../organisms/authForm/authForm";

export const Register = () => {
  const navigate = useNavigate();
  const { mutate: register, status } = useCreateUser();
  const isLoading = status === "pending";
  // Extend the UseMutationResult type to include isLoading
  const handleSubmit = (formData: any) => {
    register(
      {
        data: {
          user: {
            username: formData.username,
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
          console.error("Registration failed:", error);
        },
      }
    );
  };

  return (
    <AuthForm mode="register" onSubmit={handleSubmit} isLoading={isLoading} />
  );
};
