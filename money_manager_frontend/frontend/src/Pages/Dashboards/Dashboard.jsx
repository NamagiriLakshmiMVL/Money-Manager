import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { API } from "../../API";
import Barcharts from "./Barcharts";
import PieCharts from "./PieCharts";

export function MainPage() {
  const token = localStorage.getItem("x-auth-token");
  const [balance, setBalance] = useState();
  const [store, setStore] = useState([]);
  const [exp, setExp] = useState();
  const [inc, setInc] = useState();
  const email = localStorage.getItem("email");
  const result = { email };
  useEffect(() => {
    async function fetchData() {
      await axios
        .post(`${API}/expenses/getting-expenses`, result, {
          headers: {
            "x-auth-token": token,
          },
        })
        .then((res) => setStore(res.data));
    }
    fetchData();
  }, []);

  let a = store.reduce((accum, val) => {
    return val.type === "Expenditure"
      ? Number(accum) + Number(val.amount)
      : Number(accum);
  }, []);

  let b = store.reduce((accum, val) => {
    return val.type === "Income"
      ? Number(accum) + Number(val.amount)
      : Number(accum);
  }, []);
  useEffect(() => {
    setExp(a);
    setInc(b);
    setBalance(b - a);
  }, [b, a]);

  let arr = [
    { title: "Your Balance", value: balance },
    { title: "Your Income", value: inc },
    { title: "Your Expense", value: exp },
  ];
  return (
    <Box>
      <Box
        sx={{
          marginTop: "100px",
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        {arr.map((val, ind) => (
          <Box
            sx={{
              display: "flex",
              width: "200px",
              border: "1px solid black",
              height: "130px",
              borderRadius: "20px",
              backgroundColor: "#EEEDEB",
            }}
          >
            <Box sx={{ margin: "24px 24px", textAlign: "center" }}>
              <Typography variant="h5">{val.title}</Typography>
              <Typography variant="h4" sx={{ marginTop: "10px" }}>
                <CurrencyRupeeIcon />
                {val.value}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <Barcharts />
        <PieCharts balance={balance} inc={inc} exp={exp} />
      </Box>
    </Box>
  );
}
