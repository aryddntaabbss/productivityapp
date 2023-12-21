import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import PersonIcon from "@mui/icons-material/Person";
import FolderIcon from "@mui/icons-material/Folder";
import BarChartIcon from "@mui/icons-material/BarChart";
import { DASHBOARD_URL } from "../../../routes/ApiBase";
import "./widget.scss";

const Widget = ({ type }) => {
  const jwtToken = useSelector((state) => state.user.user.data.jwtToken);
  const [data, setData] = useState({
    title: "",
    counter: "",
    complete: "",
    incomplete: "",
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

        const employees = response.data.data.employees;

        const totalProductivity = employees.reduce(
          (sum, employee) => sum + employee.productivity,
          0
        );
        const averageProductivity = (
          totalProductivity / employees.length
        ).toFixed(0);

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

          case "project":
            setData({
              title: "Project",
              counter: result.data.dashboard.projectCount,
              complete: result.data.dashboard.projectComplete,
              incomplete: result.data.dashboard.projectIncomplete,
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
          case "ratarata":
            setData({
              title: "Rata-Rata Productivity",
              counter: `${averageProductivity} %`,
              icon: (
                <BarChartIcon
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
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [type, jwtToken]);

  // ...

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">{data.counter}</span>
      </div>
      <div className="right">
        <div className="percentage">
          <div className="indicator">
            <span className="positive">
              {data.complete && `Complete : ${data.complete}`}
            </span>
            <br />
            <span className="negative">
              {data.incomplete && `Incomplete : ${data.incomplete}`}
            </span>
          </div>
        </div>
        {data.icon}
      </div>
    </div>
  );
  // ...
};

export default Widget;
