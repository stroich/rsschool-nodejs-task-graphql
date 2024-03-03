import { MemberTypeId } from '../../member-types/schemas.js';

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

export type CreateProfile = {
  isMale: boolean;
  yearOfBirth: number;
  userId: string;
  memberTypeId: MemberTypeId;
};
