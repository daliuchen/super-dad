import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit'
import {createUser, getCurrentUser} from "@/api/user";
import {createRecord, listRecords} from "@/api/record";


export const recordsSlice = createSlice({
    name: 'records',
    initialState: {
        records: [],

        isLoading: false,
        errorMessage: null,
        status: null
    },
    reducers: {
        addRecord: (state, action) => {
            state.records.push(action.payload)
        }
    },
    extraReducers: builder => {
        builder.addCase(fireListRecordsThunk.pending, state => {
            state.isLoading = true
            state.errorMessage = null
            state.status = null
        })
        builder.addCase(fireListRecordsThunk.fulfilled, (state, action) => {
            state.isLoading = false
            state.errorMessage = null
            state.status = null

            state.records = action.payload
        })
        builder.addCase(fireListRecordsThunk.rejected, (state, action) => {
            state.isLoading = false
            state.errorMessage = action.payload.errorMessage
            state.status = action.payload.status
        })
        builder.addCase(fireCreateRecordThunk.pending, state => {
            state.isLoading = true
            state.errorMessage = null
            state.status = null
        })
        builder.addCase(fireCreateRecordThunk.fulfilled, (state, action) => {
            state.isLoading = false
            state.errorMessage = null
            state.status = null

            state.records.push(action.payload)
        })
        builder.addCase(fireCreateRecordThunk.rejected, (state, action) => {
            state.isLoading = false
            state.errorMessage = action.payload.errorMessage
            state.status = action.payload.status
        })
    }
})


export const fireListRecordsThunk = createAsyncThunk(
    "records/fireListRecords",
    async (args, thunkAPI) => {
        try {
            const {data} = await listRecords(args)
            return data
        } catch (e) {
            return thunkAPI.rejectWithValue({
                status: e.response.status,
                errorMessage: e.response.data.errorMessage
            })
        }
    }
)


export const fireCreateRecordThunk = createAsyncThunk(
    "records/fireCreateRecord",
    async (args, thunkAPI) => {
        try {
            const {data} = await createRecord(args)
            return data
        } catch (e) {
            return thunkAPI.rejectWithValue({
                status: e.response.status,
                errorMessage: e.response.data.errorMessage
            })
        }
    }
)

export const { addRecord } = recordsSlice.actions;
export default recordsSlice.reducer
