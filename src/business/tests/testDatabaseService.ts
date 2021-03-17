import {IDatabaseService} from '../todo.ports'
import {Todo} from '../todo.model'
import {later} from './simulateDelay'

export class testDatabaseService implements IDatabaseService {
    private _todos: Todo[]
    constructor () { this._todos = [] }
    loadTodos () { return later(500).then(()=>Promise.resolve(this._todos)) };
    saveTodos (createdOrUpdatedtodos: Todo[]) {
        this._todos = [...createdOrUpdatedtodos]
        return Promise.resolve()
    }
}