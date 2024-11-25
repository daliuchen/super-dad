import {NextResponse} from "next/server";
import {warpError} from "@/server/util/error";
import RecordService from "@/server/service/recordService";
import {postRecordValidate} from "@/server/validation/record";
import {getCurrentUser} from "@/server/util/user";
import {serializeRecord, serializeRecords, serializeSummary} from "@/server/serialization/record";


export async function GET(req) {
    const searchParams = req.nextUrl.searchParams
    const query = Object.fromEntries(searchParams.entries());
    query.user_id = getCurrentUser(req);
    try {
        const records = await RecordService.summary(query);
        return NextResponse.json({
            data: serializeSummary(records)
        });
    } catch (error) {
        return warpError(error);
    }
}
