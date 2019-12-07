import { Day } from './Day'

export class User {
    id: number;
    username: string;
    token: string;
    regdate: Date;
    todos: TodoItem[];
    callendar: Day[]

    constructor(_id: number, _username: string, _token: string, _regdate: Date, _todos: TodoItem[], _callendar: Day[]) {
        this.id = _id;
        this.username = _username;
        this.token = _token;
        this.regdate = _regdate;
        this.todos = _todos;
        this.callendar = _callendar;
    }
}