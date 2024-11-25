import {NextResponse} from "next/server";
import UserService from "@/server/service/user";
import {warpError} from "@/server/util/error";
import {getCurrentUser} from "@/server/util/user";

export async function GET(req) {
    const user_id = getCurrentUser(req);
    try {
        const user = await UserService.getUser(user_id);
        return NextResponse.json({
            data: user
        });
    } catch (error) {
        return warpError(error);
    }
}