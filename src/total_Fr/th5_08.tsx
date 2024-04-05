import ReactDOM from "react-dom/client";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import React, { FC, useEffect } from "react";
import axios from "axios";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

// Styles
const table: React.CSSProperties = {
    borderCollapse: "collapse",
    width: "100%",
    tableLayout: "fixed",
};

const th: React.CSSProperties = {
    padding: "10px",
    border: "1px solid black",
    background: "lightgray",
    cursor: "pointer",
};

const td: React.CSSProperties = {
    padding: "10px",
    border: "1px solid black",
};

const thActive: React.CSSProperties = {
    padding: "10px",
    border: "1px solid black",
    background: "lightblue",
    cursor: "pointer",
};

// Types
type UserType = {
    id: string;
    name: string;
    age: number;
};

type UsersResponseType = {
    items: UserType[];
    totalCount: number;
};

type ParamsType = {
    sortBy: string | null;
    sortDirection: "asc" | "desc" | null;
};

// API
const instance = axios.create({ baseURL: "https://exams-frontend.kimitsu.it-incubator.ru/api/" });

const api = {
    getUsers(params?: ParamsType) {
        return instance.get<UsersResponseType>("users", { params });
    },
};

// Reducer
const initState = {
    users: [] as UserType[],
    params: {
        sortBy: "name",
        sortDirection: "asc",
    } as ParamsType,
};
type InitStateType = typeof initState;

const appReducer = (state: InitStateType = initState, action: ActionsType): InitStateType => {
    switch (action.type) {
        case "SET_USERS":
            return { ...state, users: action.users };
        case "SET_PARAMS":
            return { ...state, params: { ...state.params, ...action.payload } };
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

const setUsersAC = (users: UserType[]) => ({ type: "SET_USERS", users }) as const;
const setParamsAC = (payload: ParamsType) => ({ type: "SET_PARAMS", payload }) as const;
type ActionsType =
    | ReturnType<typeof setUsersAC>
    | ReturnType<typeof setParamsAC>

// Thunk
const getUsersTC = (): AppThunk => (dispatch, getState) => {
    const params = getState().app.params;
    api.getUsers(params).then((res) => dispatch(setUsersAC(res.data.items)));
};

export const Users = () => {
    const users = useAppSelector((state) => state.app.users);
    const sortBy = useAppSelector((state) => state.app.params.sortBy);
    const sortDirection = useAppSelector((state) => state.app.params.sortDirection);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getUsersTC());
    }, [sortBy, sortDirection]);

    const sortHandler = (sortBy: string) => {
        const direction = sortDirection === "asc" ? "desc" : "asc";
        dispatch(setParamsAC({ sortBy, sortDirection: direction }));
    };

    return (
        <div>
            <h1>👪 Список пользователей</h1>
            <table style={table}>
                <thead>
                <tr>
                    <Th name={"name"} sortHandler={sortHandler} />
                    <Th name={"age"} sortHandler={sortHandler} />
                </tr>
                </thead>
                <tbody>
                {users.map((u) => {
                    return (
                        <tr key={u.id}>
                            <td style={td}>{u.name}</td>
                            <td style={td}>{u.age}</td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
};

type ThPropsType = {
    name: string;
    sortHandler: (name: string) => void;
};

const Th: FC<ThPropsType> = ({ name, sortHandler }) => {
    const sortBy = useAppSelector((state) => state.app.params.sortBy);
    const sortDirection = useAppSelector((state) => state.app.params.sortDirection);
    /*const condition1 = "❗❗❗ XXX ❗❗❗";
       const condition2 = "❗❗❗ YYY ❗❗❗";*/

    const condition1= sortBy === name
    const condition2= sortDirection === "asc"

    return (
        <th style={condition1 ? thActive : th} onClick={() => sortHandler(name)}>
            {name}
            {condition1 && (condition2 ? <span> ⬆</span> : <span> ⬇</span>)}
        </th>
    );
};

const Th2: FC<ThPropsType> = ({ name, sortHandler }) => {
    const sortBy = useAppSelector((state) => state.app.params.sortBy);
    const sortDirection = useAppSelector((state) => state.app.params.sortDirection);

    return (
        <th
            style={sortBy === name ? thActive : th}
            onClick={() => sortHandler(name)}
        >
            {name} {sortBy === name ? (sortDirection === "asc" ? "⬆️" : "⬇️") : null}
        </th>
    );
};


const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <Provider store={store}>
        <Users />
    </Provider>,
);

// 📜 Описание:
// Перед вами таблица с пользователями.
// Покликайте по вкладкам age и name и убедитесь, что сортировка работает верно,
// но в шапке некорректно отображаются стрелки и не видно активной колонки
// Ваша задача написать правильные условия вместо XXX и YYY, чтобы:
// 1) Стрелки соответствовали сортировке (если сортировка от меньшего к большему, то стрелка вверх)
// 2) Шапка активной колонки была голубая, а неактивной серая
// ❗ Ответ дайте через пробел

// 🖥 Пример ответа: a === '1' b !== a