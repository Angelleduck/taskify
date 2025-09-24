import { Draggable } from "@hello-pangea/dnd";

interface DragListProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  cardId: string;
  index: number;
}
export function DragList({ children, cardId, index }: DragListProps) {
  return (
    <Draggable draggableId={cardId} index={index}>
      {(provided) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="shadow-sm rounded-md p-[10px] bg-white"
        >
          {children}
        </li>
      )}
    </Draggable>
  );
}
