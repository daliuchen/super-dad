import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit'
import {createUser, getCurrentUser} from "@/api/user";




const initialState = {
    id: null,
    email: null,
    name: null,
    sex:null,
    token: typeof localStorage !== 'undefined'? localStorage.getItem('super-dad-token'): null,
    isLoading: false,
    errorMessage:null,
    status:null
}

export const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState,
    reducers: {
    },
    extraReducers: builder => {
        builder
            .addCase(fetchCurrentUserThunk.pending, state => {
                state.isLoading = true
                state.errorMessage = null
                state.status = null
            })
            .addCase(fetchCurrentUserThunk.fulfilled, (state, action) => {
                state.errorMessage = null
                state.status = null
                state.isLoading = false
                state.id = action.payload.id
                state.email = action.payload.email
                state.name = action.payload.name
                state.sex = action.payload.sex
            })
            .addCase(fetchCurrentUserThunk.rejected, (state,action) => {
                state.isLoading = false
                state.errorMessage = action.payload.errorMessage
                state.status = action.payload.status
            })
            .addCase(postUserLoginThunk.pending, state => {
                state.isLoading = true
                state.errorMessage = null
                state.status = null
            })
            .addCase(postUserLoginThunk.fulfilled, (state, action) => {
                state.isLoading = false
                state.errorMessage = null
                state.status = null
                state.token = action.payload
                if (typeof localStorage !== 'undefined') {
                    localStorage.setItem('super-dad-token', state.token);
                }
            })
            .addCase(postUserLoginThunk.rejected, (state, action) => {
                state.isLoading = false
                state.errorMessage = action.payload.errorMessage
                state.status = action.payload.status
            })
    },
})


export const fetchCurrentUserThunk = createAsyncThunk(
    "currentUser/fetchCurrentUser",
    async(_args, thunkAPI) => {
        try {
            const {data}=await getCurrentUser()
            return data
        }catch (e) {
            return thunkAPI.rejectWithValue({
                status:e.response.status,
                errorMessage:e.response.data.errorMessage
            })
        }
    }
)

export const postUserLoginThunk = createAsyncThunk(
    "currentUser/postUserLogin",
    async (args, thunkAPI) => {
        try {
            const {data} = await createUser(args)
            return data
        } catch (e) {
            return thunkAPI.rejectWithValue({
                status: e.response.status,
                errorMessage: e.response.data.errorMessage
            })
        }
    }
)


// export const isUserAuthTokenExists = createSelector(
//     (state) => state.currentUser,
//     (_state) => {},
//     (currentUser, _) => currentUser.token!=null
// )


export default currentUserSlice.reducer
