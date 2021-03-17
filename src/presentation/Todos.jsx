import {useState} from 'react';
import { useTodos,  } from './useTodos';

export function Todos() {

    const {loading, todos, error, newTodo, newTodoError} = useTodos()
    const [formValues, setFormValues] = useState({label:""})

    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setFormValues(values => ({...values, [name]: value}));
    }

    const submit = (event) => {
        newTodo(formValues)
        event.preventDefault();
    }

    console.log("Todos is rendering")
    return (
        <div>
            <h1>List of todos</h1>
            {loading ? "Loading ..." : 
            <ul>
                {todos.map(todo => <li>{todo.label}</li>)}
            </ul>
            }
            {error ? <p>{error}</p> : null}
            <form name="todo-form" onSubmit={submit}>
                <label htmlFor="label">
                    Label
                    <input name="label" type="text" value={formValues.label} onChange={handleInputChange}/>
                </label>
                <label htmlFor="assignedTo">
                    Assigned to
                    <input name="assignedTo" type="text" value={formValues.assignedTo} onChange={handleInputChange}/>
                </label>
                
                <label htmlFor="duedate">
                    Due date
                    <input name="duedate" type="date" value={formValues.duedate} onChange={handleInputChange}/>
                </label>
                <input type="submit" value="Add todo" />
            </form>
            {newTodoError ? <p>{newTodoError}</p> : null}
        </div>
    )
}