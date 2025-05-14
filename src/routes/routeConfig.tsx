import { Articles } from "../app/components/pages/articles";
import { CreateEditArticle } from "../app/components/pages/articles/createAndEdit";
import { Login } from "../app/components/pages/login";
import { Register } from "../app/components/pages/register";

export const routes = [
  {
    path: "/",
    element: <Login />,
  },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
  {
    path: "/articles",
    element: <Articles />,
  },
  {
    path: "/articles/page/:page",
    element: <Articles />,
  },
  {
    path: "/articles/create",
    element: <CreateEditArticle />,
  },
  {
    path: "/articles/:slug",
    element: <CreateEditArticle />,
  },
];
