import { useMemo } from "react";
import { TodosInteractor } from "../business/todo.interactor";
import { useQuery } from "../infrastructure/useQuery";
import { useServices } from "../infrastructure/services";

export function useTodos() {
  console.log("Entering useTodo");
  
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

  return { loading, todos, error, updateTodos, newTodo, newTodoError };
}
