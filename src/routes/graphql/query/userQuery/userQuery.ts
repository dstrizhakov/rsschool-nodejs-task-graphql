import { GraphQLNonNull } from "graphql";
import { userObjectType } from "./userObjectType.js";
import { UUIDType } from "../../types/uuid.js";
import { PrismaClient, User } from "@prisma/client";
import { DefaultArgs, PrismaClientOptions } from "@prisma/client/runtime/library.js";
import DataLoader from "dataloader";

export interface Loaders {
    userLoader: DataLoader<string, User>
}

export interface Context {
    prisma: PrismaClient<PrismaClientOptions, never, DefaultArgs>
    loaders: Loaders
}

const userQuery = {
    user: {
        type: userObjectType,
        args: {
            id: {
                type: new GraphQLNonNull(UUIDType)
            }
        },
        resolve: async (source,args: User, context: Context ) =>{

        }
    }
}