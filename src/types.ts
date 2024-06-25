export interface NewGoalInput {
    title: string;
    targetAmount: number;
    currentAmount: number;
    targetDate: string;
    category: string;
    description?: string | null;
    priority: number;
  }
  
  export type GoalStatus = "In Progress" | "Completed" | "Cancelled";
  
  export type UpdateGoalInput = Partial<Omit<NewGoalInput, "targetDate">> & {
    id: number;
    targetDate?: Date;
    status?: GoalStatus;
  };
  
  export type GoalApiInput = Omit<NewGoalInput, "targetDate"> & {
    targetDate: Date;
    description: string | undefined;
  };
  
  export type GoalFormData = Omit<NewGoalInput, "description" | "targetDate"> & {
    description?: string;
    targetDate: string;
  };