import { useTodos,  } from './useTodos';
import {TodoListAndForm} from './TodoListAndForm'

export function Todos() {
    return <TodoListAndForm {...useTodos()} />
}
