import User from "@/server/model/user";
import {BadRequestError} from "@/server/exception";
import {generateToken} from "@/server/util/jwt";

class UserService {
    static async login({email,name,sex}) {
        let user = await User.getUserByEmail(email)
        if(user){
            if (user.name !== name  || user.sex !== sex){
                throw new BadRequestError("用户已经注册，但是信息不匹配")
            }
        }else {
            user = await User.createUser({
                email,
                name,
                sex
            })
        }
        return generateToken({ id: user.id });
    }

    static async getUser(id) {
        return await User.getUserById(id);
    }
}

export default UserService