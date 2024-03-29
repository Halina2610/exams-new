import React from 'react'
import ReactDOM from 'react-dom/client';

export const App = () => {
    return (
        <div>
            <h2>Для чего надо добавлять файлы в .gitignore ?</h2>
            <ul>
                <li>1 - Чтобы git удалял их историю, храня только последнюю версию</li>
                <li>2 - Чтобы git при работе с этими файлам уведомлял при их изменении</li>
                <li>3 - Чтобы git не следил за изменениями в данных файлах</li>
                <li>4 - Файл .gitignore не несет никакой смысловой нагрузки, т.к. все файлы с которыми мы работаем должны
                    отслеживаться. Соответственно никакие файлы в .gitignore добавлять не нужно
                </li>
                <li>5 - Нет правильного ответа</li>
            </ul>
        </div>
    )
}


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App/>);

// 📜 Описание:
// Для чего надо добавлять файлы в .gitignore ?
// Может быть несколько вариантов ответа (ответ дайте через пробел).
// ❗ Ответ будет засчитан как верный, только при полном правильном совпадении.
// Если указали правильно один вариант (1),
// а нужно было указать два варианта (1 и 2), то ответ в данном случае будет засчитан как неправильный

// 🖥 Пример ответа: 1 ответ 3
