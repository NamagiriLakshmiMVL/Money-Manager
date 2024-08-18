import React from "react";
import { Tab, Tabs } from "@mui/material";
import { Box } from "@mui/material";
import { Login } from "./Login";
import { Signup } from "./Signup";

const UserLogin = () => {
  const [value, setValue] = React.useState("login");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <Box
        sx={{
          marginTop: "100px",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="primary"
          indicatorColor="primary"
          aria-label="secondary tabs example"
        >
          <Tab
            sx={{ fontSize: "16px", fontWeight: "bold" }}
            value="login"
            label="Login"
          />
          <Tab
            sx={{ fontSize: "16px", fontWeight: "bold" }}
            value="signup"
            label="Sign-Up"
          />
        </Tabs>
        {value === "login" && <Login />}
        {value === "signup" && <Signup />}
      </Box>
    </div>
  );
};

export default UserLogin;
