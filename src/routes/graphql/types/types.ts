import { MemberTypeId } from '../../member-types/schemas.js';

export type typeWithID = { id: string };

export type CreatePost = {
  title: string;
  content: string;
  authorId: string;
};

export type ChangePost = {
  title: string;
  content: string;
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

export type ChangeProfile = {
  isMale: boolean;
  yearOfBirth: number;
  memberTypeId: MemberTypeId;
};
