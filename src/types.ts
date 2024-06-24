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
  
  // This type is used for the API input
  export type GoalApiInput = Omit<NewGoalInput, "targetDate"> & {
    targetDate: Date;
    description: string | undefined;
  };
  
  // This type is used for internal component state
  export type GoalFormData = Omit<NewGoalInput, "description" | "targetDate"> & {
    description?: string;
    targetDate: string;
  };