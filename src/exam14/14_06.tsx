import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client';

// Types
type TodoType = {
    id: string;
    tile: string;
    order: number;
    createdAt: string;
    updatedAt: string;
    complete: boolean;
}


// Api
const instance = axios.create({baseURL: 'https://exams-frontend.kimitsu.it-incubator.ru/api/'})

const todosAPI = {
    getTodos() {
        return instance.get<TodoType[]>('todos')
    },
}


// App
const App = () => {

    const [todos, setTodos] = useState<TodoType[]>([])

    useEffect(() => {
        todosAPI.getTodos().then((res) => setTodos(res.data))
    }, [])

    return (
        <>
            <h2>✅ Список тудулистов</h2>
            {
                todos.map((t) => {
                    return (
                        <div style={t.complete ? {color: 'grey'} : {}} key={t.id}>
                            <input type="checkbox" checked={t.complete}/>
                            <b>Описание</b>: {t.tile}
                        </div>
                    )
                })
            }
        </>
    )
}


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App/>)

// 📜 Описание:
// При написании типизации по невнимательности было допущено несколько ошибок.
// Напишите через пробел правильные свойства в TodoType, в которых была допущена ошибка.
// Debugger / network / документация вам в помощь

// 🖥 Пример ответа: id status isDone Ответ неверный: id title order createdAt updatedAt complete
