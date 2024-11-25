
import { NextResponse } from 'next/server';
import {BadRequestError, BaseError, ForbiddenError, NotFoundError, UnauthorizedError} from "@/server/exception";
import {warpError} from "@/server/util/error";
import {verifyToken} from "@/server/util/jwt";




export async  function middleware(req) {
    const nonAuthPaths = ['/api/user/login'];
    const url = new URL(req.url);
    const path = url.pathname;
    if (nonAuthPaths.includes(path)) {
        return NextResponse.next();
    }
    const authHeader = req.headers.get('authorization');
    try {
        if (!authHeader) {
            throw new UnauthorizedError('token无效');
        }
        const token = authHeader.split(' ')[1];
        if (!token) {
            throw new UnauthorizedError('token无效');
        }
        const {id}  =  await verifyToken(token);
        const requestHeaders = new Headers(req.headers);
        requestHeaders.set('x-user-id', id);
        return NextResponse.next({
            request: {
                headers: requestHeaders
            }
        });
    }catch (error){
        console.log(error)
        return warpError(error);
    }
}




export const config = {
    matcher: ['/api/:path*'],
};