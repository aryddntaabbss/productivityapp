export const userColumns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "namaprojek",
    headerName: "Nama Projek",
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
    username: "Projek1",
    tanggal: "12 Mei 2023 / 20 Juni 2023",
    status: "Complete",
  },
  {
    id: 2,
    username: "Projek2",
    tanggal: "12 Mei 2023 / 20 Juni 2023",
    status: "Progres",
  },
  {
    id: 3,
    username: "Projek3",
    tanggal: "12 Mei 2023 / 20 Juni 2023",
    status: "Progres",
  },
  {
    id: 4,
    username: "Projek4",
    tanggal: "12 Mei 2023 / 20 Juni 2023",
    status: "Complete",
  },
  {
    id: 5,
    username: "Projek5",
    tanggal: "12 Mei 2023 / 20 Juni 2023",
    status: "Progres",
  },
  {
    id: 6,
    username: "Projek6",
    tanggal: "12 Mei 2023 / 20 Juni 2023",
    status: "Complete",
  },
  {
    id: 7,
    username: "Projek7",
    tanggal: "12 Mei 2023 / 20 Juni 2023",
    status: "Progres",
  },
  {
    id: 8,
    username: "Projek8",
    tanggal: "12 Mei 2023 / 20 Juni 2023",
    status: "Complete",
  },
  {
    id: 9,
    username: "Projek9",
    tanggal: "12 Mei 2023 / 20 Juni 2023",
    status: "Progres",
  },
  {
    id: 10,
    username: "Projek10",
    tanggal: "12 Mei 2023 / 20 Juni 2023",
    status: "Complete",
  },
  {
    id: 11,
    username: "Projek11",
    tanggal: "12 Mei 2023 / 20 Juni 2023",
    status: "Complete",
  },
  {
    id: 12,
    username: "Projek12",
    tanggal: "12 Mei 2023 / 20 Juni 2023",
    status: "Progres",
  },
  {
    id: 13,
    username: "Projek13",
    tanggal: "12 Mei 2023 / 20 Juni 2023",
    status: "Progres",
  },
];
