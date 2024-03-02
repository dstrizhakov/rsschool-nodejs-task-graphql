import { PrismaClient } from "@prisma/client";
import { Loaders } from "./loaders.js";
import { DefaultArgs, PrismaClientOptions } from "@prisma/client/runtime/library.js";

export interface Context {
    prisma: PrismaClient<PrismaClientOptions, never, DefaultArgs>;
    loaders: Loaders;
  }