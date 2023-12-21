import "./profile.scss";
import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { useSelector } from "react-redux";
import MainLayout from "../../layout/Layout/MainLayout";
import Logo from "../../../assets/rllogo.png";

const Single = () => {
  const [userData, setUserData] = useState(null);

  const data = useSelector((state) => state.user.user.data);
  console.log("data : ", data);

  useEffect(() => {
    if (data) {
      setUserData({
        id: data.id,
        name: data.username,
        email: data.email,
        userType: data.userType,
      });
    }
  }, [data]);

  return (
    <MainLayout>
      <div className="homeContainer">
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
    </MainLayout>
  );
};

export default Single;
