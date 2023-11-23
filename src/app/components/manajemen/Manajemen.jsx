import "./manajemen.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../pages/manajemen_user/detailuser";
import { useState } from "react";

const Datatable = () => {
  const [data] = useState(userRows);

  return (
    <div className="datatable">
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat()}
        pageSize={15}
        rowsPerPageOptions={[10]}
      />
    </div>
  );
};

export default Datatable;
