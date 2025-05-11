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
          className="p-6"
        >
          {mode === "register" && (
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: "Required field" }]}
            >
              <Input 
                containerClassName="mb-0"
                placeholder="Username"
              />
            </Form.Item>
          )}

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Required field" },
              { type: "email", message: "Invalid email format" }
            ]}
          >
            <Input 
              containerClassName="mb-0"
              type="email"
              placeholder="Email"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Required field" }]}
            className="mb-6"
          >
            <Input 
              containerClassName="mb-0"
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Button
            type="submit"
            className="w-full"
            variant="primary"
            disabled={isLoading}
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