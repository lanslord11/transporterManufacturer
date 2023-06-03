import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate, useLocation } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import "./Header.css";
import Cookies from "js-cookie";

function Header(props) {
  const { user, setUser } = props;
  const navigate = useNavigate();
  const location = useLocation();

  const logout = async () => {
    setUser(null);
    Cookies.remove("token");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            onClick={() => {
              logout();
            }}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            {user ? (
              <div>
                <LogoutIcon />
                <span>Logout</span>
              </div>
            ) : (
              ""
            )}
          </IconButton>

          <Typography
            onClick={() => {
              navigate("/");
            }}
            className="homeicon"
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Home
          </Typography>
          <Button
            onClick={() => {
              user ? navigate("/profile") : navigate("/login");
            }}
            color="inherit"
          >
            {user ? (
              <>
                <AccountCircleIcon />
                {user.name}
              </>
            ) : (
              "Login"
            )}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
