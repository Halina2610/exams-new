type StudentType = {
    id: number
    name: string
}

type FriendsType = {
    [key: string]: Array<string>
}

export const students: Array<StudentType> = [
    {id: 1, name: "Bob"},
    {id: 2, name: "Alex"},
    {id: 3, name: "Ann"},
    {id: 4, name: "Charley"},
]

export const friends: FriendsType = {
    1: ["Oliver", "Jack", "Oscar",],
    2: ["Jack", "Lewis", "Thomas",],
    3: ["William", "Michael", "Lewis",],
    4: ["Oscar", "James", "William",],
}

//Дан список студентов и структура,
//которая содержит список друзей каждого из студентов.
//Id студента является ключом к массиву его друзей.
//Какое значение лежит тут:  friends[3][1]? Каждый ключ объекта friends соответствует идентификатору студента, а значение является массивом его друзей.
//
// friends[3] вернет массив друзей студента с идентификатором 3, который имеет следующий вид: ["William", "Michael", "Lewis"].
//
// И наконец, friends[3][1] обращается ко второму элементу этого массива, который равен "Michael".

