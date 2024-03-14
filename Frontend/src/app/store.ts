import { combineReducers, configureStore } from "@reduxjs/toolkit";
import taskReducer from "../features/tasks";
import weatherReducer from "../features/weather";


const rootReducer = combineReducers({
    tasks: taskReducer,
    weatherReducer: weatherReducer,
});

export const store = configureStore({
    reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;