import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Typography,
  Button,
  Box,
  Toolbar,
  CircularProgress,
  Stack,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import TopAppBar from "../../TopAppbar";
import { toast } from "react-toastify";
import { API } from "../../../API";

export function Signup(props) {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    setLoader(true);
    e.preventDefault();
    const data = new FormData(e.target);
    const name = data.get("name");
    const mobile = data.get("mobile");
    const email = data.get("email");
    const password = data.get("password");
    const newUser = {
      name,
      mobile,
      email,
      password,
    };
    localStorage.setItem("email", email);
    await axios.post(`${API}/users/creating-users`, newUser).then((res) => {
      res.data.message === "User Created Successfully"
        ? toast.success(res.data.message, {
            position: "top-center",
            autoClose: 1000,
          }) && navigate("/dashboard")
        : toast.error(res.data.message, {
            position: "top-center",
            autoClose: 1000,
          });
      localStorage.setItem("x-auth-token", res.data.token);
      setLoader(false);
    });
  };
  return (
    <>
      <Box sx={{ marginTop: "20px", width: "20%" }}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <Stack spacing={1}>
            {loader === true && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CircularProgress />
              </Box>
            )}

            <Typography>Enter your Name</Typography>
            <TextField
              id="outlined-basic"
              placeholder="Name"
              name="name"
              variant="outlined"
            />
            <Typography>Enter your Mobile Number</Typography>
            <TextField
              id="outlined-basic"
              placeholder="Mobile Number"
              name="mobile"
              variant="outlined"
            />
            <Typography>Enter your Email Id</Typography>
            <TextField
              id="outlined-basic"
              name="email"
              placeholder="Email"
              variant="outlined"
            />
            <Typography>Enter your Password</Typography>
            <TextField
              id="outlined-basic"
              name="password"
              placeholder="Password"
              variant="outlined"
            />
            <br />
            <Button
              variant="contained"
              type="submit"
              sx={{ marginTop: "20px", width: "100%" }}
            >
              Submit
            </Button>
          </Stack>
        </form>
      </Box>
    </>
  );
}
