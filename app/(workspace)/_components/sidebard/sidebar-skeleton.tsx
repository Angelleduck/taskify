import { Skeleton } from "@/components/ui/skeleton";
export default function Sidebarskeleton() {
  return (
    <div className="w-64 hidden md:block">
      <div className="flex items-center justify-between ml-4 mb-2 text-xs font-medium">
        <Skeleton className="w-16 h-4" />
        <Skeleton className="w-10 h-9" />
      </div>
      <div>
        {Array.from({ length: 6 }).map((_, idx) => (
          <Skeleton className="w-full h-10 mb-2" key={idx} />
        ))}
      </div>
    </div>
  );
}
