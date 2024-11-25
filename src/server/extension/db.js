import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
    const options = {
        log: ['query', 'info', 'warn', 'error'],
    }
    if (process.env.NODE_ENV === 'production') {
        return new PrismaClient()
    }
    return new PrismaClient(options);
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma