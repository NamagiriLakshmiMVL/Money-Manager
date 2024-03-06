import React from 'react'
import { TextField, Typography, Button, Box, Toolbar } from "@mui/material"
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import TopAppBar from './TopAppbar';

export function Login(props) {
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const email = data.get("email");
        const password = data.get("password")
        const result = {
            email,
            password
        }
        localStorage.setItem("email", email)
        await axios.post("http://localhost:3000/users/login", result)
            .then((res) => (res.data === "Login Successfully") ? navigate("/main") : alert("User Not Exists"))
    }
    return (
        <>

            <TopAppBar />
            <Box sx={{ marginTop: "100px" }}>
                <Box sx={{ flexGrow: 1 }}>
                    <Toolbar sx={{ display: "flex", justifyContent: "center", gap: "30px" }} >
                        <Link to={"/login"}><Button variant="text" sx={{ textDecoration: "underline" }}>Login</Button></Link>
                        <Link to={"/signup"}><Button variant="text">Sign up</Button></Link>
                    </Toolbar>
                </Box>
                <form onSubmit={(e) => handleSubmit(e)} >
                    <Box sx={{ textAlign: "center" }} >
                        <Typography>Enter your Email Id</Typography>
                        <TextField id="outlined-basic" label="Email" name="email" variant="outlined" />
                        <Typography>Enter your Password</Typography>
                        <TextField id="outlined-basic" label="Password" name='password' variant="outlined" />
                        <br />
                        <Button variant='contained' type='submit' > Submit</Button>
                    </Box>
                </form>
            </Box>
        </>
    )
}
