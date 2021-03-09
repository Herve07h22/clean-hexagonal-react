import {ITodosInteractor} from '../business/todo.ports'
import {useQuery} from '../infrastructure/useQuery'

export function useTodos (interactor: ITodosInteractor) {

   const { loading, results:todos, error, refresh:updateTodos } = useQuery(interactor.getTodos)
   const { refresh:createOrEditTodo } = useQuery(interactor.createOrEditTodo, {isCommand:true}) 

   return {loading, todos, updateTodos, createOrEditTodo, error}

}

