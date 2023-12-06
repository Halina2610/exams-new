import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client';

// Types
type PostType = {
    id: string
    body: string
    title: string
    userId: string
}


// Api
const instance = axios.create({baseURL: 'https://exams-frontend.kimitsu.it-incubator.ru/api/'})

const postsAPI = {
    getPosts() {
        // Promise.resolve() стоит в качестве заглушки, чтобы TS не ругался и код компилировался
        // Promise.resolve() нужно удалить и написать правильный запрос для получения постов
        return instance.get<PostType[]>('posts'); //ответ
    },
}


// App
export const App = () => {

    const [posts, setPosts] = useState<PostType[]>([])

    useEffect(() => {
        postsAPI.getPosts()
            .then((res: any) => {
                setPosts(res.data)
            })
    }, [])


    return (
        <>
            <h1>📜 Список постов</h1>
            {
                posts.length
                    ? posts.map(p => {
                        return <div key={p.id}><b>title</b>: {p.title}</div>
                    })
                    : <h2>Постов нету 😥</h2>
            }
        </>
    )
}


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App/>)

// 📜 Описание:
// Напишите запрос на сервер для получения всех постов
// Типизацию возвращаемых данных в ответе указывать необязательно, но можно и указать (в ответах учтены оба варианта).
// Исправленную версию строки напишите в качестве ответа.

// 🖥 Пример ответа: return Promise.resolve() Ответ return instance.get<PostType[]>('posts');
