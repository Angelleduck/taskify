import { board } from "@/actions/board/get-boards";

export default async function Board({
  params,
}: {
  params: Promise<{ id?: string }>;
}) {
  const { id } = await params;
  const _board = await board(id);

  // const data = _boards.find((el) => id == el.id);

  if (!_board) {
    return "hi";
  }

  return (
    <div
      style={{ backgroundImage: `url(${_board.at(0)?.image_url})` }}
      className="h-screen bg-no-repeat bg-cover bg-center"
    >
      page
    </div>
  );
}
