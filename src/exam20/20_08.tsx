import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

type UserType = {
    id: string;
    name: string;
    age: number;
};

// API
const instance = axios.create({ baseURL: "https://exams-frontend.kimitsu.it-incubator.ru/api/" });

const api = {
    getUsers(pageNumber: number) {
        return instance.get(`users?pageSize=${3}&pageNumber=${pageNumber}`);
    },
};

// Reducer
const initState = { page: 1, users: [] as UserType[] };
type InitStateType = typeof initState;

const appReducer = (state: InitStateType = initState, action: ActionsType): InitStateType => {
    switch (action.type) {
        case "SET_PAGE":
            return { ...state, page: action.page };
        case "SET_USERS":
            return { ...state, users: action.users };
        default:
            return state;
    }
};

// Store
const rootReducer = combineReducers({ app: appReducer });

const store = configureStore({ reducer: rootReducer });
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = ThunkDispatch<RootState, unknown, ActionsType>;
type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, ActionsType>;
const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const setPageAC = (page: number) => ({ type: "SET_PAGE", page }) as const;
const setUsersAC = (users: UserType[]) => ({ type: "SET_USERS", users }) as const;
type ActionsType = ReturnType<typeof setPageAC> | ReturnType<typeof setUsersAC>;

const getUsers = (): AppThunk => (dispatch, getState) => {
    /*const page = 1;*/
    const page = getState().app?.page
    api.getUsers(page).then((res) => dispatch(setUsersAC(res.data.items)));
};

// Components
export const App = () => {
    const page = useAppSelector((state) => state.app.page);
    const users = useAppSelector((state) => state.app.users);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getUsers());
    }, [page]);

    const pages = new Array(4).fill(1).map((p, i) => (
        <button key={i} onClick={() => dispatch(setPageAC(i + 1))} disabled={page === i + 1}>
            {i + 1}
        </button>
    ));

    return (
        <div>
            {users.map((u) => {
                return (
                    <div style={{ marginBottom: "25px" }} key={u.id}>
                        <p>
                            <b>name</b>: {u.name}
                        </p>
                        <p>
                            <b>age</b>: {u.age}
                        </p>
                    </div>
                );
            })}
            {pages}
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
// При переходе по страницам должны подгружаться новые пользователи.
// Однако в коде допущена ошибка и всегда подгружаются одни и теже пользователи.
// Задача: найти эту ошибку, и исправленную версию строки написать в качестве ответа.

// 🖥 Пример ответа: {pages.next()} ответ не верен getState().app.page // ответ не верен getState().app?.page
// не верно api.getUsers(getState().app.page).then((res) => dispatch(setUsersAC(res.data.items)));