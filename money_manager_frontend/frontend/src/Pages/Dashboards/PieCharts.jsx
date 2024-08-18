import { Box, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts";
import React from "react";

const PieCharts = ({ balance, inc, exp }) => {
  return (
    <Box
      sx={{
        border: "1px solid darkblue",
        borderRadius: "10px",
        padding: "20px",
      }}
    >
      <Typography
        variant="h5"
        sx={{ marginBottom: "20px", textAlign: "center" }}
      >
        Current Transaction
      </Typography>
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: balance, label: "Balance" },
              { id: 1, value: inc, label: "Income" },
              { id: 2, value: exp, label: "Expense" },
            ],
          },
        ]}
        width={450}
        height={250}
      />
    </Box>
  );
};

export default PieCharts;
