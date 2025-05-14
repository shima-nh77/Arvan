export interface RegisterCredentials {
  user: {
    username: string;
    email: string;
    password: string;
  };
}

export interface LoginCredentials {
  user: {
    email: string;
    password: string;
  };
}

export type UserResponse = {
  user: {
    email: string;
    username: string;
    bio: string;
    image: string;
    token: string;
  };
};
