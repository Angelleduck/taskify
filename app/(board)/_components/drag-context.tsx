"use client";

import { List } from "@/actions/list/type";
import { DragDropContext, Droppable, type DropResult } from "@hello-pangea/dnd";
import { ListContainer } from "./list-container";
import { useState } from "react";
import { AddList } from "./add-list";

interface DragContextProps {
  lists: List[];
  boardId: string;
}

export function DragContext({ lists, boardId }: DragContextProps) {
  const [listsContainer, setListsContainer] = useState(lists);

  const onDragEnd = (result: DropResult<string>) => {
    const { destination, source, type } = result;
    console.log(result);

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "list") {
      const newArray = structuredClone(listsContainer);

      const [removed] = newArray.splice(source.index, 1);
      newArray.splice(destination.index, 0, removed);

      setListsContainer(newArray);
    } else if (type === "card") {
      const newArray = structuredClone(listsContainer);

      const sourceList = newArray.find((list) => list.id == source.droppableId);

      const destinationList = newArray.find(
        (list) => list.id == destination.droppableId
      );

      if (!sourceList?.card || !destinationList?.card) return;

      const [removed] = sourceList.card.splice(source.index, 1);

      destinationList.card.splice(destination.index, 0, removed);

      setListsContainer(newArray);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable
        droppableId="droppable list"
        direction="horizontal"
        type="list"
      >
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="pt-32 px-4 overflow-x-auto h-full flex [&>div]:mr-3 items-start"
          >
            {listsContainer.map((list, idx) => (
              <ListContainer key={list.id} list={list} index={idx} />
            ))}
            {provided.placeholder}
            <AddList boardId={boardId} />
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
