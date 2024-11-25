import prisma from "@/server/extension/db";

class Record{
    static async listRecords({ user_id, type, record_at}) {
        const condition = {
            user_id: user_id
        };
        if (type) {
            condition.type = type;
        }
        if (record_at) {
            condition.record_at = {
                gte: new Date(new Date(record_at).setHours(0, 0, 0, 0)),
                lte: new Date(new Date(record_at).setHours(23, 59, 59, 999))
            };
        }
        return await prisma.record.findMany({
            where: condition,
            orderBy: {
                record_at: 'desc'
            }
        });
    }

    static async createRecord({ type, record_at, value, user_id, is_breast ,direction}) {
        console.log('Record.createRecord', { type, record_at, value, user_id, is_breast ,direction})
        try {
            return await prisma.record.create({
                data: {
                    type: type,
                    record_at: new Date(record_at),
                    value: value,
                    user_id: user_id,
                    is_breast: is_breast || false,
                    created_at: new Date(),
                    updated_at: new Date(),
                    direction: direction
                }
            });
        }catch (e) {
            if (e) {
                console.log(e);
            } else {
                console.log('Unexpected null error');
            }
            return { error: e ? e.message : 'Unexpected null error' };
        }
    }

    static async summary({ user_id, type, record_at }) {
        const condition = {
            user_id: user_id
        };
        if (type) {
            condition.type = type;
        }
        if (record_at) {
            condition.record_at = {
                gte: new Date(new Date(record_at).setHours(0, 0, 0, 0)),
                lte: new Date(new Date(record_at).setHours(23, 59, 59, 999))
            };
        }

        return await prisma.record.groupBy({
            by: ['type'],
            where: condition,
            _count: {
                id: true
            },
            orderBy: {
                type: 'asc'
            }
        });

    }
}

export default Record