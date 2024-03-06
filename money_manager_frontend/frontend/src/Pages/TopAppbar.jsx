import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';


export default function TopAppBar() {
    const navigate = useNavigate()
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar >
                <Toolbar>
                    <AttachMoneyIcon
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </AttachMoneyIcon>
                    <Typography variant="h6">
                        Expense Tracker
                    </Typography>
                    <Typography sx={{ marginLeft: "50px" }}>
                        <Link to={"/dashboard"} ><Button sx={{ color: "whitesmoke" }} color='inherit'>Dashboard</Button></Link>
                        <Link to={"/main"}><Button sx={{ color: "whitesmoke" }} color='inherit'>Add Expense</Button></Link>
                        <Link to={"/inc"}><Button sx={{ color: "whitesmoke" }} color='inherit'>Income Transaction</Button></Link>
                        <Link to={"/exp"}><Button sx={{ color: "whitesmoke" }} color='inherit'>Exp Transaction</Button></Link>
                    </Typography>
                    <Button color="inherit" onClick={() => navigate("/login")}>Login</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
