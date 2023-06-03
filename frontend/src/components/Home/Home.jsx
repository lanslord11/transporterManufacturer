import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import "./Home.css";

// function createData(_id, to, from) {
//   return { _id, to, from };
// }

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0),
//   createData("Ice cream sandwich", 237, 9.0),
//   createData("Eclair", 262, 16.0),
//   createData("Cupcake", 305, 3.7),
//   createData("Gingerbread", 356, 16.0),
// ];

export default function Home(props) {
  const [myorders, setMyorders] = useState();
  const [search, setSearch] = useState("");

  const { user } = props;
  const navigate = useNavigate();

  const getHomeData = async (queries) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    let url = "http://localhost:4000/api/orders/me";
    if (queries) url = url + queries;
    try {
      const { data } = await axios.get(url, config);
      setMyorders(data.orders);
    } catch (error) {
      // console.log(error);
      alert(error.response.data.message);
      navigate("/login");
    }
  };

  const searchfunction = () => {
    getHomeData(`?keyword=${search}`);
  };

  useEffect(() => {
    // if (!user) {
    //   navigate("/login");
    // }
    getHomeData();
  }, [user]);
  return (
    <>
      <div className="homebox">
        <div className="searchbox">
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <SearchIcon
              className="searchIcon"
              onClick={searchfunction}
              sx={{ color: "action.active", mr: 1, my: 0.5 }}
            />
            <TextField
              id="input-with-sx"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              label="Search"
              variant="standard"
            />
          </Box>
        </div>
        <div className="tablebox">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>_id (Object_id)</TableCell>
                  <TableCell align="right">to</TableCell>
                  <TableCell align="right">from</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {myorders &&
                  myorders.map((row) => (
                    <TableRow
                      onClick={() => {
                        // console.log("clicked");
                        navigate(`/orders/${row._id}`);
                      }}
                      key={row._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row._id}
                      </TableCell>
                      <TableCell align="right">{row.to}</TableCell>
                      <TableCell align="right">{row.from}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      {user && user.role == "manufacturer" ? (
        <Button
          onClick={() => {
            navigate("/newOrder");
          }}
          style={{ margin: "3vh" }}
          variant="contained"
        >
          New Order
        </Button>
      ) : (
        " "
      )}
    </>
  );
}
