export type FormValues = {
  email: string;
  password: string;
  username?: string;
};

export type AuthFormProps = {
  mode: "login" | "register";
  onSubmit: (data: FormValues) => void;
  isLoading?: boolean;
};
