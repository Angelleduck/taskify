import { Skeleton } from "@/components/ui/skeleton";
import { ActivityIcon } from "lucide-react";
import LogActivity from "@/components/log-activity";

interface ActivityProps {
  logs: Record<string, any>[];
}
export function Activity({ logs }: ActivityProps) {
  return (
    <div className="flex gap-2">
      <ActivityIcon className="h-5 w-5 mt-1 text-neutral-700" />
      <div className="flex flex-col w-full gap-2">
        <p className="font-semibold text-neutral-700">Activity</p>
        <div className="space-y-3 max-h-[250px] overflow-y-auto">
          {logs.map((el, idx) => (
            <LogActivity key={idx} el={el} />
          ))}
        </div>
      </div>
    </div>
  );
}

Activity.Skeleton = function ActivitySkeleton() {
  return (
    <div className="flex gap-2">
      <ActivityIcon className="h-5 w-5 mt-1 text-neutral-700" />
      <div className="flex flex-col w-full gap-2">
        <p className="font-semibold text-neutral-700">Activity</p>
        <div>
          <div className="flex gap-2 items-center">
            <div className="bg-blue-300 w-8 h-8 rounded-full" />
            <div className="flex flex-col">
              <Skeleton className="h-[30px] w-[300px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
