import { PrismaClient } from "@prisma/client";
import { CreateUserInput } from '../../types/user.types.js'

export async function createUser(prisma: PrismaClient, input: typeof CreateUserInput) {
    const user = await prisma.user.create({
        data: input
    })
}