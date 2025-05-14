import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArticlesResponse } from "./articles.types";
import {
  createArticle,
  deleteArticle,
  editArticle,
  getAllArticles,
  getArticlesByAuthor,
} from "./articles.rq";

export const useGetArticles = () => {
  return useQuery<ArticlesResponse>({
    queryKey: ["articles"],
    queryFn: () => getAllArticles(),
  });
};

export const useEditArticle = () => {
  return useMutation({
    mutationFn: editArticle,
  });
};

export const useDeleteArticle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });
};

export const useCreateArticle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });
};

export const useGetArticlesByAuthor = (author: string) => {
  return useQuery({
    queryKey: ["articlesByAuthor", author],
    queryFn: () => getArticlesByAuthor(author),
    enabled: !!author,
  });
};
