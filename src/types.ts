export interface NewGoalInput {
  title: string;
  description?: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  category: string;
  priority?: number;
}

export interface UpdateGoalInput {
  id: number;
  title?: string;
  description?: string | null;
  targetAmount?: number;
  currentAmount?: number;
  targetDate?: Date;
  category?: string;
  priority?: number;
  status?: GoalStatus;
}

export type GoalStatus = 'In Progress' | 'Completed' | 'Cancelled';

export interface GoalApiInput {
  title: string;
  description?: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: Date;
  category: string;
  priority?: number;
}
  
  export type GoalFormData = Omit<NewGoalInput, "description" | "targetDate"> & {
    description?: string;
    targetDate: string;
  };