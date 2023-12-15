import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import PersonIcon from "@mui/icons-material/Person";
import FolderIcon from "@mui/icons-material/Folder";
import PendingIcon from "@mui/icons-material/Pending";
import { DASHBOARD_URL } from "../../../routes/authCrud";
import "./widget.scss";

const Widget = ({ type }) => {
  const jwtToken = useSelector((state) => state.user.user.data.jwtToken);
  const [data, setData] = useState({
    title: "",
    counter: "",
    icon: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(DASHBOARD_URL, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });

        const result = response.data;

        switch (type) {
          case "karyawan":
            setData({
              title: "Karyawan",
              counter: result.data.dashboard.employeeCount,
              icon: (
                <PersonIcon
                  className="icon"
                  style={{
                    backgroundColor: "#E3E3E3",
                    color: "#2699FB",
                  }}
                />
              ),
            });
            break;

          case "totalproject":
            setData({
              title: "Total Project",
              counter: result.data.dashboard.projectCount,
              icon: (
                <FolderIcon
                  className="icon"
                  style={{
                    backgroundColor: "#E3E3E3",
                    color: "#2699FB",
                  }}
                />
              ),
            });
            break;
          case "projectberjalan":
            setData({
              title: "Project Berjalan",
              counter: result.data.dashboard.projectInProgress,
              icon: (
                <PendingIcon
                  className="icon"
                  style={{
                    backgroundColor: "#E3E3E3",
                    color: "#2699FB",
                  }}
                />
              ),
            });
            break;
          default:
            break;
        }

        //Test Karyawan
        // console.log("haluu : ", result.data.employees.normalizedEmail);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [type, jwtToken]);

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter"> {data.counter}</span>
      </div>
      <div className="right">{data.icon}</div>
    </div>
  );
};

export default Widget;
