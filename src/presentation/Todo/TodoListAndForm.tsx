import {useState} from 'react';
import {TodoListAndFormProps} from './useTodos'
import {TodoItem} from './TodoItem'
import './TodoListAndForm.css'

export function TodoListAndForm(props: TodoListAndFormProps) {
    const {loading, todos, error, newTodo, newTodoError} = props
    const [formValues, setFormValues] = useState({label:"", assignedTo:undefined, dueDate:undefined})

    const handleInputChange = (event:React.ChangeEvent<HTMLInputElement> | undefined) => {
        if (!event) return
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setFormValues(values => ({...values, [name]: value}));
    }

    const submit = (event:React.FormEvent<HTMLFormElement> | undefined) => {
        if (!event) return
        console.log(formValues)
        newTodo(formValues)
        event.preventDefault();
    }

    return (
        <div className="todo-container">
            <h1>List of todos</h1>
            {loading ? "Loading ..." : 
            <ul>
                {todos.map(todo => <TodoItem todo={todo} />)}
            </ul>
            }
            {error ? <p>{error}</p> : null}
            <form name="todo-form" onSubmit={submit} className="todo-inline-form">
                <div className="todo-form-item">
                    <label htmlFor="label" className="todo-form-item-label">Label :</label>
                    <input name="label" type="text" value={formValues.label} onChange={handleInputChange}/>
                </div>
                <div className="todo-form-item">
                    <label htmlFor="assignedTo" className="todo-form-item">Assigned to :</label>
                    <input name="assignedTo" type="text" value={formValues.assignedTo} onChange={handleInputChange}/>
                </div>
                <div className="todo-form-item">
                    <label htmlFor="duedate" className="todo-form-item">Due date :</label>
                    <input name="dueDate" type="date" value={formValues.dueDate} onChange={handleInputChange}/>
                </div>
                <input type="submit" value="Add todo" />
            </form>
            {newTodoError ? <p>{newTodoError}</p> : null}
        </div>
    )
}