import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

export type UsersState = {
    entities: User[]
}

type DraftUser = RequireOnly<User, 'realName'>

const initialState: UsersState = {
    entities: []
}

const createUser = (draftUser: DraftUser): User => {
    return {
        ...draftUser,
        id: nanoid(),
        tasks: [],
        alterEgo: ''
    }
}

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<DraftUser>) => {
            const user = createUser(action.payload)
            state.entities.unshift(user)
        }
    }
})

export const {addUser} = usersSlice.actions
export const usersReducer = usersSlice.reducer

export default usersSlice;