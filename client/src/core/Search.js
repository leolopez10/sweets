import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getCategories, list } from './apiCore';
import Card from './Card';

const Search = () => {

    const [data, setData] = useState({
        categories: [],
        category: '',
        search: '',
        results: [],
        searched: false
    });

    const { categories, category, search, results, searched } = data

    const loadCategories = () => {
        getCategories()
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                } else {
                    setData({ ...data, categories: data })
                }
            })
    };

    useEffect(() => {
        loadCategories()
    }, [])

    const handleChange = name => event => {
        setData({ ...data, [name]: event.target.value, searched: false });
    };

    const searchSubmit = (event) => {
        event.preventDefault();
        searchData()
    };

    // lesson 101 section 13
    const searchData = () => {
        // console.log(search, category)
        if (search) {
            list({ search: search || undefined, category: category })
                .then(response => {
                    if (response.error) {
                        console.log(response.error)
                    } else {
                        setData({ ...data, results: response, searched: true });
                    }
                })
        }
    };

    const searchedProducts = (results = []) => {
        return (
            <div className='row'>
                {results.map((product, index) => (
                    <Card key={index} product={product} />
                ))}
            </div>
        )
    }

    const searchForm = () => (
        <form onSubmit={searchSubmit}>
            <span className='input-group-text'>
                <div className='input-group input-group-lg'>
                    <div className='input-group-prepend'>
                        <select className='btn mr-2' onChange={handleChange('category')}>
                            <option value='All'>Pick Category</option>
                            {categories.map((category, index) => (
                                <option key={index} value={category._id}>
                                    {category.name}
                                </option>))}
                        </select>
                    </div>

                    <input
                        type='search'
                        className='form-control'
                        onChange={handleChange('search')}
                        placeholder='Search by name'
                    />
                </div>

                <div className='btn input-group-append' style={{ border: 'none' }}>
                    <button className='input-group-text'>Search</button>
                </div>
            </span>
        </form>
    );

    return (
        <div>
            <div className='container mb-3'>
                {searchForm()}
                {/* {JSON.stringify(results)} */}
                <div className='container-fluid mb-3'>
                    {searchedProducts(results)}
                </div>
            </div>
        </div>
    );
};

export default Search;