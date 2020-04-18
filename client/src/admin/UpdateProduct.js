import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { getProduct, getCategories, updateProduct } from './apiAdmin';
import { Link, Redirect } from 'react-router-dom';

const UpdateProduct = ({ match }) => {


    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        categories: [],
        category: '',
        shipping: '',
        quantity: '',
        photo: '',
        loading: false,
        error: '',
        createdProduct: '',
        redirectToProfile: false,
        formData: ''
    })

    const {
        name,
        description,
        price,
        categories,
        category,
        shipping,
        quantity,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData
    } = values;

    const { user, token } = isAuthenticated();

    const init = (productId) => {
        getProduct(productId)
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error })
                } else {
                    // populate the state then load categories
                    setValues({
                        ...values,
                        name: data.name,
                        description: data.description,
                        price: data.price,
                        category: data.category._id,
                        shipping: data.shipping,
                        quantity: data.quantity,
                        formData: new FormData()
                    });

                    initCategories();
                }
            })
    }

    // Load categories and set form data

    const initCategories = () => {
        getCategories()
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error })
                } else {
                    setValues({ categories: data, formData: new FormData() })
                }
            })
    }

    useEffect(() => {
        init(match.params.productId);
    }, [])

    //Higher Order function a function returning another function
    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value
        formData.set(name, value)
        setValues({ ...values, [name]: value })
    }

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: '', loading: true });
        updateProduct(match.params.productId, user._id, token, formData)
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error })
                } else {
                    setValues({
                        ...values,
                        name: '',
                        description: '',
                        photo: '',
                        price: '',
                        quantity: '',
                        loading: false,
                        createdProduct: data.name
                    });


                }
            });
    };

    const newUpdatePostForm = () => (
        <form onSubmit={clickSubmit} className="mb-3">
            <h4>Post Photo</h4>
            <div className='form-group'>
                <label className='btn btn-secondary'>
                    <input
                        onChange={handleChange('photo')}
                        type='file'
                        name='photo'
                        accept='image/*'
                    />
                </label>
            </div>

            <div className="form-group">
                <label>Name</label>
                <input
                    onChange={handleChange('name')}
                    type='text'
                    className='form-control'
                    value={name}
                />
            </div>

            <div className="form-group">
                <label>Description</label>
                <textarea
                    onChange={handleChange('description')}
                    type='text'
                    className='form-control'
                    value={description}
                />
            </div>

            <div className="form-group">
                <label>Price</label>
                <input
                    onChange={handleChange('price')}
                    type='number'
                    className='form-control'
                    value={price}
                />
            </div>

            <div className="form-group">
                <label>Category</label>
                <select
                    onChange={handleChange('category')}
                    className='form-control'
                >
                    <option>Please Select a Category</option>
                    {categories && categories.map((category, index) => (<option key={index} value={category._id}>{category.name}</option>))}
                </select>
            </div>

            <div className="form-group">
                <label>Shipping</label>
                <select
                    onChange={handleChange('shipping')}
                    className='form-control'
                >
                    <option>Please Select</option>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                </select>
            </div>

            <div className="form-group">
                <label>Quantity</label>
                <input
                    onChange={handleChange('quantity')}
                    type='number'
                    className='form-control'
                    value={quantity}
                />
            </div>

            <button className='btn btn-outline-primary'>Update Product</button>

        </form>
    )

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    )

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: createdProduct ? '' : 'none' }}>
            <h2>{`${createdProduct} is updated`}</h2>
        </div>
    )

    const showLoading = () => (
        loading && (
            <div className='alert alert-success'>
                <h2>Loading...</h2>
            </div>
        )
    )

    const redirectUser = () => {
        if (redirectToProfile) {
            if (!error) {
                return <Redirect to="/" />
            }
        }
    }

    return (
        <Layout title="Add a new Category" description={`G'day ${user.name}, ready to add a new product?`} className="container">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showLoading()}
                    {showSuccess()}
                    {showError()}
                    {newUpdatePostForm()}
                    {redirectUser()}

                </div>
            </div>
        </Layout>
    )
}

export default UpdateProduct;