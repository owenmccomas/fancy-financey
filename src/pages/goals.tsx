import { useState } from "react";
import { api } from "@/utils/api";
import { withAuth } from "@/components/withAuth";
import GoalCard from "@/components/goals/GoalCard";
import GoalsForm from "@/components/goals/GoalsForm";
import Nav from "@/components/Nav";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useToast } from "@/components/ui/use-toast";
import { CardSkeletonGroup } from "@/components/CardSkeleton";
import type { NewGoalInput, UpdateGoalInput, GoalApiInput } from "@/types";

function Goals() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { toast } = useToast();

  const {
    data: goals,
    refetch: refetchGoals,
    isLoading,
  } = api.goals.getAll.useQuery();
  const { data: totalGoalProgress } = api.goals.getTotalProgress.useQuery();

  const addGoalMutation = api.goals.create.useMutation({
    onSuccess: async () => {
      await refetchGoals();
      setIsDrawerOpen(false);
      toast({
        title: "Goal added",
        description: "Your new goal has been added successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add goal",
        variant: "destructive",
      });
    },
  });

  const updateGoalMutation = api.goals.update.useMutation({
    onSuccess: async () => {
      await refetchGoals();
      toast({
        title: "Goal updated",
        description: "Your goal has been updated successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to update goal: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const deleteGoalMutation = api.goals.delete.useMutation({
    onSuccess: async () => {
      await refetchGoals();
      toast({
        title: "Goal deleted",
        description: "Your goal has been deleted successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to delete goal: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const addGoal = (newGoal: NewGoalInput) => {
    const apiInput: GoalApiInput = {
      ...newGoal,
      targetDate: new Date(newGoal.targetDate),
      description: newGoal.description ?? undefined,
    };
    addGoalMutation.mutate(apiInput);
  };

  const updateGoal = (updatedGoal: UpdateGoalInput) => {
    updateGoalMutation.mutate({
      ...updatedGoal,
      description: updatedGoal.description ?? undefined,
    });
  };

  const deleteGoal = (id: number) => {
    deleteGoalMutation.mutate({ id });
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-blue-200">
      <div className="grid min-h-screen w-full grid-cols-1 md:grid-cols-[1fr_300px]">
        <main className="flex w-full flex-col items-start justify-center gap-8 p-4 md:p-8 lg:pl-24 xl:pl-32">
          <div className="flex w-full flex-col items-start justify-center gap-4">
            <div className="text-6xl font-bold text-gray-900 dark:text-gray-50 md:text-8xl">
              {totalGoalProgress?.toFixed(2) ?? "0.00"}%
            </div>
            <div className="ml-2 text-gray-500 dark:text-gray-400">
              Total Goal Progress
            </div>
          </div>
          {isLoading ? (
            <CardSkeletonGroup color="bg-blue-300" />
          ) : (
            <div className="flex flex-wrap" style={{ margin: "-5px" }}>
              {goals?.map((goal) => (
                <div key={goal.id} style={{ padding: "5px" }}>
                  <GoalCard
                    goal={goal}
                    onUpdate={updateGoal}
                    onDelete={deleteGoal}
                  />
                </div>
              ))}
            </div>
          )}
          <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <DrawerTrigger asChild>
              <Button onClick={() => setIsDrawerOpen(true)}>Add Goal</Button>
            </DrawerTrigger>
            <DrawerContent>
              <GoalsForm onAddGoal={addGoal} />
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button
                    className="mx-auto w-full max-w-xs"
                    variant="outline"
                    onClick={() => setIsDrawerOpen(false)}
                  >
                    Cancel
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </main>
        <Nav />
      </div>
    </div>
  );
}

export default withAuth(Goals);