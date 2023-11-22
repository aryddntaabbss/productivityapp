import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./auth/pages/Login";
import Register from "./auth/pages/Registration";
import Project from "./pages/data_project/Project";
import Notification from "../app/modules/components/notifikasi/Notifikasi";
import Profile from "../app/modules/components/profile/Profile";
import EditProfil from "../app/modules/components/edit_profile/Edit";
import Karyawan from "./pages/data_karyawan/Karyawan";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function AppRoutes ()
{
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/">
                        <Route index element={ <Dashboard /> } />
                        <Route path="login" element={ <Login /> } />
                        <Route path="register" element={ <Register /> } />
                        <Route path="data/projek" element={ <Project /> } />
                        <Route path="data/karyawan" element={ <Karyawan /> } />
                        <Route path="notifikasi" element={ <Notification /> } />
                        <Route path="profile" element={ <Profile /> } />
                        <Route path="edit-profile" element={ <EditProfil /> } />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default AppRoutes;
