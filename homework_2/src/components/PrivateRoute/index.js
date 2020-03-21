import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export const PrivateRoute  = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={ props => {
                return localStorage.getItem("user") ? (
                    <Component {...props}/>
                ) : (
                    <Redirect to={{
                        pathName: '/',
                        state: { from: props.location }
                    }} />
                )
            }}
        />
    )
};