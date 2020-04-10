import React, { useState } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
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
    }

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
                />
            </div>
            <button className='btn btn-outline-primary'>
                Create Category
            </button>
        </form>
    );

    return (
        <Layout title="Add a new Category" description={`G'day ${name}, ready to add a new category?`} className="container">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {newCategoryForm()}
                </div>
            </div>
        </Layout>
    )
}

export default AddCategory;