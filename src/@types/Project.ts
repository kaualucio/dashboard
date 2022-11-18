import { UserType } from './User';

export type ProjectType = {
  id: string;
  title: string;
  responsible: UserType;
  responsible_id: string;
  client: UserType;
  client_id: string;
  description: string;
  objective: string;
  phone: string;
  type_service: string[];
  budget: number;
  status: boolean;
  completed: boolean;
  completed_at: Date | string;
  canceled: boolean;
  canceled_at: Date | string;
  created_at: Date | string;
  updated_at: Date | string;
};
