import { useMemo } from "react";
import { TodosInteractor } from "../../business/todo.interactor";
import { INewTodoParameters } from '../../business/todo.ports'
import { Todo } from '../../business/todo.model' 
import { useQuery } from "../../infrastructure/useQuery";
import { useServices } from "../../infrastructure/services";

export type TodoListAndFormProps = {
  loading: boolean
  todos: Todo[]
  error: string
  newTodo: (params?: INewTodoParameters) => void
  updateTodos: (params?: INewTodoParameters) => void
  newTodoError: string
}

export function useTodos():TodoListAndFormProps {
  
  const {
    authenticationService,
    databaseService,
    notificationService,
  } = useServices();

  const interactor = useMemo(
    () =>
      new TodosInteractor(
        databaseService,
        notificationService,
        authenticationService
      ),
    [databaseService, notificationService, authenticationService]
  );

  const { loading, results: todos, error, refresh: updateTodos } = useQuery(interactor, interactor.getTodos, {initialValues:[]})
  const { error: newTodoError, refresh: newTodo } = useQuery(interactor, interactor.newTodo, { isCommand: true, onSuccess:()=>updateTodos() })

  return { loading, todos: todos || [], error, updateTodos, newTodo, newTodoError };
}
