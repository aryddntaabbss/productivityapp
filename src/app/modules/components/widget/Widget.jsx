import "./widget.scss";
import PersonIcon from "@mui/icons-material/Person";
import FolderIcon from "@mui/icons-material/Folder";
import PendingIcon from "@mui/icons-material/Pending";

const Widget = ({ type }) => {
  let data;

  switch (type) {
    case "karyawan":
      data = {
        title: "Karyawan",
        counter: "80",
        icon: (
          <PersonIcon
            className="icon"
            style={{
              backgroundColor: "#E3E3E3",
              color: "#2699FB",
            }}
          />
        ),
      };
      break;
    case "semuaproject":
      data = {
        title: "Semua Project",
        counter: "20",
        icon: (
          <FolderIcon
            className="icon"
            style={{
              backgroundColor: "#E3E3E3",
              color: "#2699FB",
            }}
          />
        ),
      };
      break;
    case "projectberjalan":
      data = {
        title: "Project Berjalan",
        counter: "7",
        icon: (
          <PendingIcon
            className="icon"
            style={{
              backgroundColor: "#E3E3E3",
              color: "#2699FB",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter"> {data.counter}</span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">{data.icon}</div>
    </div>
  );
};

export default Widget;
