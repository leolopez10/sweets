import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { createProduct } from './apiAdmin';
import { Link } from 'react-router-dom';

const AddProduct = () => {

    const {user, token} = isAuthenticated();

    return (
        <Layout title="Add a new Category" description={`G'day ${user.name}, ready to add a new product?`} className="container">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    ...
                </div>
            </div>
        </Layout>
    )
}

export default AddProduct