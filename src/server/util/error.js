import {NextResponse} from "next/server";
import {BadRequestError, ForbiddenError, NotFoundError, UnauthorizedError} from "@/server/exception";

export function warpError(error) {
    if (error instanceof BadRequestError) {
        return NextResponse.json({ errorMessage: error.message }, { status: 400 });
    }
    if (error instanceof UnauthorizedError) {
        return NextResponse.json({ errorMessage: error.message }, { status: 401 });
    }
    if (error instanceof ForbiddenError) {
        return NextResponse.json({ errorMessage: error.message }, { status: 403 });
    }
    if (error instanceof NotFoundError) {
        return NextResponse.json({ errorMessage: error.message }, { status: 404 });
    }
    console.log(error)
    return NextResponse.json({ errorMessage: "Internal Server Error" }, { status: 500 });
}