import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../auth/pages/Login';
import Dashboard from '../app/pages/dashboard/Dashboard';
import Projek from '../app/pages/data_project/Project';
import Karyawan from '../app/pages/data_karyawan/Karyawan';
import Manajemen from '../app/pages/manajemen_user/Manajemen';
import Profil from '../app/components/profile/Profile';

const AppRoutes = () =>
{
    return (
        <Router>
            <Routes>
                <Route path="/login" element={ <Login /> } />
                <Route path="/" element={ <Dashboard /> } />
                <Route path="/data/projek" element={ <Projek /> } />
                <Route path="/data/karyawan" element={ <Karyawan /> } />
                <Route path="/manajemen-user" element={ <Manajemen /> } />
                <Route path="/profile" element={ <Profil /> } />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
