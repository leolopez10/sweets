import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Layout from './Layout';
import { getBraintreeClientToken, processPayment, createOrder } from './apiCore';
import { emptyCart } from './cartHelpers';
import Card from './Card';
import { isAuthenticated } from '../auth'
import DropIn from 'braintree-web-drop-in-react'

const Checkout = ({ products, setRun = f => f, run = undefined }) => {
    //lesson 119 Braintree front end
    const [data, setData] = useState({
        loading: false,
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

    let deliveryAddress = data.address

    const buy = () => {
        setData({ loading: true })
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
                        // create order
                        const createOrderData = {
                            products: products,
                            transaction_id: response.transaction.id,
                            amount: response.transaction.amount,
                            address: deliveryAddress
                        }
                        createOrder(userId, token, createOrderData)
                            .then(response => {
                                // empty cart
                                emptyCart(() => {
                                    setRun(!run);
                                    console.log('payment success and empty cart');
                                    setData({ loading: false, success: true })
                                })
                            })
                            .catch(error => {
                                console.log(error);
                                setData({ loading: false })
                            })
                    })
                    .catch(error => {
                        console.log(error)
                        setData({ loading: false });
                    })
            })
            .catch(error => {
                // console.log('dropin error: ', error)
                setData({ ...data, error: error.message })
            })
    };

    const handleAddress = event => {
        setData({ ...data, address: event.target.value });
    };

    const showDropIn = () => (
        <div onBlur={() => setData({ ...data, error: '' })}>
            {data.clientToken !== null && products.length > 0 ? (
                <div>
                    <div className='form-group mb-3'>
                        <label className='text-muted'>Delivery address:</label>
                        <textarea
                            onChange={handleAddress}
                            className='form-control'
                            value={data.address}
                            placeholder='Type your delivery address here'
                        />
                    </div>
                    <DropIn
                        options={{
                            authorization: data.clientToken,
                            paypal: {
                                flow: 'vault'
                            }
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

    const showLoading = (loading) => (
        loading && (<h2>Loading.....</h2>)
    )

    return (
        // <div>{JSON.stringify(products)}</div>
        <div>
            <h2>Total: ${getTotal()}</h2>
            {showLoading(data.loading)}
            {showSuccess(data.success)}
            {showError(data.error)}
            {showCheckout()}
        </div>
    )
};

export default Checkout