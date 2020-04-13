// lesson 90 section 12

import React, { useState, useEffect } from 'react'

const Checkbox = ({ categories, handleFilters }) => {

    const [checked, setChecked] = useState([])

    const handleToggle = category => () => {
        
        const currentCategoryId = checked.indexOf(category); // This will tell us if the category is in the state, also if no category is in the state it will returns the first index of -1
        const newCheckedCategoryId = [...checked]; // This will give us all the category ids in the state

        // if currently checked was no already in checked state then we push
        // else pull/take off
        
        if(currentCategoryId === -1) {
            newCheckedCategoryId.push(category)
        } else {
            newCheckedCategoryId.splice(currentCategoryId, 1)
        }
        // console.log(newCheckedCategoryId);
        setChecked(newCheckedCategoryId);
        handleFilters(newCheckedCategoryId);

    }

    return categories.map((category, index) => (
        <li key={index} className='list-unstyled'>
            <input onChange={handleToggle(category._id)} value={checked.indexOf(category._id === -1)} type='checkbox' className='form-check-input' />
            <label className='form-check-label'>{category.name}</label>
        </li>
    ))
}

export default Checkbox;