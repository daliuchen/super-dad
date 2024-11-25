// src/utils/jwt.js
import jwt from 'jsonwebtoken';
import {UnauthorizedError} from "@/server/exception";
import {jwtVerify} from 'jose';


const secretKey = new TextEncoder().encode(process.env.JWT);

export function generateToken(payload) {
    return jwt.sign(payload, secretKey, {expiresIn: '30d'});
}

export async function verifyToken(token) {
    try {
        const {payload} = await jwtVerify(token, secretKey)
        return payload
    }catch (error){
        throw new UnauthorizedError('token无效');
    }
}