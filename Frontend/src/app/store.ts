import { combineReducers, configureStore } from "@reduxjs/toolkit";
import taskReducer from "../features/tasks";


const rootReducer = combineReducers({
    tasks: taskReducer,
});

export const store = configureStore({
    reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;