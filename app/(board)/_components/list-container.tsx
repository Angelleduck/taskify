import { AddCard } from "./add-card";
import type { ListWithCard } from "@/actions/list/type";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { DragList } from "./drag-list";
import { EllipsisOptions } from "./ellipsis-options";
import { useState } from "react";

interface ListContainerProps {
  list: ListWithCard;
  index: number;
}
export function ListContainer({ list, index }: ListContainerProps) {
  const { id, cards, name } = list;

  const [edit, setEdit] = useState(false);

  function onEdit() {
    setEdit(true);
  }
  function onDisableEdit() {
    setEdit(false);
  }
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="w-[272px] shrink-0 p-2 rounded-md bg-[#f2f2f4]">
            <div className="px-3 flex items-center justify-between mb-3">
              <span className="text-sm font-medium">{name}</span>
              <EllipsisOptions id={id} handleEdit={onEdit} />
            </div>
            <Droppable direction="vertical" droppableId={id} type="card">
              {(provided) => (
                <ul
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="mt-1 text-sm flex flex-col [&>li]:mb-2"
                >
                  {cards.map((card, idx) => (
                    <DragList key={card.id} index={idx} cardId={card.id}>
                      {card.name}
                    </DragList>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>

            <div>
              <AddCard
                listId={id}
                isEditing={edit}
                handleEdit={onEdit}
                handleDisableEdit={onDisableEdit}
              />
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}
