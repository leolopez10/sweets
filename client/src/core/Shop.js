import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getCategories } from './apiCore';
import Checkbox from './Checkbox';
import RadioBox from './RadioBox';
import { prices } from './fixedPrices';
import Card from './Card';

const Shop = () => {

    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [myFilters, setMyFilters] = useState({
        filters: { category: [], price: [] }
    });

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

    //lesson 91 section 12
    const handleFilters = (filters, filterBy) => {
        // console.log("SHOP", filters, filterBy)
        //lesson 92 section 12
        const newFilters = { ...myFilters }
        newFilters.filters[filterBy] = filters
        setMyFilters(newFilters)
    }

    return (
        <Layout title="Shop Page" description="Try out our Baked Goods" className="container-fluid">
            <div className='row'>
                <div className='col-4'>
                    {/* {JSON.stringify(categories)} */}
                    <h4>Filter by Categories</h4>
                    <ul>
                        <Checkbox categories={categories} handleFilters={filters => handleFilters(filters, 'category')} />
                    </ul>

                    <h4>Filter by Price Range</h4>
                    <div>
                        <RadioBox prices={prices} handleFilters={filters => handleFilters(filters, 'price')} />
                    </div>

                </div>
                <div className='col-8'>
                    {JSON.stringify(myFilters)}
                </div>
            </div>
        </Layout>
    );
};

export default Shop