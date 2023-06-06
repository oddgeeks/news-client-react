export interface ArticleType {
  source: {
    id: string;
    name: string;
  };
  title: string;
  description: string;
  publishedAt: string;
  author: string;
  url: string;
  urlToImage: string;
}

export type CategoryType = {
  name: string
}

export type SourceType = {
  name: string
}
