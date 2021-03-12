import {INotificationService} from '../todo.ports'
import {User, Todo} from '../todo.model'

export class testNotificationService implements INotificationService {
    notify (user: User, todo: Todo, message: string) { return Promise.resolve()} ;
}

