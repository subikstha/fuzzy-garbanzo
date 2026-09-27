import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { nanoid } from "nanoid"

import data from '../api/data.json'

export type TaskState = {
    entities: Task[]
}

type DraftTask = RequireOnly<Task, 'title'>// Make all properties of Task optional

const createTask = (draftTask: DraftTask): Task => {
    return {
        ...draftTask,
        id: nanoid()
    }
}

const initialState: TaskState = {
    entities:data.tasks
}

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<DraftTask>) => {
            const task = createTask(action.payload)
            state.entities.unshift(task)
        },
        removeTask: (state, action: PayloadAction<Task['id']>) => { // Here we could do <string>
            //const task = state.entities.find(t => t.id === action.payload)
            // state.entities.filter(s => s.id !== action.payload)
            const taskIndex = state.entities.findIndex(task => task.id === action.payload)
            state.entities.splice(taskIndex,1)
        }
    }
})

export const tasksReducer = tasksSlice.reducer
export const {addTask, removeTask} = tasksSlice.actions

export default tasksSlice
