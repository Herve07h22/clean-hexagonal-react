import {Todo, User} from './todo.model'

  
// Client-side ports (how the business logic reacts to the user actions)
export interface INewTodoParameters {
    label: string;
    dueDate?: Date;
    assignedTo?: User;
  }

export interface ITodosInteractor {
    newTodo: (params? : INewTodoParameters) => Promise<Todo>;
    getTodos: () => Promise<Todo[]>;
    createOrEditTodo: (todo: Todo) => Promise<void>;
    checkTodo: (todo: Todo) => Promise<void>;
    deleteTodo: (todo: Todo) => Promise<void>;
}

// Server-side ports (what the business logic needs to run)
export interface IAuthenticationService {
    getLoggedUser : () => Promise<User>;
    login: (username:string, password:string) => Promise<User>;
    logout: () => Promise<void>;
}

export interface INotificationService {
    notify: (user: User, todo: Todo, message: string) => Promise<void>;
}

export interface IDatabaseService {
    loadTodos: ()=>Promise<Todo[]>;
    saveTodos: (createdOrUpdatedtodos: Todo[])=>Promise<void>;  // Update the list instead of create/update/delete.    
}
