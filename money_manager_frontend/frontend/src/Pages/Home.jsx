import React from 'react'
import { Login } from './Login'
import { Signup } from './Signup'
import { Link } from 'react-router-dom'
import { AppBar, Box, Button, Toolbar } from '@mui/material'
import TopAppBar from './TopAppbar'

export function Home(props) {

    return (
        <div>
            <TopAppBar />
            <Box sx={{marginTop:"100px"}}>
                <Login />
            </Box>

        </div>
    )
}
