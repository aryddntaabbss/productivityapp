import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./auth/pages/Login";
import Register from "./auth/pages/Registration";
import Project from "./pages/data_project/Project";
import Notification from "./components/notifikasi/Notifikasi";
import Profile from "./components/profile/Profile";
import EditProfil from "./components/edit_profile/Edit";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { userInputs } from "./formSource";
import Karyawan from "./pages/data_karyawan/Karyawan";

function App ()
{
  // function App() {
  // const token = localStorage.getItem('accessToken');

  //   if ( !token )
  //   {
  //     return <Signin />
  //   }

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={ <Dashboard /> } />
            <Route path="/login" element={ <Login /> } />
            <Route path="/register" element={ <Register /> } />
            <Route path="/data/projek">
              <Route index element={ <Project /> } />
            </Route>
            <Route path="/data/karyawan">
              <Route index element={ <Karyawan /> } />
            </Route>
            <Route path="/notifikasi" element={ <Notification /> } />
            <Route path="/profile" element={ <Profile /> } />
            <Route path="/edit-profile" element={ <EditProfil /> } />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
