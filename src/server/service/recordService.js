import prisma from "@/server/extension/db";
import Record from "@/server/model/record";

class RecordService {
    static async listRecords({ user_id, type, record_at }) {
       return await Record.listRecords({ user_id, type, record_at });
    }

    static async createRecord({ type, record_at, value, user_id, is_breast ,direction}) {
        return await Record.createRecord({ type, record_at, value, user_id, is_breast ,direction});
    }
    static async summary({ user_id, type, record_at }) {
        return await Record.summary({ user_id, type, record_at });
    }
}

export default RecordService;