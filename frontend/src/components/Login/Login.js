import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import {
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  IconButton,
  Button,
  Input,
  Checkbox,
  Alert,
  Stack,
  MenuItem,
  Select,
} from "@mui/material";
import "./Login.css";

// Material UI Icon Imports
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoginIcon from "@mui/icons-material/Login";

const isEmail = (email) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

function Login(props) {
  const { setUser, user } = props;
  //Inputs
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  // // Inputs Errors
  // const [emailError, setEmailError] = useState(false);
  // const [passwordError, setPasswordError] = useState(false);

  // Overall Form Validity
  // const [formValid, setFormValid] = useState();
  // const [success, setSuccess] = useState();

  // // Handles Display and Hide Password
  // const handleClickShowPassword = () => setShowPassword((show) => !show);
  // const handleMouseDownPassword = (event) => {
  //   event.preventDefault();
  // };

  // Label for Checkbox
  // const label = { inputProps: { "aria-label": "Checkbox demo" } };

  // Validation for onBlur Email
  // const handleEmail = () => {
  //   console.log(isEmail(emailInput));
  //   if (!isEmail(emailInput)) {
  //     setEmailError(true);
  //     return;
  //   }

  //   setEmailError(false);
  // };

  // Validation for onBlur Password
  // const handlePassword = () => {
  //   if (
  //     !passwordInput ||
  //     passwordInput.length < 5 ||
  //     passwordInput.length > 20
  //   ) {
  //     setPasswordError(true);
  //     return;
  //   }

  //   setPasswordError(false);
  // };

  //handle Submittion
  const handleSubmit = async (event) => {
    const userData = {
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
        "http://localhost:4000/api/login",
        userData,
        config
      );
      Cookies.set("token", data.token, { expires: 30 });
      setUser(data.user);
    } catch (error) {
      alert(error.response.data.message);
      // console.log(error);
    }
    //   setSuccess(null);
    //   //First of all Check for Errors

    //   // If Email error is true
    //   if (emailError || !emailInput) {
    //     setFormValid("Email is Invalid. Please Re-Enter");
    //     return;
    //   }

    //   // If Password error is true
    //   if (passwordError || !passwordInput) {
    //     setFormValid(
    //       "Password is set btw 5 - 20 characters long. Please Re-Enter"
    //     );
    //     return;
    //   }
    //   setFormValid(null);

    //   // Proceed to use the information passed
    //   console.log("Email : " + emailInput);
    //   console.log("Password : " + passwordInput);
    //   console.log("Remember : " + rememberMe);

    //   //Show Successfull Submittion
    //   setSuccess("Form Submitted Successfully");
  };
  useEffect(() => {
    if (user) navigate("/");
  }, [user]);

  return (
    <div className="loginBox">
      <div style={{ marginTop: "5px" }}>
        <TextField
          label="Email Address"
          fullWidth
          // id="standard-basic"
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
          id="standard-basic"
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
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">Role</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={role}
            onChange={(event) => setRole(event.target.value)}
            label="Role"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"transporter"}>Transporter</MenuItem>
            <MenuItem value={"manufacturer"}>Manufacturer</MenuItem>
          </Select>
        </FormControl>
        {/* <Select
          variant="standard"
          sx={{ m: 1, minWidth: 350 }}
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={role}
          label="Role"
          onChange={(event) => setRole(event.target.value)}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"transporter"}>Transporter</MenuItem>
          <MenuItem value={"manufacturer"}>Manufacturer</MenuItem>
        </Select> */}
      </div>
      {/* <div style={{ marginTop: "5px" }}>
          <FormControl sx={{ width: "100%" }} variant="standard">
            <InputLabel
              error={passwordError}
              htmlFor="standard-adornment-password"
            >
              Password
            </InputLabel>
            <Input
              error={passwordError}
              onBlur={handlePassword}
              id="standard-adornment-password"
              type={showPassword ? "text" : "password"}
              onChange={(event) => {
                setPasswordInput(event.target.value);
              }}
              value={passwordInput}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </div>
   */}

      <div style={{ marginTop: "10px" }}>
        <Button
          variant="contained"
          fullWidth
          startIcon={<LoginIcon />}
          onClick={handleSubmit}
        >
          LOGIN
        </Button>
      </div>

      {/* Show Form Error if any */}
      {/* {formValid && (
          <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
            <Alert severity="error" size="small">
              {formValid}
            </Alert>
          </Stack>
        )} */}

      {/* Show Success if no issues */}
      {/* {success && (
          <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
            <Alert severity="success" size="small">
              {success}
            </Alert>
          </Stack>
        )} */}

      <div style={{ marginTop: "7px", fontSize: "10px" }} margin="left">
        <br />
        Do you have an account ?{" "}
        <Link to="/signup">
          <small style={{ textDecoration: "underline", color: "blue" }}>
            Sign Up
          </small>
        </Link>
      </div>
    </div>
  );
}

export default Login;
