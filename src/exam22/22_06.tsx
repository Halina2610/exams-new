import ReactDOM from 'react-dom/client';
import React from 'react';

export const Jpegs = () => {

    return (
        <div>
            <iframe
                src="//coub.com/embed/2wp0wa?muted=false&autostart=false&originalSize=false&startWithHD=true"
                frameBorder="0"
                width="640"
                height="360"
                allow="autoplay"
                allowFullScreen //verno
            />
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<Jpegs/>);

// 📜 Описание:
// Пользователи жалуются, что нельзя развернуть видео на весь экран
// В качестве ответа укажите исправленную или добавленную строку кода
//
// 🖥 Пример ответа: iframe.станьНаВесьЭкранПожалуйста()
