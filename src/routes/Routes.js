import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Login from '../auth/pages/Login';
import Dashboard from '../app/pages/dashboard/Dashboard';
import Projek from '../app/pages/data_project/Project';
import Karyawan from '../app/pages/data_karyawan/Karyawan';
import Manajemen from '../app/pages/manajemen_user/Manajemen';
import Profil from '../app/components/profile/Profile';
import PrivateRoute from './PrivateRoute';
import { fetchUserType } from '../auth/Store/UserSlice';


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
                    path="/profile"
                    element={ <PrivateRoute element={ <Profil /> } roles={ [ 'admin', 'manager' ] } /> }
                />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
