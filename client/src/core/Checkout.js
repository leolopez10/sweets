import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Layout from './Layout';
import { getBraintreeClientToken, processPayment } from './apiCore';
import Card from './Card';
import { isAuthenticated } from '../auth'
import DropIn from 'braintree-web-drop-in-react'

const Checkout = ({ products }) => {
    //lesson 119 Braintree front end
    const [data, setData] = useState({
        success: false,
        clientToken: null,
        error: '',
        instance: {},
        address: ''
    })

    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;

    const getToken = () => {
        getBraintreeClientToken(userId, token)
            .then(data => {
                if (data.error) {
                    setData({ ...data, error: data.error })
                } else {
                    setData({ clientToken: data.clientToken })
                }
            })
    };

    useEffect(() => {
        getToken(userId, token)
    }, [])

    const getTotal = () => {
        return products.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price;
        }, 0);
    };

    const showCheckout = () => {
        return isAuthenticated() ? (
            <div>
                {showDropIn()}
            </div>
        ) : (
                <Link to='/signin'>
                    <button className='btn btn-primary'>
                        Sign-In to Checkout
                        </button>
                </Link>
            );
    };

    const buy = () => {

        //send the nonce to the server
        // nonce = data.instance.requestPaymentMethod()
        let nonce;
        let getNonce = data.instance.requestPaymentMethod()
            .then(data => {
                // console.log(data)
                nonce = data.nonce
                // once we have nonce (card type, card number) send nonce as 'paymentMethodNonce' to the backend
                // and also total to be charged
                // console.log('send nonce and total to process:', nonce, getTotal(products))
                const paymentData = {
                    paymentMethodNonce: nonce,
                    amount: getTotal(products)
                }

                processPayment(userId, token, paymentData)
                    .then(response => {
                        // console.log(response)
                        setData({ ...data, success: response.success });
                        // empty cart
                        // create order
                    })
                    .catch(error => console.log(error))
            })
            .catch(error => {
                // console.log('dropin error: ', error)
                setData({ ...data, error: error.message })
            })
    };

    const showDropIn = () => (
        <div onBlur={() => setData({ ...data, error: '' })}>
            {data.clientToken !== null && products.length > 0 ? (
                <div>
                    <DropIn
                        options={{
                            authorization: data.clientToken
                        }}
                        onInstance={instance => (data.instance = instance)}
                    />
                    <button onClick={buy} className='btn btn-success btn-block'>
                        Checkout
                    </button>
                </div>
            ) : null}
        </div>
    );

    const showError = error => (
        <div
            className='alert alert-danger'
            style={{ display: error ? '' : 'none' }}
        >
            {error}
        </div>
    )

    const showSuccess = success => (
        <div
            className='alert alert-info'
            style={{ display: success ? '' : 'none' }}
        >
            Thanks! Your payment was successful!
        </div>
    )

    return (
        // <div>{JSON.stringify(products)}</div>
        <div>
            <h2>Total: ${getTotal()}</h2>
            {showSuccess(data.success)}
            {showError(data.error)}
            {showCheckout()}
        </div>
    )
};

export default Checkout