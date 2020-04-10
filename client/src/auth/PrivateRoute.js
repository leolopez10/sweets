//I'm going to create a private route using react-router-dom www.reacttraining.com Examples: redirect(auth)
import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from './index'


const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest} render={props => isAuthenticated() ? (
            <Component {...props} />
        ) : (
                <Redirect to={{ pathname: '/signin', state: { from: props.location } }} />
            )}
    />
)

export default PrivateRoute;