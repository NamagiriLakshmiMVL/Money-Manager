import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
export function Transactions(props) {
    const navigate = useNavigate()

    return (
        <>
            <Button onClick={() => navigate("/inc")}>Income </Button>
            <Button onClick={() => navigate("/exp")}>Expenses </Button>

        </>
    )
}
