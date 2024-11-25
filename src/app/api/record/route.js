import {NextResponse} from "next/server";
import {warpError} from "@/server/util/error";
import RecordService from "@/server/service/recordService";
import {postRecordValidate} from "@/server/validation/record";
import {getCurrentUser} from "@/server/util/user";
import {serializeRecord, serializeRecords} from "@/server/serialization/record";

export async function POST(req) {
    let body;
    try {
        body = await req.json();
    } catch (error) {
        return NextResponse.json({errorMessage: "Invalid JSON"}, {status: 400});
    }
    try {
        postRecordValidate(body)
        body.user_id = getCurrentUser(req);
        const record = await RecordService.createRecord(body);
        return NextResponse.json({
            data: serializeRecord(record)
        });
    } catch (error) {
        return warpError(error);
    }
}

export async function GET(req) {
    const searchParams = req.nextUrl.searchParams
    const query = Object.fromEntries(searchParams.entries());
    query.user_id = getCurrentUser(req);
    try {
        const records = await RecordService.listRecords(query);
        return NextResponse.json({
            data: serializeRecords(records)
        });
    } catch (error) {
        return warpError(error);
    }
}
