import { Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import axios from "axios"

export function Expense({val}) {
    const [type, setType] = useState('Income');
    const [title, setTitle] = useState("")
    const [amount, setAmount] = useState("")
    const [category, setCategory] = useState("")
    

    const handleChange = (event) => {
        setType(event.target.value);
    };
    const [expenditure, setExpenditure] = React.useState('Personal');
    const handleChange2 = (event) => {
        setExpenditure(event.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = new FormData(e.target)
        const title = data.get("title")
        const amount = data.get("amount")
        const category = data.get("category")
        const email = localStorage.getItem("email")
        const newExpense = {
            title,
            amount,
            type,
            expensefor: expenditure,
            category,
            email
        }
        console.log(newExpense)
        await axios.post("http://localhost:3000/expenses/adding-expenses", newExpense)
            .then((res) => alert(res.data))

        await setTitle("")
        await setAmount("")
        await setCategory("")

    }

    console.log(val)
    return (
        <>
            <Box>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <Typography>Title</Typography>
                    <TextField id="outlined-basic" label="Title" name='title' value={title} variant="outlined" onChange={(e) => setTitle(e.target.value)} />
                    <Typography>Amount</Typography>
                    <TextField id="outlined-basic" label="Amount" value={amount} name='amount' variant="outlined" onChange={(e) => setAmount(e.target.value)} />
                    <Box sx={{ minWidth: 120 }}>
                        <Typography>Type</Typography>
                        <FormControl fullWidth>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={type}
                                onChange={handleChange}
                                name={type}
                                sx={{ width: { sx: "100px", md: "223px" } }}
                            >
                                <MenuItem value="Income">Income</MenuItem>
                                <MenuItem value="Expenditure">Expenditure</MenuItem>
                            </Select>
                        </FormControl>

                    </Box>
                    <Typography>Category</Typography>
                    <TextField id="outlined-basic" label="Category" value={category} name='category' variant="outlined" onChange={(e) => setCategory(e.target.value)} />
                    <Box sx={{ minWidth: 120 }}>
                        <Typography>Expense for</Typography>
                        <FormControl fullWidth>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={expenditure}
                                onChange={handleChange2}
                                sx={{ width: { sx: "100px", md: "223px" } }}
                            >
                                <MenuItem value="Personal">Personal</MenuItem>
                                <MenuItem value="Office">Office</MenuItem>
                            </Select>
                        </FormControl>

                    </Box>
                    <Button variant='contained' type='submit' > Submit</Button>

                </form>
            </Box>

        </>
    )
}
