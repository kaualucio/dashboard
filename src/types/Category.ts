import { ArticlesType } from './Articles';

export type CategoryType = {
  id: string;
  name: string;
  slug: string;
  articles: ArticlesType[];
  created_at: Date | string;
  updated_at: Date | string;
};
