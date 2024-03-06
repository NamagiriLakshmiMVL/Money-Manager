import React, { useEffect } from "react"
import { useState } from "react";
import axios from 'axios';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Table, TableCell, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';



export function UserInfo() {
    const [rows, setRows] = useState([])
    const [removedata, setRemovedata] = useState(false)

    const email = localStorage.getItem("email")
    const result = { email }
    useEffect(() => {
        axios.post("http://localhost:3000/expenses/getting-expenses", result)
            .then((res) => setRows(res.data))
    }, [removedata])

    const handleDelete = (id) => {
        const res = { id }
        axios.post("http://localhost:3000/expenses/deleting-expenses", res)
            .then((res) => alert(res.data))
        setRemovedata(prev => !prev);
    }
    const handleEdit = (val) => {

    }
    return (
        <div>
            <Typography variant="h5" sx={{textAlign:"center",marginBottom:"30px"}}>User Information</Typography>
            {/* <pre>{JSON.stringify(rows, null, 2)}</pre> */}
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell >Title</TableCell>
                            <TableCell align="right">Amount</TableCell>
                            <TableCell align="right">Type</TableCell>
                            <TableCell align="right">For</TableCell>
                            <TableCell align="right">Category</TableCell>
                            <TableCell align="right">Created At</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((val) => {
                            return <TableRow
                                key={val._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell align="right" >{val.title}</TableCell>
                                <TableCell align="right" >{val.amount}</TableCell>
                                <TableCell align="right">{val.type}</TableCell>
                                <TableCell align="right">{val.expensefor}</TableCell>
                                <TableCell align="right">{val.category}</TableCell>
                                <TableCell align="right">{val.createdAt}</TableCell>
                                <TableCell align="right">
                                    <Button onClick={() => handleEdit(val)}><EditIcon /></Button>
                                    <Button onClick={() => handleDelete(val._id)}><DeleteIcon /></Button>
                                </TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    )
}
