import {
  ITodosInteractor,
  IDatabaseService,
  INotificationService,
  IAuthenticationService,
  INewTodoParameters,
} from "./todo.ports";
import { Todo, TodoState } from "./todo.model";

export class TodosInteractor implements ITodosInteractor {
  private _databaseService: IDatabaseService;
  private _notificationService: INotificationService;
  private _authenticationService: IAuthenticationService;
  private _todos: Todo[]; // Why do we need this internal state ? Could we have a set of reducers state => new state instead ?

  constructor(
    databaseService: IDatabaseService,
    notificationService: INotificationService,
    authenticationService: IAuthenticationService
  ) {
    this._databaseService = databaseService;
    this._notificationService = notificationService;
    this._authenticationService = authenticationService;
    this._todos = [];
  }
  async getTodos() {
    this._todos = await this._databaseService.loadTodos();
    return this._todos;
  }
  async newTodo(params?: INewTodoParameters) {
    if (!params) {
      return Promise.reject("Cannot create an empty todo");
    }
    const currentUser = await this._authenticationService.getLoggedUser();
    const newTodo: Todo = {
      label: params.label,
      createdAt: new Date(),
      owner: currentUser,
      state: TodoState.pending,
      assignedTo: params.assignedTo,
      dueDate: params.dueDate && new Date(params.dueDate),
    };
    this._todos = [...this._todos, newTodo];
    await this._databaseService.saveTodos(this._todos);
    if (newTodo.assignedTo && newTodo.assignedTo.wantsToBeNotified) {
      await this._notificationService.notify(
        currentUser,
        newTodo,
        "A new todo has been assigned to you"
      );
    }
    return newTodo;
  }
  async createOrEditTodo(todo: Todo) {
    return;
  }
  async checkTodo(todo: Todo) {
    return;
  }
  async deleteTodo(todo: Todo) {
    return;
  }
}
