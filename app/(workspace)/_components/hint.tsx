import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";

export default function Hint() {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <HelpCircle className="absolute bottom-2 right-2" size={14} />
        </TooltipTrigger>
        <TooltipContent
          className="w-[220px] text-neutral-500 bg-[#ffffff]"
          side="bottom"
        >
          <p>
            Free workspaces can have upto 5 open boards. For unlimited boards,
            please upgrade this workspace.
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
