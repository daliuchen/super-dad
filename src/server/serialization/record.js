export function serializeRecord(data) {
    const typeActionMapping = {
        "MILK": milkExtra,
        "BREAST": breastExtra,
        "PEE": peeExtra,
        "POOP": poopExtra
    }
    const extra = typeActionMapping[data.type](data)
    const res = {...data,...extra}
    return res
}

export function serializeRecords(data) {
    return data.map(serializeRecord)
}

export function serializeSummary(data) {
    return data.map(({type, _count}) => {
        return {
            type,
            count: _count.id
        }
    })
}

function milkExtra(record) {
    const recordTimeStr = new Date(record.record_at).toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" })

    let description =  `${recordTimeStr} 喝了`
    if (record.is_breast) {
        description += `母乳 ${record.value}ml`
    }else{
        description += `奶粉 ${record.value}ml`
    }
    const name = '喝奶'
    return {description,name}
}

function breastExtra(record) {
    const recordTimeStr = new Date(record.record_at).toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" })
    let description =  `${recordTimeStr} 吃了`
    if(record.direction==="LEFT"){
        description += `左边 ${record.value}分钟`
    }else if(record.direction==="RIGHT") {
        description += `右边 ${record.value}分钟`
    }else{
        description += `${record.value}分钟`
    }
    const name = '母乳'
    return {description,name}
}

function peeExtra(record) {
    const recordTimeStr = new Date(record.record_at).toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" })
    const description =  `${recordTimeStr} 尿尿了`
    const name = '尿尿'
    return {description,name}
}

function poopExtra(record) {
    const recordTimeStr = new Date(record.record_at).toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" })
    const description =  `${recordTimeStr} 便便了`
    const name = '便便'
    return {description,name}
}