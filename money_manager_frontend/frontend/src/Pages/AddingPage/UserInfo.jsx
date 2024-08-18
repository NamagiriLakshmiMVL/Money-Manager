import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Table, TableCell, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { toast } from "react-toastify";
import { API } from "../../API";

export function UserInfo({ sample, setEdit }) {
  const [rows, setRows] = useState([]);
  const [removedata, setRemovedata] = useState(false);
  const token = localStorage.getItem("x-auth-token");

  const email = localStorage.getItem("email");
  const result = { email };
  useEffect(() => {
    axios
      .post(`${API}/expenses/getting-expenses`, result, {
        headers: {
          "x-auth-token": token,
        },
      })
      .then((res) => setRows(res.data));
  }, [removedata, sample]);

  const handleDelete = async (id) => {
    const res = { id };
    await axios
      .post(`${API}/expenses/deleting-expenses`, res, {
        headers: {
          "x-auth-token": token,
        },
      })
      .then((res) =>
        toast.success(res.data, {
          position: "top-center",
          autoClose: 1000,
        })
      );
    setRemovedata((prev) => !prev);
  };
  const handleEdit = (val) => {
    setEdit(val);
  };
  let arr = [
    "Title",
    "Amount",
    "Type",
    "For",
    "Category",
    "Created At",
    "Action",
  ];
  return (
    <div>
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          marginBottom: "30px",
          fontFamily: "monospace",
          color: "brown",
          fontWeight: "bold",
        }}
      >
        User Information
      </Typography>
      <TableContainer component={Paper}>
        <Table
          sx={{
            minWidth: 650,
            border: "1px solid black",
            backgroundColor: "lightcyan",
          }}
          aria-label="simple table"
        >
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
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell align="right">{val.title}</TableCell>
                  <TableCell align="right">{val.amount}</TableCell>
                  <TableCell align="right">{val.type}</TableCell>
                  <TableCell align="right">{val.expensefor}</TableCell>
                  <TableCell align="right">{val.category}</TableCell>
                  <TableCell align="right">{val.createdAt}</TableCell>
                  <TableCell align="right">
                    <Button onClick={() => handleEdit(val)}>
                      <EditIcon />
                    </Button>
                    <Button onClick={() => handleDelete(val._id)}>
                      <DeleteIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
