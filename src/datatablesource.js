export const userColumns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "namaproject",
    headerName: "Nama Project",
    width: 300,
    renderCell: ( params ) =>
    {
      return params.row.username;
    },
  },
  {
    field: "tanggal",
    headerName: "Tanggal",
    width: 300,
  },

  {
    field: "status",
    headerName: "Status",
    width: 320,

  }
];

//temporary data
export const userRows = [
  {
    id: 1,
    username: "Project1",
    tanggal: "12 Mei 2023 / 20 Juni 2023",
    status: "Complete",
  },
  {
    id: 2,
    username: "Project2",
    tanggal: "12 Mei 2023 / 20 Juni 2023",
    status: "Progres",
  },
  {
    id: 3,
    username: "Project3",
    tanggal: "12 Mei 2023 / 20 Juni 2023",
    status: "Progres",
  },
  {
    id: 4,
    username: "Project4",
    tanggal: "12 Mei 2023 / 20 Juni 2023",
    status: "Complete",
  },
  {
    id: 5,
    username: "Project5",
    tanggal: "12 Mei 2023 / 20 Juni 2023",
    status: "Progres",
  },
  {
    id: 6,
    username: "Project6",
    tanggal: "12 Mei 2023 / 20 Juni 2023",
    status: "Complete",
  },
  {
    id: 7,
    username: "Project7",
    tanggal: "12 Mei 2023 / 20 Juni 2023",
    status: "Progres",
  },
  {
    id: 8,
    username: "Project8",
    tanggal: "12 Mei 2023 / 20 Juni 2023",
    status: "Complete",
  },
  {
    id: 9,
    username: "Project9",
    tanggal: "12 Mei 2023 / 20 Juni 2023",
    status: "Progres",
  },
  {
    id: 10,
    username: "Project10",
    tanggal: "12 Mei 2023 / 20 Juni 2023",
    status: "Complete",
  },
  {
    id: 11,
    username: "Project11",
    tanggal: "12 Mei 2023 / 20 Juni 2023",
    status: "Complete",
  },
  {
    id: 12,
    username: "Project12",
    tanggal: "12 Mei 2023 / 20 Juni 2023",
    status: "Progres",
  },
  {
    id: 13,
    username: "Project13",
    tanggal: "12 Mei 2023 / 20 Juni 2023",
    status: "Progres",
  },
];
