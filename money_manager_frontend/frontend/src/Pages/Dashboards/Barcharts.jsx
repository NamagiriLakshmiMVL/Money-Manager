import { Box } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import React from "react";

const Barcharts = () => {
  return (
    <Box
      sx={{
        border: "1px solid darkblue",
        borderRadius: "10px",
        width: "fit-content",
        margin: "48px 50px",
        padding: "10px",
      }}
    >
      <BarChart
        xAxis={[
          {
            scaleType: "band",
            data: ["Week-1", "Week-2", "Week-3", "Week-4", "Week-5"],
          },
        ]}
        series={[
          { data: [4, 9, 10, 8, 9], label: "Income" },
          { data: [2, 6, 3, 6, 4], label: "Expense" },
        ]}
        width={600}
        height={350}
      />
    </Box>
  );
};

export default Barcharts;
