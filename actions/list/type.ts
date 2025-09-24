type List = {
  card: {
    name: string;
    id: string;
    listId: string;
  }[];
} & {
  name: string;
  id: string;
  boardId: string;
};

export type { List };
