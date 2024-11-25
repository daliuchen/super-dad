import prisma from "@/server/extension/db";

class User {
    static async getUserById(id) {
        return await prisma.user.findFirst({
            where: {
                id: id
            }
        })
    }

    static async getUserByEmail(email) {
        return await prisma.user.findFirst({
            where: {
                email: email
            }
        })
    }


    static async createUser(data) {
        return await prisma.user.create({
            data: {
                email: data.email,
                name: data.name,
                sex: data.sex,
                updated_at: new Date(),
            }
        })
    }



}

export default User