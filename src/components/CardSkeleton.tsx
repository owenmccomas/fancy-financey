import { Skeleton } from "@/components/ui/skeleton";

interface CardSkeletonProps {
  color?: string;
}

export function CardSkeleton({ color = "bg-gray-200" }: CardSkeletonProps) {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className={`h-[125px] w-[250px] rounded-xl ${color}`} />
      <div className="space-y-2">
        <Skeleton className={`h-4 w-[250px] ${color}`} />
        <Skeleton className={`h-4 w-[200px] ${color}`} />
      </div>
    </div>
  );
}

interface CardSkeletonGroupProps {
  color?: string;
}

export function CardSkeletonGroup({ color = "bg-gray-200" }: CardSkeletonGroupProps) {
  return (
    <div className="flex flex-wrap" style={{ margin: '-5px' }}>
      {[...Array(3)].map((_, index) => (
        <div key={index} style={{ padding: '5px' }}>
          <CardSkeleton color={color} />
        </div>
      ))}
    </div>
  );
}