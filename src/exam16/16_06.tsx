import React from "react";
import ReactDOM from "react-dom/client";
import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

// Types
type PhotoType = {
    albumId: string;
    id: string;
    title: string;
    url: string;
};

// Api
const instance = axios.create({ baseURL: "https://exams-frontend.kimitsu.it-incubator.ru/api/" });

const photosAPI = {
    getPhotos() {
        return instance.get<PhotoType[]>("photos?delay=2");
    },
};

// Reducer
const initState = {
    isLoading: false,
    photos: [] as PhotoType[],
};

type InitStateType = typeof initState;

const photoReducer = (state: InitStateType = initState, action: ActionsType): InitStateType => {
    switch (action.type) {
        case "PHOTO/GET-PHOTOS":
            return { ...state, photos: action.photos };
        case "PHOTO/IS-LOADING":
            return { ...state, isLoading: action.isLoading };
        default:
            return state;
    }
};

const getPhotosAC = (photos: PhotoType[]) => ({ type: "PHOTO/GET-PHOTOS", photos }) as const;
const setLoadingAC = (isLoading: boolean) => ({ type: "PHOTO/IS-LOADING", isLoading }) as const;
type ActionsType = ReturnType<typeof getPhotosAC> | ReturnType<typeof setLoadingAC>;

const getPhotosTC = (): AppThunk => (dispatch) => {
    dispatch(setLoadingAC(true));
    photosAPI.getPhotos().then((res) => {
        dispatch(getPhotosAC(res.data));
        dispatch(setLoadingAC(false)); //верный ответ ❌

    });
};

// Store
const rootReducer = combineReducers({
    photo: photoReducer,
});

const store = configureStore({ reducer: rootReducer });
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = ThunkDispatch<RootState, unknown, ActionsType>;
type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, ActionsType>;
const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Loader
export const Loader = () => {
    return <h1>Loading ...</h1>;
};

// App
const App = () => {
    const dispatch = useAppDispatch();
    const photos = useAppSelector((state) => state.photo.photos);
    const isLoading = useAppSelector((state) => state.photo.isLoading);

    const getPhotosHandler = () => {
        dispatch(getPhotosTC());
    };

    return (
        <>
            <h1>📸 Фото</h1>
            <button onClick={getPhotosHandler}>Подгрузить фотографии</button>
            {isLoading && <Loader />}
            <div style={{ display: "flex", gap: "20px", margin: "20px" }}>
                {photos.map((p) => {
                    return (
                        <div key={p.id}>
                            <b>title</b>: {p.title}
                            <div>
                                <img src={p.url} alt="" />
                            </div>
                        </div>
                    );
                })}
            </div>
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
// При нажатии на кнопку "Подгрузить фотографии" вы должны увидеть Loading...,
// и через 3 секунды непосредственно фотографии.
// Но после подгрузки данных Loader не убирается.
// Какой код нужно написать, чтобы Loader перестал отображаться после получения данных
// В качестве ответа напишите строку кода.

// 🖥 Пример ответа: console.log('stop Loader')