export class Day {
    date: Date;
    todos: TodoItem[];
    allCompleted: boolean;

    constructor(_date: Date, _todos: TodoItem[], _allCompleted: boolean) {
        this.date = _date;
        this.todos = _todos;
        this.allCompleted = _allCompleted;
    }
}