import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

// Types
type PostType = {
    id: string;
    body: string;
    title: string;
    userId: string;
};

// Api
const instance = axios.create({ baseURL: "https://exams-frontend.kimitsu.it-incubator.ru/api/" });

const postsAPI = {
    getPosts() {
        return instance.get<PostType[]>("posts");
    },
};

// Reducer
const initState = [] as PostType[];

type InitStateType = typeof initState;

const postsReducer = (
    state: InitStateType = initState,
    action: GetPostsActionType,
): InitStateType => {
    switch (action.type) {
        case "POSTS/GET-POSTS":
            return action.posts;
    }
    return state;
};

const getPostsAC = (posts: PostType[]) => ({ type: "POSTS/GET-POSTS", posts }) as const;
type GetPostsActionType = ReturnType<typeof getPostsAC>;

const getPostsTC = (): AppThunk => (dispatch) => {
    postsAPI.getPosts().then((res) => {
        dispatch(getPostsAC(res.data));
    });
};

// Store
const rootReducer = combineReducers({
    posts: postsReducer,
});

const store = configureStore({ reducer: rootReducer });
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = ThunkDispatch<RootState, unknown, GetPostsActionType>;
type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, GetPostsActionType>;
const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// App
const App = () => {
    const dispatch = useAppDispatch();
    const posts = useAppSelector((state) => state.posts);

    useEffect(() => {
        //  dispatch(getPostsTC);
        dispatch(getPostsTC());
    }, []);

    return (
        <>
            <h1>📜 Список постов</h1>
            {posts.length ? (
                posts.map((p) => {
                    return (
                        <div key={p.id}>
                            <b>title</b>: {p.title}
                        </div>
                    );
                })
            ) : (
                <h2>Постов нету 😥</h2>
            )}
        </>
    );
};

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <Provider store={store}>
        <App />
    </Provider>,
);

// 📜 Описание:
// При загрузке приложения вы должны увидеть список постов,
// но из-за невнимательности была допущена ошибка.

// Найдите и исправьте ошибку
// Исправленную версию строки напишите в качестве ответа.
// 🖥 Пример ответа: type InitStateType = typeof initState

// P.S. Эта ошибка из реальной жизни, студенты так часто ошибаются и не могут понять в чем дело. dispatch(getPostsTC());