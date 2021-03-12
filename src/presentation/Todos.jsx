import React from 'react';
import { useTodos } from './useTodos';

export function Todos() {

    const {loading, todos, error} = useTodos()
    return (
        <div>
            <h1>List of todos</h1>
            {loading ? "Loading ..." : 
            <ul>
                {todos.map(todo => <li>{todo.label}</li>)}
            </ul>
            }
            {error ? <p>{JSON.stringify(error)}</p> : null}
        </div>
    )
}