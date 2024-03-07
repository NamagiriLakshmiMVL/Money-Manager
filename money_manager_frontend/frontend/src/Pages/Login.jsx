import React, { useState } from "react";
import {
  TextField,
  Typography,
  Button,
  Box,
  Toolbar,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import TopAppBar from "./TopAppbar";
import { toast } from "react-toastify";
import { API } from "../API";

export function Login(props) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const email = data.get("email");
    const password = data.get("password");
    const result = {
      email,
      password,
    };
    localStorage.setItem("email", email);
    await setLoader(true);
    await axios
      .post(`${API}/users/login`, result)
      .then((res) => {
        res.data === "Login Successfully"
          ?( toast.success(res.data, {
              position: "top-center",
              autoClose: 1000,
            }) && navigate("/main"))
          : toast.error(res.data, {
              position: "top-center",
              autoClose: 1000,
            });
      });
    setLoader(false);
  };

  return (
    <>
      <TopAppBar />

      <Box sx={{ marginTop: "100px" }}>
        {loader === true && (
          <CircularProgress sx={{ marginLeft: { xs: 13, sm: 50, md: 85 } }} />
        )}
        <Box sx={{ flexGrow: 1 }}>
          <Toolbar
            sx={{ display: "flex", justifyContent: "center", gap: "30px" }}
          >
            <Link to={"/login"}>
              <Button variant="text" sx={{ textDecoration: "underline" }}>
                Login
              </Button>
            </Link>
            <Link to={"/signup"}>
              <Button variant="text">Sign up</Button>
            </Link>
          </Toolbar>
        </Box>
        <form onSubmit={(e) => handleSubmit(e)}>
          <Box sx={{ textAlign: "center" }}>
            <Typography>Enter your Email Id</Typography>
            <TextField
              id="outlined-basic"
              label="Email"
              name="email"
              variant="outlined"
            />
            <Typography>Enter your Password</Typography>
            <TextField
              id="outlined-basic"
              label="Password"
              name="password"
              variant="outlined"
            />
            <br />
            <Button variant="contained" type="submit">
              {" "}
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
}
