import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import TopAppBar from './TopAppbar'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

export function MainPage(props) {
    const [balance, setBalance] = useState(0)
    const [store, setStore] = useState([])
    const email = localStorage.getItem("email")
    const result = { email }
    useEffect(() => {
        async function fetchData() {
            await axios.post("http://localhost:3000/expenses/getting-expenses", result)
                .then((res) => setStore(res.data))
        }
        fetchData();

    }, [])

    let a = store.reduce((accum, val) => {
        return val.type === "Expenditure" ? Number(accum) + Number(val.amount) : Number(accum)
    }, [])

    let b = store.reduce((accum, val) => {
        return val.type === "Income" ? Number(accum) + Number(val.amount) : Number(accum)
    }, [])
    useEffect(() => setBalance(b - a), [b, a])

    return (

        <Box>
            <TopAppBar />
            {/* <pre>{JSON.stringify(store, null, 2)}</pre> */}
            <Box sx={{ marginTop: "100px", display: "flex", justifyContent: "space-evenly" }}>
                <Box sx={{ display: "flex", width: "200px", border: "1px solid black", height: "130px", borderRadius: "20px", backgroundColor: "#EEEDEB" }}>
                    <Box sx={{ margin: "24px 24px", textAlign: "center" }}>
                        <Typography variant='h5'>Your Balance</Typography>
                        <Typography variant='h4' sx={{ marginTop: "10px" }} ><CurrencyRupeeIcon />{balance}</Typography>
                    </Box>
                </Box>
                <Box sx={{ display: "flex", width: "200px", border: "1px solid black", height: "130px", borderRadius: "20px", backgroundColor: "#EEEDEB" }}>

                    <Box sx={{ margin: "24px 24px", textAlign: "center" }}>
                        <Typography variant='h5'>Your Income</Typography>
                        <Typography variant='h4' sx={{ marginTop: "10px" }}> <CurrencyRupeeIcon />{store.reduce((accum, val) => {
                            return val.type === "Income" ? Number(accum) + Number(val.amount) : Number(accum)
                        }, [])}</Typography>
                    </Box>
                </Box>
                <Box sx={{ display: "flex", width: "200px", border: "1px solid black", height: "130px", borderRadius: "20px", backgroundColor: "#EEEDEB" }}>
                    <Box sx={{ margin: "24px 24px", textAlign: "center" }}>
                        <Typography variant='h5'>Your Expense</Typography>
                        <Typography variant='h4' sx={{ marginTop: "10px" }}><CurrencyRupeeIcon /> {store.reduce((accum, value) => {
                            return value.type === "Expenditure" ? Number(accum) + Number(value.amount) : Number(accum)
                        }, [])}</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>

    )
}
