import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { API } from '../config';

const Signup = () => {

    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false
    })

    const { name, email, password, error, success } = values

    const handleChange = name => event => {
        setValues({
            ...values,
            error: false,
            [name]: event.target.value
        })
    }

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({
            ...values,
            error: false
        })
        signup({ name, email, password })
            .then(data => {
                if (data.error) {
                    setValues({
                        ...values,
                        error: data.error,
                        success: false
                    })
                } else {
                    setValues({
                        ...values,
                        name: '',
                        email: '',
                        password: '',
                        error: '',
                        success: true
                    })
                }

            })
    }

    const signup = (user) => {
        // console.log(name, email, password)
        return fetch(`${API}/signup`, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(response => {
                return response.json();
            })
            .catch(err => {
                console.log(err);
            });
    }

    const signUpForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">
                    Name
                </label>
                <input
                    onChange={handleChange('name')}
                    type="text" value={name}
                    className="form-control"
                />
            </div>

            <div className="form-group">
                <label className="text-muted">
                    Email
                </label>
                <input
                    onChange={handleChange('email')}
                    type="email" value={email}
                    className="form-control"
                />
            </div>

            <div className="form-group">
                <label className="text-muted">
                    Password
                </label>
                <input
                    onChange={handleChange('password')}
                    type="password"
                    value={password}
                    className="form-control" />
            </div>

            <div>
                <button
                    onClick={clickSubmit}
                    className="btn btn-primary"
                >
                    Submit
                </button>
            </div>
        </form>
    )

    const showError = () => (
        <div
            className="alert alert-danger"
            style={{ display: error ? '' : 'none' }}
        >
            {error}
        </div>
    )

    const showSuccess = () => (
        <div
            className="alert alert-success"
            style={{ display: success ? '' : 'none' }}
        >
            New account is created. Please <Link to="/signin">Sign-In</Link>
        </div>
    )

    return (
        <Layout
            title="Sign-Up Page"
            description="Sign-Up to React E-commerce App"
            className="container col-md-8 offset-md-2"
        >
            {showSuccess()}
            {showError()}
            {signUpForm()}
            {JSON.stringify(values)}
        </Layout>
    )
}

export default Signup;