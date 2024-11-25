import apiClient from "@/lib/axios";


export async function listRecords(query) {
    const {data} = await apiClient.get("/api/record",{params:query})
    return data
}

export async function createRecord(payload) {
    const {data} = await apiClient.post("/api/record", payload)
    return data
}

export async function summary(query) {
    const {data} = await apiClient.get("/api/record/summary",{params:query})
    return data
}