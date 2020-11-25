import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import auth from './auth-helper'

const AuthRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        auth.isAuthenticated() ? (
            <Redirect to={{
                pathname: '/dashboard',
                state: { from: props.location }
            }} />
        ) : (
                <Component {...props} />
            )
    )} />
)

export default AuthRoute