import React, { useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import PrivateRoute from './auth/PrivateRoute';
import AdminRoute from './auth/AdminRoute';
import Signup from './user/Signup'
import Signin from './user/Signin'
import Home from './core/Home';
import Dashboard from './user/UserDashboard';
import AdminDashboard from './user/AdminDashboard';
import AddCategory from './admin/AddCategory';
import AddProduct from './admin/AddProduct';
import Orders from './admin/Orders';
import Shop from './core/Shop';
import Product from './core/Product';
import Cart from './core/Cart';

//using axios to check if frontend is connected to backend
import axios from 'axios'

const Routes = () => {
    useEffect(() => {
        axios.get("/api/hello").then(result => {
          console.log(result.data);
        });
      }, []);
    return (<div>
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/shop' exact component={Shop} />
                <Route path='/signin' exact component={Signin} />
                <Route path='/signup' exact component={Signup} />
                <PrivateRoute path='/user/dashboard' exact component={Dashboard} />
                <AdminRoute path='/admin/dashboard' exact component={AdminDashboard} />
                <AdminRoute path='/create/category' exact component={AddCategory} />
                <AdminRoute path='/create/product' exact component={AddProduct} />
                <AdminRoute path='/admin/orders' exact component={Orders} />
                <Route path='/product/:productId' exact component={Product} />
                <Route path='/cart' exact component={Cart} />

            </Switch>
        </BrowserRouter>
    </div>);
};

export default Routes
