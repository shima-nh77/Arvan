import request from "../request";
import {
  ArticlesResponse,
  CreateArticleParams,
  EditArticleParams,
} from "./articles.types";

export const getAllArticles = async (): Promise<ArticlesResponse> => {
  return await request.get(`/articles`);
};

export const editArticle = async ({
  slug,
  data,
}: EditArticleParams): Promise<ArticlesResponse> => {
  return await request.put(`/articles/${slug}`, { article: data });
};

export const deleteArticle = async (slug: string): Promise<void> => {
  return await request.delete(`/articles/${slug}`);
};

export const createArticle = async (
  data: CreateArticleParams
): Promise<ArticlesResponse> => {
  return await request.post("/articles", {
    article: {
      title: data.title,
      description: data.description,
      body: data.body,
      tagList: data.tagList,
    },
  });
};

export const getArticlesByAuthor = async (author: string): Promise<ArticlesResponse> => {
  return await request.get(`/articles?author=${author}`);
};