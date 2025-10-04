import { board } from "@/actions/board/get-boards";
import { BoardButton } from "../../_components/board-button";
import { getLists } from "@/actions/list/get-list";
import { DragContext } from "../../_components/drag-context";
import { EllipsisDelete } from "../../_components/ellipsis-delete";

export default async function Board({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const _board = await board(id);

  if (!_board) {
    return "hi";
  }
  const lists = await getLists(id);

  return (
    <main
      style={{ backgroundImage: `url(${_board?.image_url})` }}
      className="h-screen bg-no-repeat bg-cover bg-center"
    >
      <div className="flex items-center justify-between bg-black/40 px-6 py-[10px] absolute top-14 w-full">
        <BoardButton boardTitle={_board.name} boardId={_board.id} />

        <EllipsisDelete boardId={_board.id} />
      </div>

      <DragContext lists={lists} boardId={id} />
    </main>
  );
}
