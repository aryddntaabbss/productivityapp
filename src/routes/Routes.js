import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Login from '../pages/login/Login';
import EmailVerification from '../pages/forgotPassword/EmailVerification';
import OtpVerification from '../pages/forgotPassword/OtpVerification';
import ResetPassword from '../pages/forgotPassword/ResetPassword';
import Success from '../pages/forgotPassword/Success';
import Dashboard from '../pages/dashboard/Dashboard';
import Projek from '../pages/projectManagement/projectManagement';
import Karyawan from '../pages/userManagement/listUser';
import Manajemen from '../pages/userManagement/userManagement';
import AddUser from '../pages/userManagement/detail/AddUser';
import Profil from '../components/ui/profile/Profile';
import PrivateRoute from './PrivateRoute';
import { fetchUserType } from '../store/UserSlice';


const AppRoutes = () =>
{
    const dispatch = useDispatch();

    useEffect( () =>
    {
        dispatch( fetchUserType() );
    }, [ dispatch ] );

    return (
        <Router>
            <Routes>
                <Route path="/login" element={ <Login /> } />
                <Route path="/email-verification" element={ <EmailVerification /> } />
                <Route path="/otp-verification" element={ <OtpVerification /> } />
                <Route path="/reset-password" element={ <ResetPassword /> } />
                <Route path="/success" element={ <Success /> } />


                <Route
                    path="/"
                    element={ <PrivateRoute element={ <Dashboard /> } roles={ [ 'admin', 'manager' ] } /> }
                />
                <Route
                    path="/data/projek"
                    element={ <PrivateRoute element={ <Projek /> } roles={ [ 'admin', 'manager' ] } /> }
                />
                <Route
                    path="/data/karyawan"
                    element={ <PrivateRoute element={ <Karyawan /> } roles={ [ 'admin', 'manager' ] } /> }
                />
                <Route
                    path="/manajemen-user"
                    element={ <PrivateRoute element={ <Manajemen /> } roles={ [ 'admin' ] } /> }
                />
                <Route
                    path="/add"
                    element={ <PrivateRoute element={ <AddUser /> } roles={ [ 'admin' ] } /> }
                />
                <Route
                    path="/profile"
                    element={ <PrivateRoute element={ <Profil /> } roles={ [ 'admin', 'manager' ] } /> }
                />

            </Routes>
        </Router>
    );
};

export default AppRoutes;
