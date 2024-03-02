import { MemberType, Post, Profile, User } from '@prisma/client';
import DataLoader from 'dataloader';

export interface Loaders {
  userLoader: DataLoader<string, User>;
  profileLoader: DataLoader<string, Profile>;
  memberTypeLoader: DataLoader<string, MemberType>;
  postLoader: DataLoader<string, Post[]>;
  subscribedToUserLoader: DataLoader<string, User[]>;
  userSubscribedToLoader: DataLoader<string, User[]>;
}
