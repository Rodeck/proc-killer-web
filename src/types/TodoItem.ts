class TodoItem {
    id: number;
    regdate: Date;
    finishTime: Date;
    targetDate: Date;
    completed: boolean;
    name: string;
    description: string;

    constructor(_id: number, _regdate: Date, _finishTime: Date, _targetDate: Date, _completed: boolean, _name: string, _description: string){
        this.id = _id;
        this.regdate = _regdate;
        this.finishTime = _finishTime;
        this.targetDate = _targetDate;
        this.completed = _completed;
        this.name = _name;
        this.description = _description;
    }
}