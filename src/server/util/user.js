

export function getCurrentUser(req){
    return parseInt(req.headers.get('x-user-id'),10)
}