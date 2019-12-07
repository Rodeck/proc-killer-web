export interface Day {
    date: Date;
    allCompleted: boolean;
    todos: Todo[];
}

export interface Todo {
   id: number;
   regdate: Date,
   finishTime?: Date; 
   targetDate?: Date;
   completed: boolean;
   name: string;
   description: string;
}