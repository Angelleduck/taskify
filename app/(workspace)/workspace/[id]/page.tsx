import { CreditCard, UserRound } from "lucide-react";
import Hint from "../../_components/hint";
import { workspaces } from "@/actions/workspaces/get-workspaces";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import BoardPopup from "../../_components/board/board-popup";

export default async function Page({
  params,
}: {
  params: Promise<{ id?: string }>;
}) {
  const data = await workspaces();

  const { id } = await params;
  const titleName = data.find((workspace) => workspace.id === id);

  return (
    <>
      <div className="py-3 border-b">
        <p className="font-semibold text-xl">{titleName?.name}</p>
        <div className="flex items-center gap-1 text-neutral-600">
          <CreditCard size={12} />
          <span className="text-xs">Free</span>
        </div>
      </div>
      <div className="px-4">
        <div className="flex items-center gap-2 my-4 font-semibold text-neutral-700 text-lg">
          <UserRound />
          Your workspaces
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          <Popover>
            <PopoverTrigger>
              <div className="h-[124px] bg-neutral-100 rounded-md flex items-center justify-center flex-col relative">
                <h3 className="text-sm">Create new board</h3>
                <p className="text-xs">5 remaining</p>
                <Hint />
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-[320px] p-4">
              <BoardPopup workspaceId={id} />
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger>
              <div className="h-[124px] bg-neutral-100 rounded-md flex items-center justify-center flex-col relative">
                <h3 className="text-sm">Create new board</h3>
                <p className="text-xs">5 remaining</p>
                <Hint />
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-[320px] p-4">
              <BoardPopup workspaceId={id} />
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger>
              <div className="h-[124px] bg-neutral-100 rounded-md flex items-center justify-center flex-col relative">
                <h3 className="text-sm">Create new board</h3>
                <p className="text-xs">5 remaining</p>
                <Hint />
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-[320px] p-4">
              <BoardPopup workspaceId={id} />
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger>
              <div className="h-[124px] bg-neutral-100 rounded-md flex items-center justify-center flex-col relative">
                <h3 className="text-sm">Create new board</h3>
                <p className="text-xs">5 remaining</p>
                <Hint />
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-[320px] p-4">
              <BoardPopup workspaceId={id} />
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger>
              <div className="h-[124px] bg-neutral-100 rounded-md flex items-center justify-center flex-col relative">
                <h3 className="text-sm">Create new board</h3>
                <p className="text-xs">5 remaining</p>
                <Hint />
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-[320px] p-4">
              <BoardPopup workspaceId={id} />
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger>
              <div className="h-[124px] bg-neutral-100 rounded-md flex items-center justify-center flex-col relative">
                <h3 className="text-sm">Create new board</h3>
                <p className="text-xs">5 remaining</p>
                <Hint />
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-[320px] p-4">
              <BoardPopup workspaceId={id} />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </>
  );
}
