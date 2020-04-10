import React, { useState } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { createCategory } from './apiAdmin';
import { Link } from 'react-router-dom';

const AddCategory = () => {
    const [name, setName] = useState('')
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    // Destructure user and info from localstorage

    const { user, token } = isAuthenticated();

    const handleChange = (event) => {
        setError('');
        setName(event.target.value);
    }

    const clickSubmit = (event) => {
        event.preventDefault();
        setError('');
        setSuccess(false);

        // Make the request to the API to create a category
        createCategory(user._id, token, { name })
            .then(data => {
                if (data.error) {
                    setError(true)
                } else {
                    setError('');
                    setSuccess(true);
                }
            });
    };

    const newCategoryForm = () => (

        <form onSubmit={clickSubmit}>
            <div className='form-group'>
                <label className='text-muted'>Name</label>
                <input
                    onChange={handleChange}
                    type='text'
                    className='form-control'
                    value={name}
                    autoFocus
                    required
                />
            </div>
            <button className='btn btn-outline-primary'>
                Create Category
            </button>
        </form>
    );

    const showSuccess = () => {
        if(success) {
            return <h3 className="text-success">{name} was created</h3>
        }
    }

    const showError = () => {
        if(error) {
            return <h3 className="text-danger">Category should be unique</h3> // can also use {error} to actually show the API error
        }
    }

    const goBack = () => (
        <div className='mt-5'>
            <Link to='/admin/dashboard' className='text-warning'>
                Back to Dashboard
            </Link>
        </div>
    )

    return (
        <Layout title="Add a new Category" description={`G'day ${user.name}, ready to add a new category?`} className="container">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showSuccess()}
                    {showError()}
                    {newCategoryForm()}
                    {goBack()}
                </div>
            </div>
        </Layout>
    )
}

export default AddCategory;