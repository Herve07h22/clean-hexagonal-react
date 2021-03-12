import {IAuthenticationService, } from '../todo.ports'
import {User} from '../todo.model'

export class testAuthenticationService implements IAuthenticationService {
    private _testUser: User;
    private _isLogged: boolean;
    constructor (wantsToBeNotified:boolean) { 
        this._testUser = {id:1, name:"user-test", wantsToBeNotified} 
        this._isLogged = false
    }
    getLoggedUser () {
        return this._isLogged ? Promise.resolve(this._testUser) : Promise.reject("No logged user")
    }
    login (username:string, password:string) { 
        if (username === "user-test" && password === "test") {
            this._isLogged = true
            return this.getLoggedUser()
        }
        return Promise.reject("Authentication failed") 
    }
    logout () { 
        this._isLogged = false;
        return Promise.resolve() 
    }
}

