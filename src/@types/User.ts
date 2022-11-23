import { ProjectType } from './Project';
import { ArticlesType } from './Articles';

export type UserType = {
  id: string;
  name: string;
  role: string;
  about: string;
  sex: string;
  age: string;
  email: string;
  phone: string;
  profile_picture: string;
  Project: ProjectType[];
  articles: ArticlesType[];
};
