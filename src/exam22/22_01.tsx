import ReactDOM from 'react-dom/client';
import React, { FC, ReactNode } from 'react'

const quizStyle: React.CSSProperties = {
    background: 'lightgreen',
    padding: '10px',
    margin: '10px'
}

type BtnPropsType = {
    question: ReactNode
    children: ReactNode
}

const Block: FC<BtnPropsType> = ({question, children}) => {
    return (
        <div style={{display: 'flex', alignItems: 'center'}}>
            {question} = {children}
        </div>
    )
}


const quiz = [
    {id: 1, question: '1 + 1', answer: '2'},
    {id: 2, question: '2 + 2', answer: '4'},
    {id: 3, question: '3 + 3', answer: '6'},
]

const App2 = () => {

    return (
        <div>
            {quiz.map((q) => {
                return (
                    <Block question={'❗❗❗ XXX ❗❗❗'}>
                        ❗❗❗ YYY ❗❗❗
                    </Block>
                )
            })}
        </div>
    )
}

const App = () => {
    return (
        <div>
            {quiz.map((q) => {
                return (
                    <Block question={<h2 style={quizStyle}>{q.question}</h2>}>
                        <h2 style={quizStyle}>{q.answer}</h2>
                    </Block>
                )
            })}
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App/>);

// 📜 Описание:
// Что необходимо написать вместо XXX и YYY, чтобы на экране отобразились вопросы и ответы из массива quiz.
// 1 + 1 = 2
// 2 + 2 = 4
// 3 + 3 = 6
// ❗ Вопрос и ответ должны быть тегом h2 и к ним должен быть прикреплен стиль quizStyle
// ❗ Ответ дайте через пробел

// 🖥 Пример ответа: quiz[0]=yes redux=h2
