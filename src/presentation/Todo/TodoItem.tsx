import {Todo} from '../../business/todo.model'

type TodoItemProps = {
    todo:Todo
}

export function TodoItem(props:TodoItemProps) {
    const {todo} = props
    return (
        <li key={todo.label}>
            <span>{todo.label} </span>
            <span>(Assigned to {todo.assignedTo?.name || "nobody"}{todo.dueDate ? ` before ${todo.dueDate.toLocaleDateString()}` : ""})</span>
        </li>
    )
}
