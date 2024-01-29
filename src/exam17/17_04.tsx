import React from 'react'
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes} from 'react-router-dom'

export const Main = () => {
    return (
        <>
            <h2>✅ Список тудулистов</h2>
            <h2>📜 Список постов</h2>
        </>
    )
}

// App
export const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<Main />} />
            </Routes>
        </BrowserRouter>

    )
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App/>)

// 📜 Описание:
// Белый экран... Приложение не работает.
// Найдите и исправьте ошибку, чтобы на экране отобразилось 2 заголовка.
// Исправленную версию строки напишите в качестве ответа.

// 🖥 Пример ответа: <Route path={'/'} component={<Main/>}/> ответ <BrowserRouter>
//             <Routes>
//                 <Route path={'/'} element={<Main />} />
//             </Routes>
//         </BrowserRouter>
