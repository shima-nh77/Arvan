import { Form } from "antd";
import { Input } from "../../atoms/input/input";
import { Button } from "../../atoms/button/button";
import { Link } from "react-router-dom";
import { AuthFormProps, FormValues } from "./authForm.types";

export const AuthForm = ({ mode, onSubmit, isLoading }: AuthFormProps) => {
  const [form] = Form.useForm<FormValues>();

  const handleSubmit = (values: FormValues) => {
    onSubmit(values);
  };

  return (
    <div className="w-full flex justify-center items-center min-h-screen bg-neutral-50">
      <div className="w-full max-w-md bg-white rounded-lg mx-4">
        <p className="text-lg font-semibold border-b border-neutral-100 py-9 px-6">
          {mode === "login" ? "Sign in" : "Sign up"}
        </p>
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          requiredMark={false}
          validateTrigger={["onBlur", "onChange"]}
          className="p-6"
        >
          {mode === "register" && (
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: "Required field" }]}
              validateStatus={
                form.getFieldError("username").length > 0 ? "error" : ""
              }
            >
              <Input
                containerClassName="mb-0"
                placeholder="Username"
                className={
                  form.getFieldError("username").length > 0
                    ? "!border-red-100"
                    : ""
                }
              />
            </Form.Item>
          )}

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Required field" },
              { type: "email", message: "Invalid email format" },
            ]}
            validateStatus={
              form.getFieldError("email").length > 0 ? "error" : ""
            }
          >
            <Input
              containerClassName="mb-0"
              type="email"
              placeholder="Email"
              className={
                form.getFieldError("email").length > 0 ? "!border-red-100" : ""
              }
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            className="!mb-2"
            rules={[{ required: true, message: "Required field" }]}
            validateStatus={
              form.getFieldError("password").length > 0 ? "error" : ""
            }
          >
            <Input
              containerClassName="mb-0"
              type="password"
              placeholder="Password"
              className={
                form.getFieldError("password").length > 0
                  ? "!border-red-100"
                  : ""
              }
            />
          </Form.Item>

          <Button
            type="submit"
            className="w-full mt-6"
            variant="primary"
            disabled={isLoading}
            isLoading={isLoading}
          >
            {mode === "login" ? "Sign in" : "Sign up"}
          </Button>

          <p className="text-sm text-center mt-3">
            {mode === "login" ? "Don't have an account?" : "Have an account?"}
            <Link
              to={mode === "login" ? "/register" : "/login"}
              className="text-teal-400 font-medium ml-1"
            >
              {mode === "login" ? "Sign up now" : "Sign in"}
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
};
