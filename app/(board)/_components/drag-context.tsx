"use client";

import type { ListWithCard } from "@/actions/list/type";
import { DragDropContext, Droppable, type DropResult } from "@hello-pangea/dnd";
import { ListContainer } from "./list-container";
import { useEffect, useState } from "react";
import { AddList } from "./add-list";
import { updateList } from "@/actions/list/update-list";
import { updateCard } from "@/actions/card/update-order";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface DragContextProps {
  lists: ListWithCard[];
  boardId: string;
}

export function DragContext({ lists, boardId }: DragContextProps) {
  const router = useRouter();
  const [listsContainer, setListsContainer] = useState(lists);
  useEffect(() => {
    setListsContainer(lists);
  }, [lists]);

  const onDragEnd = (result: DropResult<string>) => {
    const { destination, source, type } = result;

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

      newArray.forEach((list, idx) => {
        list.order = idx + 1;
      });
      setListsContainer(newArray);
      toast.success("List reordered");
      updateList(newArray);

      //
    } else if (type === "card") {
      const newArray = structuredClone(listsContainer);

      const sourceList = newArray.find(
        (list) => list.id === source.droppableId
      );
      const destinationList = newArray.find(
        (list) => list.id === destination.droppableId
      );

      if (!sourceList?.cards || !destinationList?.cards) return;

      const [removed] = sourceList.cards.splice(source.index, 1);

      destinationList.cards.splice(destination.index, 0, removed);

      const cardUpdate = [sourceList, destinationList]
        .flatMap((list) => {
          return list.cards.map((card, idx) => {
            return {
              ...card,
              order: idx + 1,
              listId: list.id,
            };
          });
        })
        .flat();

      setListsContainer(newArray);
      toast.success("Card reordered");
      updateCard(cardUpdate);
      router.refresh();
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
