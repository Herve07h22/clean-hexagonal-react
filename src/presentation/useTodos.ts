import { TodosInteractor } from '../business/todo.interactor'
import { useQuery } from '../infrastructure/useQuery'
import { useServices } from '../infrastructure/services'

export function useTodos() {
   const { authenticationService,
      databaseService,
      notificationService } = useServices()

   const interactor = new TodosInteractor(databaseService, notificationService, authenticationService)

   const { loading, results: todos, error, refresh: updateTodos } = useQuery(interactor.getTodos, {initialValues:[]})
   const { refresh: newTodo } = useQuery(interactor.newTodo, { isCommand: true })

   return { loading, todos, updateTodos, newTodo, error }

}

