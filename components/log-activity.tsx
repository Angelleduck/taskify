import { format } from "date-fns";

export default function LogActivity({ el }: { el: Record<string, any> }) {
  return (
    <div className="flex gap-2 items-center">
      <div className="bg-blue-300 w-8 h-8 rounded-full" />
      <div className="flex flex-col">
        <p className="text-sm text-muted-foreground">{LogMessage(el)}</p>
        <p className="text-xs text-muted-foreground">
          {format(new Date(el.createdAt), "MMM d, yyyy 'at' h:mm a")}
        </p>
      </div>
    </div>
  );
}

function LogMessage(data: Record<string, any>) {
  switch (data.action) {
    case "CREATE":
      return `${capitalize(data.entity)} "${data.entityName}" created`;
    case "UPDATE":
      return `${capitalize(data.entity)} "${data.entityName}" updated`;
    default:
      return "Unknown";
  }
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
