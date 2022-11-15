import { CategoryType } from './Category';
import { UserType } from './User';

export type ArticlesType = {
  id: string;
  title: string;
  slug: string;
  description: string;
  key_words: string[];
  reading_time: number;
  content: string;
  isPublished: boolean;
  thumbnail: string;
  published_at: Date | string;
  created_at: Date | string;
  updated_at: Date | string;
  category: CategoryType;
  author: UserType;
};
