import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";

const CreateOrder = () => {
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [quantity, setQuantity] = useState("");
  const [transporter, setTransporter] = useState("");
  const [allTransporters, setAllTransporters] = useState();

  const navigate = useNavigate();

  const getAllTransporters = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    try {
      const data = await axios.get(
        "http://localhost:4000/api/transporters",
        config
      );
      // console.log(data.data.users);
      setAllTransporters(data.data.users);
      // console.log(data.data.user);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const createOrder = async () => {
    const orderInfo = {
      to,
      from,
      quantity,
      transporter,
    };
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    try {
      const data = await axios.post(
        "http://localhost:4000/api/order/new",
        orderInfo,
        config
      );
      console.log(data);
      // console.log(data.data.users);
      navigate(`/orders/${data.data.order._id}`);
      // console.log(data.data.user);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    //   setRole("Role");
    getAllTransporters();
  }, []);

  const handleSubmit = () => {};
  return (
    <div>
      <div className="loginBox">
        <div style={{ marginTop: "5px" }}>
          <TextField
            label="to"
            fullWidth
            id="standard-basic"
            variant="standard"
            sx={{ width: "100%" }}
            value={to}
            InputProps={{}}
            size="small"
            onChange={(event) => {
              setTo(event.target.value);
            }}
          />
          {/* <TextField
            label="Name"
            fullWidth
            
            id="standard-basic"
            variant="standard"
            sx={{ width: "100%" }}
            value={name}
            InputProps={{}}
            size="small"
        
            onChange={(event) => {
              setName(event.target.value);
            }}
          /> */}
          <TextField
            label="from"
            fullWidth
            id="standard-basic"
            variant="standard"
            sx={{ width: "100%" }}
            value={from}
            InputProps={{}}
            size="small"
            onChange={(event) => {
              setFrom(event.target.value);
            }}
          />
          {/* <TextField
            label="quantity"
            fullWidth
            id="standard-basic"
            variant="standard"
            sx={{ width: "100%" }}
            value={quantity}
            InputProps={{}}
            size="small"
            onChange={(event) => {
              setQuantity(event.target.value);
            }}
          /> */}
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">
              Quantity
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
              label="Quantity"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
            </Select>
          </FormControl>
          {/* <InputLabel id="demo-simple-select-standard-label">Age</InputLabel> */}
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">
              Transporter
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={transporter}
              onChange={(event) => setTransporter(event.target.value)}
              label="Transporter"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {allTransporters &&
                allTransporters.map((transporter) => (
                  <MenuItem key={transporter._id} value={transporter._id}>
                    {transporter._id}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          {/* <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">Age</InputLabel>
            <Select
              variant="standard"
              sx={{ m: 1, minWidth: 350 }}
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={transporter}
              label="Role"
              onChange={(event) => setTransporter(event.target.value)}
              defaultValue=""
            >
              
              {allTransporters &&
                allTransporters.map((transporter) => (
                  <MenuItem key={transporter._id} value={transporter._id}>
                    {transporter._id}
                  </MenuItem>
                ))}
            </Select>
          </FormControl> */}
        </div>

        <div style={{ marginTop: "10px" }}>
          <Button
            variant="contained"
            fullWidth
            startIcon={<LoginIcon />}
            onClick={() => {
              createOrder();
            }}
          >
            Create Order
          </Button>
        </div>

        {/* <div style={{ marginTop: "7px", fontSize: "10px" }} margin="left">
          <br />
          Do you have an account ?{" "}
          <Link to="/login">
          <small style={{ textDecoration: "underline", color: "blue" }}>
            Sign In
          </small>
          </Link>
          
        </div> */}
      </div>
    </div>
  );
};

export default CreateOrder;
