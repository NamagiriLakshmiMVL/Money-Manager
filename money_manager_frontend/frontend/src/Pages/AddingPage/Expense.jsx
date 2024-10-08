import { Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import { toast } from "react-toastify";
import { API } from "../../API";

export function Expense({ setSample, edit, setEdit }) {
  const [test, setTest] = useState(false);
  const [type, setType] = useState("Income");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  useEffect(() => {
    setTitle(edit.title);
    setAmount(edit.amount);
    setCategory(edit.category);
    setTest(!test);
  }, [edit]);
  const handleChange = (event) => {
    setType(event.target.value);
  };
  const [expenditure, setExpenditure] = React.useState("Personal");
  const handleChange2 = (event) => {
    setExpenditure(event.target.value);
  };
  const token = localStorage.getItem("x-auth-token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const title = data.get("title");
    const amount = data.get("amount");
    const category = data.get("category");
    const email = localStorage.getItem("email");
    const newExpense = {
      title,
      amount,
      type,
      expensefor: expenditure,
      category,
      email,
      id: edit._id,
    };

    edit?._id !== undefined &&
      (await axios
        .post(`${API}/expenses/updating-expenses`, newExpense, {
          headers: {
            "x-auth-token": token,
          },
        })
        .then((res) => {
          toast.success(res.data, { position: "top-center", autoClose: 1000 });
        }));
    setEdit({});

    edit?._id === undefined &&
      (await axios
        .post(`${API}/expenses/adding-expenses`, newExpense, {
          headers: {
            "x-auth-token": token,
          },
        })
        .then((res) =>
          toast.success(res.data, {
            position: "top-center",
            autoClose: 1000,
          })
        ));

    await setTitle("");
    await setAmount("");
    await setCategory("");
    await setSample((prev) => !prev);
  };

  return (
    <>
      <Box
        sx={{
          border: "1px solid gray",
          padding: "30px",
          borderRadius: "10px",
          backgroundColor: "lightyellow",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            border: "1px solid black",
            borderRadius: "10px",
            textAlign: "center",
            backgroundColor: "#EEEDEB",
          }}
        >
          Adding Inc/Exp
        </Typography>
        <form onSubmit={(e) => handleSubmit(e)}>
          <Typography sx={{ marginTop: "20px" }}>Title</Typography>
          <TextField
            id="outlined-basic"
            placeholder="Title"
            name="title"
            value={title}
            variant="outlined"
            onChange={(e) => setTitle(e.target.value)}
          />
          <Typography>Amount</Typography>
          <TextField
            id="outlined-basic"
            placeholder="Amount"
            value={amount}
            name="amount"
            variant="outlined"
            onChange={(e) => setAmount(e.target.value)}
          />
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
          <TextField
            id="outlined-basic"
            placeholder="Category"
            value={category}
            name="category"
            variant="outlined"
            onChange={(e) => setCategory(e.target.value)}
          />
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
          <Button
            variant="contained"
            type="submit"
            sx={{ marginTop: "10px", width: "100%", textAlign: "center" }}
          >
            Submit
          </Button>
        </form>
      </Box>
    </>
  );
}
