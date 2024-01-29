import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import axios, { AxiosError } from "axios";
import { configureStore, combineReducers, Dispatch } from "@reduxjs/toolkit";

// TYPES
type TodoType = {
    id: string;
    title: string;
    order: number;
    createdAt: string;
    updatedAt: string;
    completed: boolean;
};

type UserType = {
    id: string;
    name: string;
    age: number;
};

type UsersResponseType = {
    items: UserType[];
    totalCount: number;
};

// API
const instance = axios.create({ baseURL: "https://exams-frontend.kimitsu.it-incubator.ru/api/" });

const api = {
    getTodos() {
        return instance.get<TodoType[]>("todo");
    },
    getUsers() {
        return instance.get<UsersResponseType>("user");
    },
};

// Reducer
const initState = {
    isLoading: false,
    error: null as string | null,
    todos: [] as TodoType[],
    users: [] as UserType[],
};

type InitStateType = typeof initState;

const appReducer = (state: InitStateType = initState, action: ActionsType): InitStateType => {
    switch (action.type) {
        case "APP/GET-TODOS":
            return { ...state, todos: action.todos };
        case "APP/GET-USERS":
            return { ...state, users: action.users };
        case "APP/IS-LOADING":
            return { ...state, isLoading: action.isLoading };
        case "APP/SET-ERROR":
            return { ...state, error: action.error };
        default:
            return state;
    }
};

const getUsersAC = (users: UserType[]) => ({ type: "APP/GET-USERS", users }) as const;
const getTodosAC = (todos: TodoType[]) => ({ type: "APP/GET-TODOS", todos }) as const;
const setLoadingAC = (isLoading: boolean) => ({ type: "APP/IS-LOADING", isLoading }) as const;
const setError = (error: string | null) => ({ type: "APP/SET-ERROR", error }) as const;

type ActionsType =
    | ReturnType<typeof getUsersAC>
    | ReturnType<typeof getTodosAC>
    | ReturnType<typeof setLoadingAC>
    | ReturnType<typeof setError>;

// Utils functions
function baseErrorHandler(dispatch: Dispatch, message: string) {
    dispatch(setError(message));
    dispatch(setLoadingAC(false));
}

// Thunk
const getTodosTC = (): AppThunk => (dispatch) => {
    dispatch(setLoadingAC(true));
    api
        .getTodos()
        .then((res) => {
            dispatch(getTodosAC(res.data));
            dispatch(setLoadingAC(false));
        })
        .catch((e: AxiosError) => {
            // ❗❗❗ XXX ❗❗❗
        });
};

const getUsersTC = (): AppThunk => (dispatch) => {
    dispatch(setLoadingAC(true));
    api
        .getUsers()
        .then((res) => {
            dispatch(getUsersAC(res.data.items));
            dispatch(setLoadingAC(false));
        })
        .catch((e: AxiosError) => {
            baseErrorHandler( dispatch, e.message) //верно
        });
};

// Store
const rootReducer = combineReducers({
    app: appReducer,
});

const store = configureStore({ reducer: rootReducer });
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = ThunkDispatch<RootState, unknown, ActionsType>;
type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, ActionsType>;
const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// COMPONENTS
// Loader
export const Loader = () => {
    return <h1>Loading ...</h1>;
};

const App = () => {
    return (
        <>
            <h1>✅Todos & 🙂Users</h1>
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                <Todos />
                <Users />
            </div>
        </>
    );
};

const Todos = () => {
    const dispatch = useAppDispatch();
    const todos = useAppSelector((state) => state.app.todos);
    const error = useAppSelector((state) => state.app.error);
    const isLoading = useAppSelector((state) => state.app.isLoading);

    useEffect(() => {
        dispatch(getTodosTC());
    }, []);

    return (
        <div>
            <h2>✅ Список тудулистов</h2>
            {!!error && <h2 style={{ color: "red" }}>{error}</h2>}
            {isLoading && <Loader />}
            {todos.map((t) => {
                return (
                    <div style={t.completed ? { color: "grey" } : {}} key={t.id}>
                        <input type="checkbox" checked={t.completed} />
                        <b>Описание</b>: {t.title}
                    </div>
                );
            })}
        </div>
    );
};

const Users = () => {
    const dispatch = useAppDispatch();
    const users = useAppSelector((state) => state.app.users);
    const error = useAppSelector((state) => state.app.error);
    const isLoading = useAppSelector((state) => state.app.isLoading);

    useEffect(() => {
        dispatch(getUsersTC());
    }, []);

    return (
        <div>
            <h2>🙂 Список юзеров</h2>
            {!!error && <h2 style={{ color: "red" }}>{error}</h2>}
            {isLoading && <Loader />}
            <div>
                {users.map((u) => {
                    return (
                        <div key={u.id}>
                            <b>name</b>:{u.name} - <b>age</b>:{u.age}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <Provider store={store}>
        <App />
    </Provider>,
);

// 📜 Описание:
// Перед вами список тудулистов и пользователей, которые находятся в постоянной загрузке.
// Откройте network и вы увидите что запросы падают с ошибками,
// но в коде этот никак не обрабатывается.
// Для обработки ошибок написана утилитная функция baseErrorHandler.
// Ваша задача воспользоваться этой функцией и вывести ошибки на экран.
// Что нужно написать вместо XXX, чтобы ошибки обработались и пользователь их увидел ?
//❗ Код фиксить не нужно.

// 🖥 Пример ответа: dispatch(setLoadingAC(false))