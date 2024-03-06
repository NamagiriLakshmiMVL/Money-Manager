import React, { useState } from 'react'
import { Expense } from './Expense'
import { UserInfo } from './UserInfo';
import TopAppBar from './TopAppbar';
import { Box } from '@mui/material';

export function AddingExp(props) {
    const [sample, setSample] = useState(false)

    return (
        <div>
            <TopAppBar />
            <Box sx={{ marginTop: "100px", display: "flex", justifyContent: "space-evenly" }}>
                <Expense />
                <UserInfo />
            </Box>
        </div>
    )
}
