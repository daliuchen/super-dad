import {BadRequestError} from "@/server/exception";
import ActionType from "@/server/enum/record";



function milkAndBreastValidate(req){
    if(!req.value){
        throw new BadRequestError('value不能为空');
    }
    if(!req.record_at){
        throw new BadRequestError('record_at不能为空');
    }
    if(!req.direction){
        throw new BadRequestError('direction不能为空');
    }
}


function peeAndPooValidate(req){
    if(!req.record_at){
        throw new BadRequestError('record_at不能为空');
    }
}


function postRecordValidate(req){
    if (!req.type){
        throw new BadRequestError('type不能为空');
    }
    const validates = new Map([
        [ActionType.MILK, milkAndBreastValidate],
        [ActionType.BREAST, milkAndBreastValidate],
        [ActionType.PEE, peeAndPooValidate],
        [ActionType.POOP, peeAndPooValidate]
    ]);
    validates.get(req.type)(req)
}
export {postRecordValidate}