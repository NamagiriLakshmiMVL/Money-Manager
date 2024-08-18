import React, { useState } from "react";
import {
  TextField,
  Typography,
  Button,
  Box,
  Toolbar,
  CircularProgress,
  Stack,
} from "@mui/material";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import TopAppBar from "../../TopAppbar";
import { toast } from "react-toastify";
import { API } from "../../../API";

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
    await axios.post(`${API}/users/login`, result).then((res) => {
      res.data.message === "Login Successfully"
        ? toast.success(res.data.message, {
            position: "top-center",
            autoClose: 1000,
          }) && navigate("/dashboard")
        : toast.error(res.data.message, {
            position: "top-center",
            autoClose: 1000,
          });
      localStorage.setItem("x-auth-token", res.data.token);
      localStorage.setItem("result", "Yes");
    });
    setLoader(false);
  };

  return (
    <>
      <Box sx={{ marginTop: "20px", width: "20%" }}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <Stack spacing={1} centerContent>
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
            <Typography>Enter your Email Id</Typography>
            <TextField
              id="outlined-basic"
              placeholder="Email"
              name="email"
              variant="outlined"
            />
            <Typography>Enter your Password</Typography>
            <TextField
              id="outlined-basic"
              placeholder="Password"
              name="password"
              variant="outlined"
            />
            <br />
            <Button
              variant="contained"
              type="submit"
              sx={{ marginTop: "20px", textAlign: "center", width: "100%" }}
            >
              Submit
            </Button>
          </Stack>
        </form>
      </Box>
    </>
  );
}
