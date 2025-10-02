type ListWithCard = {
  cards: {
    name: string;
    id: string;
    order: number;
    listId: string;
  }[];
} & {
  order: number;
  name: string;
  id: string;
  boardId: string;
};

export type { ListWithCard };
