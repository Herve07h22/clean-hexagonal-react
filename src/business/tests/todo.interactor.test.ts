
import {User, Todo, TodoState} from '../todo.model'
import {TodosInteractor} from '../todo.interactor'

import {testAuthenticationService} from './testAuthenticationService'
import {testDatabaseService } from './testDatabaseService'
import {testNotificationService} from './testNotificationService'

it("Interactor can return an empty list of todos", async () => {
    const interactor = new TodosInteractor(new testDatabaseService(), new testNotificationService(), new testAuthenticationService(true))
    const emptyListOfTodos = await interactor.getTodos()
    expect(emptyListOfTodos).toEqual([])
})

it("Interactor cannot create a new todo if the user is not logged in", async () => {
    const authenticationService = new testAuthenticationService(true)
    const interactor = new TodosInteractor(new testDatabaseService(), new testNotificationService(), authenticationService)
    await expect(interactor.newTodo({label:"New todo"})).rejects.toMatch("No logged user");
} )

it("Interactor cannot create a new empty todo", async () => {
    const authenticationService = new testAuthenticationService(true)
    await authenticationService.login("user-test", "test")
    const interactor = new TodosInteractor(new testDatabaseService(), new testNotificationService(), authenticationService)
    await expect(interactor.newTodo()).rejects.toMatch("Cannot create an empty todo");
} )

it("Interactor can create a new todo if the user is logged in", async () => {
    const authenticationService = new testAuthenticationService(true)
    await authenticationService.login("user-test", "test")
    const notificationService = new testNotificationService()
    notificationService.notify = jest.fn();
    const interactor = new TodosInteractor(new testDatabaseService(), notificationService, authenticationService)
    const newTodo: Todo = await interactor.newTodo({label:"New todo"})
    expect(newTodo.createdAt.getDate()).toEqual(new Date().getDate())
    expect(newTodo.label).toEqual("New todo")
    expect(newTodo.owner.name).toEqual("user-test")
    expect(newTodo.state).toEqual(TodoState.pending)
    // Not assigned -> no notification
    expect(notificationService.notify).not.toBeCalled()
} )

it("Interactor can create a new assigned todo and notify the user", async () => {
    const authenticationService = new testAuthenticationService(false)
    await authenticationService.login("user-test", "test")
    const assignedUser: User = {name:"notify-user", id:2, wantsToBeNotified:true}
    const notificationService = new testNotificationService()
    notificationService.notify = jest.fn();
    const interactor = new TodosInteractor(new testDatabaseService(), notificationService, authenticationService)
    const newTodo: Todo = await interactor.newTodo({label:"New todo", assignedTo:assignedUser})
    expect(newTodo.assignedTo?.name).toEqual("notify-user")
    expect(notificationService.notify).toBeCalled()
} )
