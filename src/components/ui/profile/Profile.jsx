import "./profile.scss";
import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { useSelector } from "react-redux";
import MainLayout from "../../layout/Layout/MainLayout";
import Logo from "../../../assets/logo.png";

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
      <div className="home">
        <Grid container spacing={2}>
          <Grid item xs={3} md={5}>
            <div className="listTitle">Profil</div>
          </Grid>
          <div className="card">
            <Grid item xs={3} md={12}>
              <img src={Logo} alt="Logo" className="img" />
              {userData && (
                <div className="profileDetails">
                  <div className="field-name">
                    <p>{userData.name}</p>
                  </div>
                  <div className="field">
                    <Grid container spacing={2}>
                      <Grid item md={4}>
                        <div className="text-header">ID</div>
                        <p>{userData.id}</p>
                      </Grid>
                      <Grid item md={4}>
                        <div className="text-header">EMAIL</div>
                        <p>{userData.email}</p>
                      </Grid>
                      <Grid item md={4}>
                        <div className="text-header">USER TYPE</div>
                        <p>{userData.userType}</p>
                      </Grid>
                    </Grid>
                  </div>
                </div>
              )}
            </Grid>
          </div>
        </Grid>
      </div>
    </MainLayout>
  );
};

export default Single;
