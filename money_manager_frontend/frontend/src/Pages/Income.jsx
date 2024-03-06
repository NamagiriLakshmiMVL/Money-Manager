import React, { useEffect } from 'react'
import { useState } from "react";
import axios from 'axios';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Table, TableCell, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import TopAppBar from './TopAppbar';

export function Income(props) {
    const [test, setTest] = useState([])
    const [rows, setRows] = useState([])
    const email = localStorage.getItem("email")
    const result = {
        email,
    }
    const rowsUpdate = async ()=> 
       
        await axios.post("http://localhost:3000/expenses/getting-expenses", result)
            .then((res) => setRows((res.data).filter((val) => val.type === "Income")))
    
    useEffect(() => {
        rowsUpdate()

    }, [rows])


    return (
        <>
           
                <TopAppBar/>
                <Box sx={{marginTop:"100px"}}>
                {/* <pre>{JSON.stringify(rows,null,2)}</pre> */}
                <Typography>Income Transaction</Typography>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell >Title</TableCell>
                                <TableCell align="right">Amount</TableCell>
                                <TableCell align="right">For</TableCell>
                                <TableCell align="right">Category</TableCell>
                                <TableCell align="right">Created At</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((val) => {
                                return <TableRow
                                    key={val._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell align="right" >{val.title}</TableCell>
                                    <TableCell align="right" >{val.amount}</TableCell>
                                    <TableCell align="right">{val.expensefor}</TableCell>
                                    <TableCell align="right">{val.category}</TableCell>
                                    <TableCell align="right">{val.createdAt}</TableCell>

                                </TableRow>
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    )
}
