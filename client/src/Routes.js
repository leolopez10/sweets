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
                <Route path='/signin' exact component={Signin} />
                <Route path='/signup' exact component={Signup} />
                <PrivateRoute path='/user/dashboard' exact component={Dashboard} />
                <AdminRoute path='/admin/dashboard' exact component={AdminDashboard} />
                <AdminRoute path='/create/category' exact component={AddCategory} />
            </Switch>
        </BrowserRouter>
    </div>);
};

export default Routes
