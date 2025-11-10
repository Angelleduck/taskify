import { Skeleton } from "@/components/ui/skeleton";
import { ActivityIcon } from "lucide-react";
import { format } from "date-fns";

interface ActivityProps {
  logs: Record<string, any>[];
}
export function Activity({ logs }: ActivityProps) {
  return (
    <div className="flex gap-2">
      <ActivityIcon className="h-5 w-5 mt-1 text-neutral-700" />
      <div className="flex flex-col w-full gap-2">
        <p className="font-semibold text-neutral-700">Activity</p>
        <div className="space-y-2 max-h-[250px] overflow-y-auto">
          {logs.map((el, idx) => (
            <div key={idx} className="flex gap-2 items-center">
              <div className="bg-blue-300 w-8 h-8 rounded-full" />
              <div className="flex flex-col">
                <p className="text-sm text-muted-foreground">
                  {LogMessage(el)}
                </p>
                <p className="text-xs text-muted-foreground">
                  {format(new Date(el.createdAt), "MMM d, yyyy 'at' h:mm a")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LogMessage(data: Record<string, any>) {
  switch (data.action) {
    case "CREATE":
      return `Card "${data.entityName}" created`;
    case "UPDATE":
      return `Card "${data.entityName}" updated`;
    default:
      return "Unknown";
  }
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
