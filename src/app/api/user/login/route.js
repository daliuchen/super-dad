import {NextResponse} from "next/server";
import UserService from "@/server/service/user";
import {warpError} from "@/server/util/error";

export async function POST(req) {
    let body;
    try {
        body = await req.json();
    } catch (error) {
        return NextResponse.json({errorMessage: "Invalid JSON"}, {status: 400});
    }
    if (!body.email || !body.name || !body.sex) {
        return NextResponse.json({errorMessage: "Bad Request"}, {status: 400});
    }

    try {
        const token = await UserService.login(body);
        return NextResponse.json({
            data: token
        });
    } catch (error) {
        return warpError(error);
    }
}