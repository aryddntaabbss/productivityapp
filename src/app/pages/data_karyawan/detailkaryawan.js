export const userColumns = [
  { field: "id", headerName: "ID", width: 100 },
  {
    field: "nama",
    headerName: "Nama",
    width: 310,
    renderCell: ( params ) =>
    {
      return params.row.username;
    },
  },
  {
    field: "role",
    headerName: "Role",
    width: 300,
  },

  {
    field: "productivity",
    headerName: "Productivity",
    width: 150,
  },
  {
    field: "contribution",
    headerName: "Contribution",
    width: 150,
  },
];

//temporary data
export const userRows = [
  {
    id: "RL001",
    username: "Jhon",
    role: "Design",
    productivity: "90%",
    contribution: "80%",
  },
  {
    id: "RL002",
    username: "Kim",
    role: "Frontend",
    productivity: "70%",
    contribution: "90%",
  },
  {
    id: "RL003",
    username: "David",
    role: "Backend",
    productivity: "10%",
    contribution: "30%",
  },
  {
    id: "RL004",
    username: "Jane",
    role: "Mobile",
    productivity: "95%",
    contribution: "90%",
  },
  {
    id: "RL005",
    username: "Dave",
    role: "Quality Analist",
    productivity: "50%",
    contribution: "60%",
  },
  {
    id: "RL006",
    username: "Alex",
    role: "Analyst",
    productivity: "70%",
    contribution: "80%",
  },
  {
    id: "RL007",
    username: "Ucup",
    role: "Project Manager",
    productivity: "80%",
    contribution: "90%",
  },
  {
    id: "RL008",
    username: "Asep",
    role: "Design",
    productivity: "62%",
    contribution: "70%",
  },
  {
    id: "RL009",
    username: "Gunawan",
    role: "Mobile",
    productivity: "10%",
    contribution: "20%",
  },
  {
    id: "RL010",
    username: "Diana",
    role: "Analyst",
    productivity: "20%",
    contribution: "30%",
  },
  {
    id: "RL011",
    username: "Agus",
    role: "Frontend",
    productivity: "80%",
    contribution: "90%",
  },
  {
    id: "RL012",
    username: "Smith",
    role: "Quality Analyst",
    productivity: "90%",
    contribution: "100%",
  },
  {
    id: "RL013",
    username: "Marsel",
    role: "Analyst",
    productivity: "60%",
    contribution: "70%",
  },
  {
    id: "RL014",
    username: "Putri",
    role: "Admin",
    productivity: "55%",
    contribution: "65%",
  },
  {
    id: "RL015",
    username: "Jesica",
    role: "Admin",
    productivity: "75%",
    contribution: "85%",
  },
  {
    id: "RL016",
    username: "Dulla",
    role: "Project Manager",
    productivity: "53%",
    contribution: "63%",
  },

];
