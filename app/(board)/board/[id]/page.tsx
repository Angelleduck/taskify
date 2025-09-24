import { board } from "@/actions/board/get-boards";
import { Button } from "@/components/ui/button";
import { Ellipsis } from "lucide-react";
import { BoardButton } from "../../_components/board-button";
import { getLists } from "@/actions/list/get-list";
import { DragContext } from "../../_components/drag-context";
import { AddList } from "../../_components/add-list";

export default async function Board({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const _board = await board(id);

  if (_board.length < 1) {
    return "hi";
  }
  const lists = await getLists(id);

  return (
    <main
      style={{ backgroundImage: `url(${_board.at(0)?.image_url})` }}
      className="h-screen bg-no-repeat bg-cover bg-center"
    >
      <div className="flex items-center justify-between bg-black/40 px-6 py-[10px] absolute top-14 w-full">
        <BoardButton />

        <Button className="text-lg text-white font-bold w-8 h-8 bg-transparent hover:bg-white/20">
          <Ellipsis className="text-white" />
        </Button>
      </div>

      <DragContext lists={lists} boardId={id} />
    </main>
  );
}
