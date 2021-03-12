import {IDatabaseService} from '../todo.ports'
import {Todo} from '../todo.model'

export class testDatabaseService implements IDatabaseService {
    private _todos: Todo[]
    constructor () { this._todos = [] }
    loadTodos () { return Promise.resolve(this._todos) };
    saveTodos (createdOrUpdatedtodos: Todo[]) {
        this._todos = [...createdOrUpdatedtodos]
        return Promise.resolve()
    }
}