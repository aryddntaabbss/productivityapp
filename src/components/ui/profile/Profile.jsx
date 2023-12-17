import "./profile.scss";
import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { useSelector } from "react-redux";
import Navbar from "../../layout/Navbar/Navbar";
import Sidebar from "../../layout/Sidebar/Sidebar";
import Logo from "../../../assets/rllogo.png";

const Single = () => {
  // State untuk menyimpan data pengguna
  const [userData, setUserData] = useState(null);

  // Mengambil data pengguna dari Redux state menggunakan useSelector
  const data = useSelector((state) => state.user.user.data);
  console.log("data : ", data);

  // Efek yang berjalan saat data berubah
  useEffect(() => {
    // Jika data pengguna ada, diuraikan dan diset ke dalam state
    if (data) {
      setUserData({
        id: data.id,
        name: data.username,
        email: data.email,
        userType: data.userType,
      });
    }
  }, [data]); // Efek ini akan berjalan setiap kali data berubah

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="title">Profil</div>
        <div className="card">
          <Grid container spacing={2}>
            <Grid item xs={3} md={5}>
              <img src={Logo} alt="Logo" className="img" />
            </Grid>
            <Grid item xs={3} md={7}>
              {userData && (
                <div className="profileDetails">
                  ID
                  <div className="field">
                    <p>{userData.id}</p>
                  </div>
                  Nama
                  <div className="field">
                    <p>{userData.name}</p>
                  </div>
                  Email
                  <div className="field">
                    <p>{userData.email}</p>
                  </div>
                  User Type
                  <div className="field">
                    <p>{userData.userType}</p>
                  </div>
                </div>
              )}
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default Single;
