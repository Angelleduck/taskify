import { UserRound } from "lucide-react";
import Hint from "../../_components/hint";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BoardPopup } from "../../_components/board/board-popup";
import { workspaces } from "@/actions/workspace/get-workspaces";
import { boards } from "@/actions/board/get-boards";
import BoardBox from "@/app/(board)/_components/board-box";
import { Info } from "../../_components/info";
import { redirect } from "next/navigation";
import { getCountBoard } from "@/lib/limit";
import { checkSubscription } from "@/lib/subscription";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const _workspaces = await workspaces();

  const titleName = _workspaces.find((workspace) => workspace.id === id);
  return {
    title: `${titleName?.name} | Taskify`,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id?: string }>;
}) {
  const { id } = await params;
  const _workspaces = await workspaces();
  const workspace = _workspaces.find((workspace) => workspace.id === id);
  const _boards = await boards(id);

  if (!workspace) redirect("/");

  const count = await getCountBoard();
  const isPro = await checkSubscription();
  return (
    <>
      <Info isPro={isPro} title={workspace.name} />
      <div className="px-4">
        <div className="flex items-center gap-2 my-4 font-semibold text-neutral-700 text-lg">
          <UserRound />
          Your workspaces
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[124px]">
          {_boards.map((board) => (
            <BoardBox
              key={board.id}
              href={`/board/${board.id}`}
              imageSrc={board.thumb_url}
              name={board.name}
            />
          ))}
          <Popover>
            <PopoverTrigger>
              <div className="h-[124px] bg-neutral-100 rounded-md flex items-center justify-center flex-col relative">
                <h3 className="text-sm">Create new board</h3>
                <p className="text-xs">
                  {isPro ? "unlimited" : `${count} remaining`}
                </p>
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
