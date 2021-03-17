import React, {useContext} from 'react'

// Inject the services
import {testAuthenticationService} from '../business/tests/testAuthenticationService'
import {testDatabaseService } from '../business/tests/testDatabaseService'
import {testNotificationService} from '../business/tests/testNotificationService'

const services = {
    authenticationService : new testAuthenticationService(true),
    databaseService : new testDatabaseService(),
    notificationService : new testNotificationService(),
}

services.authenticationService.login("user-test", "test")

var servicesContext = React.createContext(services)

const withServices = (WrappedComponent:any) => (props:any) => {
    const ServicesProvider = servicesContext.Provider
    return (
        <div>
            <ServicesProvider value={services}>
                <WrappedComponent {...props} />
            </ServicesProvider>
        </div>
    )
}

const useServices = () => useContext(servicesContext)

export { withServices , useServices }