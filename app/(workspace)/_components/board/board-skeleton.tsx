import { Skeleton } from "@/components/ui/skeleton";

export default function BoardSkeleton() {
  return (
    <>
      {Array.from({ length: 9 }).map((_, i) => (
        <Skeleton key={i} />
      ))}
    </>
  );
}
