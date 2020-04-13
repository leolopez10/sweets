import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getCategories } from './apiCore';
import Checkbox from './Checkbox';
import Card from './Card';

const Shop = () => {

    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);

    const init = () => {
        getCategories()
            .then(data => {
                if (data.error) {
                    setError(data.error)
                } else {
                    setCategories(data)
                }
            })
    }

    useEffect(() => {
        init()
    }, [])

    return (
        <Layout title="Shop Page" description="Try out our Baked Goods" className="container-fluid">
            <div className='row'>
                <div className='col-4'>
                    {/* {JSON.stringify(categories)} */}
                    <h4>Filter by Categories</h4>
                    <ul>
                        <Checkbox categories={categories} />
                    </ul>
                </div>
                <div className='col-8'>right</div>
            </div>
        </Layout>
    );
};

export default Shop