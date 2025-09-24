import { Ellipsis } from "lucide-react";
import { AddCard } from "./add-card";
import { List } from "@/actions/list/type";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { DragList } from "./drag-list";

interface ListContainerProps {
  list: List;
  index: number;
}
export function ListContainer({ list, index }: ListContainerProps) {
  const { id, card: cards, name } = list;
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Droppable direction="vertical" droppableId={id} type="card">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="w-[272px] shrink-0 p-2 rounded-md bg-[#f2f2f4]"
              >
                <div className="px-3 flex items-center justify-between mb-5">
                  <span className="text-xs">{name}</span>
                  <Ellipsis className="cursor-pointer" />
                </div>
                <ul className="text-sm flex flex-col [&>li]:mb-2">
                  {cards.map((card, idx) => (
                    <DragList key={card.id} index={idx} cardId={card.id}>
                      {card.name}
                    </DragList>
                  ))}
                  {provided.placeholder}
                </ul>

                <div>
                  <AddCard listId={id} />
                </div>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}
