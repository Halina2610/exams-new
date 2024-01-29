import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import axios, { AxiosError } from "axios";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

// Types
type PostType = {
    id: string;
    body: string;
    title: string;
    userId: string;
};

// Api
const instance = axios.create({ baseURL: "https://exams-frontend.kimitsu.it-incubator.ru/a  pi/" });

const postsAPI = {
    getPosts() {
        return instance.get<PostType[]>("posts");
    },
};

// Reducer
const initState = {
    error: null as string | null,
    posts: [] as PostType[],
};

type InitStateType = typeof initState;

const appReducer = (state: InitStateType = initState, action: ActionsType): InitStateType => {
    switch (action.type) {
        case "POSTS/GET-POSTS":
            return { ...state, posts: action.posts };

        case "POSTS/SET-ERROR":
            return { ...state, error: action.error };

        default:
            return state;
    }
};

const getPostsAC = (posts: PostType[]) => ({ type: "POSTS/GET-POSTS", posts }) as const;
const setErrorAC = (error: string | null) => ({ type: "POSTS/SET-ERROR", error }) as const;
type ActionsType = ReturnType<typeof getPostsAC> | ReturnType<typeof setErrorAC>;

// Thunk
const getPostsTC = (): AppThunk => (dispatch) => {
    postsAPI
        .getPosts()
        .then((res) => {
            dispatch(getPostsAC(res.data));
        })
        .catch((e: AxiosError) => {
            dispatch(setErrorAC(e.message)); // верный ответ ❌
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

// Components
export const App = () => {
    const dispatch = useAppDispatch();

    const posts = useAppSelector((state) => state.app.posts);
    const error = useAppSelector((state) => state.app.error);

    useEffect(() => {
        dispatch(getPostsTC());
    }, []);

    return (
        <>
            <h1>📜 Список постов</h1>
            {posts.length ? (
                posts.map((c) => {
                    return (
                        <div key={c.id}>
                            <b>Описание</b>: {c.body}{" "}
                        </div>
                    );
                })
            ) : (
                <h3>
                    ❌ Посты не подгрузились. Произошла какая-то ошибка. Выведите сообщение об ошибке на экран
                </h3>
            )}
            <h2 style={{ color: "red" }}>{!!error && error}</h2>
        </>
    );
};

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);