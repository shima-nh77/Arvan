export interface Article {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: {
    username: string;
    bio: string;
    image: string;
    following: boolean;
  };
}

export interface ArticlesResponse {
  articles: Article[];
  articlesCount: number;
}

export interface UseGetArticlesParams {
  page?: number;
  limit?: number;
  tag?: string;
}

export type EditArticleParams = {
  slug: string;
  data: {
    body: string;
  };
};

export type CreateArticleParams = {
  title: string;
  description: string;
  body: string;
  tagList?: string[];
};
