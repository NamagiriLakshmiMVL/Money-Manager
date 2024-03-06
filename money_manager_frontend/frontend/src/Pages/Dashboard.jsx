import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import TopAppBar from './TopAppbar'

export function MainPage(props) {
    const [balance, setBalance] = useState(0)
    const [store, setStore] = useState([])
    const email = localStorage.getItem("email")
    const result = { email }
    useEffect(async () => {
        await axios.post("http://localhost:3000/expenses/getting-expenses", result)
            .then((res) => setStore(res.data))

    }, [])

    let a = store.reduce((accum, val) => {
        return val.type === "Expenditure" ? Number(accum) + Number(val.amount) : Number(accum)
    }, [])

    let b = store.reduce((accum, val) => {
        return val.type === "Income" ? Number(accum) + Number(val.amount) : Number(accum)
    }, [])
    useEffect(() => setBalance(b - a))

    return (

        <Box>
            <TopAppBar />
            {/* <pre>{JSON.stringify(store, null, 2)}</pre> */}
            <Box sx={{ marginTop: "100px", display: "flex" }}>
                <Box sx={{ display: "flex", width: "200px", border: "1px solid black", height: "130px" }}>
                    <Typography variant='h5'>$</Typography>
                    <Box>
                        <Typography variant='h5'>Your Balance</Typography>
                        <Typography variant='h4'>{balance}</Typography>
                    </Box>
                </Box>
                <Box sx={{ display: "flex", width: "200px", border: "1px solid black", height: "130px" }}>
                    <Typography variant='h5'>$</Typography>
                    <Box>
                        <Typography variant='h5'>Your Income</Typography>


                        <Typography variant='h4'> {store.reduce((accum, val) => {
                            return val.type === "Income" ? Number(accum) + Number(val.amount) : Number(accum)
                        }, [])}</Typography>
                    </Box>
                </Box>
                <Box sx={{ display: "flex", width: "200px", border: "1px solid black", height: "130px" }}>
                    <Typography variant='h5'>$</Typography>
                    <Box>
                        <Typography variant='h5'>Your Expenses</Typography>

                        <Typography variant='h4'> {store.reduce((accum, value) => {
                            return value.type === "Expenditure" ? Number(accum) + Number(value.amount) : Number(accum)
                        }, [])}</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>

    )
}
