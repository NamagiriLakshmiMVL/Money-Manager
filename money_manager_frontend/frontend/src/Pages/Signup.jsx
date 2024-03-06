import React from 'react'
import axios from "axios"
import { TextField, Typography, Button, Box, Toolbar } from "@mui/material"
import { Link, useNavigate } from 'react-router-dom'
import TopAppBar from './TopAppbar'
export function Signup(props) {
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target)
        const name = data.get("name")
        const mobile = data.get("mobile")
        const email = data.get("email")
        const password = data.get("password")
        const newUser = {
            name,
            mobile,
            email,
            password
        }
        localStorage.setItem("email", email)
        console.log(newUser)
        await axios.post("http://localhost:3000/users/creating-users", newUser)
            .then((res) => alert(res.data))
            .then(() => navigate("/main"))
    }
    return (

        <Box >
            <TopAppBar />
            <Box sx={{ flexGrow: 1, marginTop: "100px" }}>
                <Toolbar sx={{ display: "flex", justifyContent: "center", gap: "30px" }} >
                    <Link to={"/login"}><Button variant="text">Login</Button></Link>
                    <Link to={"/signup"}><Button variant="text" sx={{ textDecoration: "underline" }}>Sign up</Button></Link>
                </Toolbar>
            </Box>
            <form onSubmit={(e) => handleSubmit(e)} >
                <Box sx={{ textAlign: "center" }} >
                    <Typography>Enter your Name</Typography>
                    <TextField id="outlined-basic" label="Name" name='name' variant="outlined" />
                    <Typography>Enter your Mobile Number</Typography>
                    <TextField id="outlined-basic" label="Mobile Number" name='mobile' variant="outlined" />
                    <Typography>Enter your Email Id</Typography>
                    <TextField id="outlined-basic" name='email' label="Email" variant="outlined" />
                    <Typography>Enter your Password</Typography>
                    <TextField id="outlined-basic" name="password" label="Password" variant="outlined" />
                    <br />
                    <Button variant='contained' type='submit' > Submit</Button>
                </Box>
            </form>
        </Box>
    )
}