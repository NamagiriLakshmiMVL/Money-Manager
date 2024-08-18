import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box, Table, TableCell, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { API } from "../API";

export function Income(props) {
  const token = localStorage.getItem("x-auth-token");
  const [rows, setRows] = useState([]);
  const email = localStorage.getItem("email");
  const result = {
    email,
  };
  const rowsUpdate = async () =>
    await axios
      .post(`${API}/expenses/getting-expenses`, result, {
        headers: {
          "x-auth-token": token,
        },
      })
      .then((res) => setRows(res.data.filter((val) => val.type === "Income")));
  useEffect(() => {
    rowsUpdate();
  }, [rows]);
  console.log(rows);
  let arr = ["Title", "Amount", "Type", "For", "Category", "Created At"];
  return (
    <>
      <Box sx={{ marginTop: "100px" }}>
        <Typography
          variant="h5"
          sx={{
            textAlign: "center",
            fontFamily: "monospace",
            color: "brown",
            fontWeight: "bold",
            fontSize: 30,
          }}
        >
          Income Transaction
        </Typography>
        <TableContainer
          component={Paper}
          sx={{
            width: "60%",
            textAlign: "center",
            marginLeft: "20%",
            marginTop: "20px",
            border: "1px solid black",
          }}
        >
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                {arr.map((val, ind) => (
                  <TableCell
                    key={ind}
                    align="right"
                    sx={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      color: "darkblue",
                    }}
                  >
                    {val}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((val) => {
                return (
                  <TableRow
                    key={val._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="right">{val.title}</TableCell>
                    <TableCell align="right">{val.amount}</TableCell>
                    <TableCell align="right">{val.type}</TableCell>
                    <TableCell align="right">{val.expensefor}</TableCell>
                    <TableCell align="right">{val.category}</TableCell>
                    <TableCell align="right">{val.createdAt}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
