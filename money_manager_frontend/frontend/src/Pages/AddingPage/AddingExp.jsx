import React, { useState } from "react";
import { Expense } from "./Expense";
import { UserInfo } from "./UserInfo";
import { Box } from "@mui/material";

export function AddingExp(props) {
  const [sample, setSample] = useState(false);
  const [edit, setEdit] = useState({});
  return (
    <div>
      <Box
        sx={{
          marginTop: "100px",
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <Expense setSample={setSample} edit={edit} setEdit={setEdit} />
        <UserInfo sample={sample} setEdit={setEdit} />
      </Box>
    </div>
  );
}
