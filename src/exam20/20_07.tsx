import ReactDOM from "react-dom/client";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
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
const initState = { users: [] as UserType[] };
type InitStateType = typeof initState;

const appReducer = (state: InitStateType = initState, action: ActionsType): InitStateType => {
    switch (action.type) {
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

const setUsersAC = (users: UserType[]) => ({ type: "SET_USERS", users }) as const;
type ActionsType = ReturnType<typeof setUsersAC>;

// Thunk
const getUsersTC =
    (searchParams?: ParamsType): AppThunk =>
        (dispatch) => {
            api.getUsers(searchParams).then((res) => dispatch(setUsersAC(res.data.items)));
        };

export const Users = () => {
    const [activeColumn, setActiveColumn] = useState<ParamsType>({
        sortBy: null,
        sortDirection: "asc",
    });

    const users = useAppSelector((state) => state.app.users);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(activeColumn.sortBy ? getUsersTC(activeColumn) : getUsersTC());
    }, [activeColumn]);

    /*  const sortHandler = (sortBy: string) => {
          // ❗❗❗ XXX ❗❗❗
      };*/

    const sortHandler = (sortBy: string) => {
        let newSort: "asc" | "desc" = "asc";
        if (activeColumn.sortBy === sortBy && activeColumn.sortDirection === "asc") {
            newSort = "desc";
        }
        setActiveColumn({
            sortBy,
            sortDirection: newSort,
        });
    };

    return (
        <div>
            <h1>👪 Список пользователей</h1>
            <table style={table}>
                <thead>
                <tr>
                    <th style={th} onClick={() => sortHandler("name")}>
                        Name
                        {activeColumn?.sortBy === "name" &&
                            (activeColumn.sortDirection === "asc" ? (
                                <span> &#8593;</span>
                            ) : (
                                <span> &#8595;</span>
                            ))}
                    </th>
                    <th style={th} onClick={() => sortHandler("age")}>
                        Age
                        {activeColumn?.sortBy === "age" &&
                            (activeColumn.sortDirection === "asc" ? (
                                <span> &#8593;</span>
                            ) : (
                                <span> &#8595;</span>
                            ))}
                    </th>
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

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <Provider store={store}>
        <Users />
    </Provider>,
);

// 📜 Описание:
// Перед вами таблица с пользователями.
// Ваша задача вместо XXX написать код для сортировки пользователей по имени и возрасту.
// Т.е. при нажатии на name либо age пользователи должны сортироваться в таблице.
// При повторном нажатии на этот же столбец сортировка должна происходить в обратном порядке
// ❗ сортировка пользователей происходит на сервере, т.е. sort использовать не нужно

// 🖥 Пример ответа: sort(a, b) не верно   let newSort: "asc" | "desc" = "asc";
//         if (activeColumn.sortBy === sortBy && activeColumn.sortDirection === "asc") {
//             newSort = "desc";
//         }
//         setActiveColumn({
//             sortBy,
//             sortDirection: newSort,
//         });

// и это не верно    let newSortDirection: "asc" | "desc" = "asc";
//
//         if (activeColumn.sortBy === sortBy) {
//             newSortDirection = activeColumn.sortDirection === "asc" ? "desc" : "asc";
//         }
//         const newActiveColumn: ParamsType = {
//             sortBy,
//             sortDirection: newSortDirection,
//         };
//
//         setActiveColumn(newActiveColumn);
//❗❗❗ XXX ❗❗❗
//
//        Можно попробовать  const sortHandler = (sortBy: string) => {
//   // Проверяем, по какому столбцу нужно сортировать
//   if (sortBy === 'name') {
//     // Сортируем по имени
//     const sortedUsers = [...users].sort((a, b) => a.name.localeCompare(b.name));
//     // Если текущий столбец совпадает с активным столбцом, меняем направление сортировки
//     if (activeColumn.sortBy === 'name') {
//       sortedUsers.reverse();
//     }
//     // Обновляем состояние пользователей
//     dispatch(setUsers(sortedUsers));
//     // Обновляем активный столбец
//     setActiveColumn({ sortBy: 'name', sortDirection: activeColumn.sortDirection === 'asc' ? 'desc' : 'asc' });
//   } else if (sortBy === 'age') {
//     // Сортируем по возрасту
//     const sortedUsers = [...users].sort((a, b) => a.age - b.age);
//     // Если текущий столбец совпадает с активным столбцом, меняем направление сортировки
//     if (activeColumn.sortBy === 'age') {
//       sortedUsers.reverse();
//     }
//     // Обновляем состояние пользователей
//     dispatch(setUsers(sortedUsers));
//     // Обновляем активный столбец
//     setActiveColumn({ sortBy: 'age', sortDirection: activeColumn.sortDirection === 'asc' ? 'desc' : 'asc' });
//   }
// };