import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button, MenuItem, Select } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import axios from "axios";
import Cookies from "js-cookie";

function Signup(props) {
  const navigate = useNavigate();
  const { setUser } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [pinCode, setPinCode] = useState("");

  useEffect(() => {
    setRole("Role");
  }, []);

  const handleSubmit = async () => {
    const userData = {
      completeAddress: {
        address,
        city,
        state,
        country,
        pinCode,
      },
      name,
      email,
      password,
      role,
    };
    const config = {
      headers: {
        "Content-Type": "application/json",
        withCredntials: true,
        credentials: "include",
      },
    };
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/register",
        userData,
        config
      );
      Cookies.set("token", data.token, { expires: 30 });
      setUser(data.user);
      navigate("/");
    } catch (error) {
      alert(error.response.data.message);
      // console.log(error);
    }
  };
  return (
    <div>
      <div className="loginBox">
        <div style={{ marginTop: "5px" }}>
          <TextField
            label="Name"
            fullWidth
            variant="standard"
            sx={{ width: "100%" }}
            value={name}
            InputProps={{}}
            size="small"
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          {/* <TextField
            label="Name"
            fullWidth
            
            
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
            label="Email Address"
            fullWidth
            variant="standard"
            sx={{ width: "100%" }}
            value={email}
            InputProps={{}}
            size="small"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <TextField
            label="Password"
            fullWidth
            type="password"
            variant="standard"
            sx={{ width: "100%" }}
            value={password}
            InputProps={{}}
            size="small"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          {/* <InputLabel id="demo-simple-select-standard-label">Age</InputLabel> */}

          <Select
            variant="standard"
            sx={{ m: 1, minWidth: 350 }}
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={role}
            label="Role"
            onChange={(event) => setRole(event.target.value)}
          >
            {/* <MenuItem value="">
            <em></em>
            </MenuItem> */}
            <MenuItem value={"transporter"}>Transporter</MenuItem>
            <MenuItem value={"producer"}>Producer</MenuItem>
          </Select>
        </div>
        <div style={{ marginTop: "5px" }}>
          <TextField
            label="Address"
            fullWidth
            variant="standard"
            sx={{ width: "100%" }}
            value={address}
            InputProps={{}}
            size="small"
            onChange={(event) => {
              setAddress(event.target.value);
            }}
          />
          <TextField
            label="City"
            fullWidth
            variant="standard"
            sx={{ width: "100%" }}
            value={city}
            InputProps={{}}
            size="small"
            onChange={(event) => {
              setCity(event.target.value);
            }}
          />
          <TextField
            label="State"
            fullWidth
            variant="standard"
            sx={{ width: "100%" }}
            value={state}
            InputProps={{}}
            size="small"
            onChange={(event) => {
              setState(event.target.value);
            }}
          />
          <TextField
            label="Country"
            fullWidth
            variant="standard"
            sx={{ width: "100%" }}
            value={country}
            InputProps={{}}
            size="small"
            onChange={(event) => {
              setCountry(event.target.value);
            }}
          />
          <TextField
            label="PinCode"
            fullWidth
            variant="standard"
            sx={{ width: "100%" }}
            value={pinCode}
            InputProps={{}}
            size="small"
            onChange={(event) => {
              setPinCode(event.target.value);
            }}
          />
        </div>

        <div style={{ marginTop: "10px" }}>
          <Button
            variant="contained"
            fullWidth
            startIcon={<LoginIcon />}
            onClick={handleSubmit}
          >
            SIGNUP
          </Button>
        </div>

        <div style={{ marginTop: "7px", fontSize: "10px" }} margin="left">
          <br />
          Do you have an account ?{" "}
          <Link to="/login">
            <small style={{ textDecoration: "underline", color: "blue" }}>
              Sign In
            </small>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
