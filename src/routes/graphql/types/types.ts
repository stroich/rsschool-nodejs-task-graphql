export type typeWithID = { id: string };

export type CreatePost = {
  title: string;
  content: string;
  authorId: string;
};

export type CreateUser = {
  name: string;
  balance: number;
};
