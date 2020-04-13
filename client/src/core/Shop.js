import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getCategories, getFilteredProducts } from './apiCore';
import Checkbox from './Checkbox';
import RadioBox from './RadioBox';
import { prices } from './fixedPrices';
import Card from './Card';

const Shop = () => {
    
    const [myFilters, setMyFilters] = useState({
        filters: { category: [], price: [] }
    });
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [filteredResults, setFilteredResults] = useState(0);

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

    const loadFilterResults = (newFilters) => {
        // console.log(newFilters);
        getFilteredProducts(skip, limit, newFilters)
            .then(data => {
                if(data.error) {
                    setError(data.error)
                } else {
                    setFilteredResults(data)
                }
            })
    }

    useEffect(() => {
        init()
        loadFilterResults(skip, limit, myFilters.filters);
    }, [])

    //lesson 91 section 12
    const handleFilters = (filters, filterBy) => {
        // console.log("SHOP", filters, filterBy)
        //lesson 92 section 12
        const newFilters = { ...myFilters }
        newFilters.filters[filterBy] = filters

        //lesson 95 section 12
        if(filterBy == 'price'){
            let priceValue = handlePrice(filters)
            newFilters.filters[filterBy] = priceValue
        }

        //lesson 96 section 12
        loadFilterResults(myFilters.filters);

        setMyFilters(newFilters)
    };

    //lesson 95 section 12
    const handlePrice = value => {
        const data = prices
        let array = []

        for(let key in data) {
            if(data[key]._id === parseInt(value)) {
                array = data[key].array
            }
        }

        return array;
    };



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
                    {JSON.stringify(filteredResults)}
                </div>
            </div>
        </Layout>
    );
};

export default Shop