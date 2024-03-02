import { MemberType, Profile, User } from '@prisma/client';
import DataLoader from 'dataloader';

export interface Loaders {
    userLoader: DataLoader<string, User>;
    profileLoader: DataLoader<string, Profile>
    memberTypeLoader: DataLoader<string, MemberType>
  }