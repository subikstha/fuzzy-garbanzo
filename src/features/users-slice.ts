import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

import data from '../api/data.json'

type UsersState = {
    entities: User[]
}

type DraftUser = RequireOnly<User, 'realName' | 'alterEgo'>

const initialState: UsersState = {
    entities: data.users
}

const createUser = (draftUser: DraftUser): User => {
    return {
        id: nanoid(), // keeping id here guarantees there will be an id
        tasks: [],
        ...draftUser,
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