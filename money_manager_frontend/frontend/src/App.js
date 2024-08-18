import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Signup } from "./Pages/Components/authentication/Signup";
import { Login } from "./Pages/Components/authentication/Login";
import { Expense } from "./Pages/AddingPage/Expense";
import { UserInfo } from "./Pages/AddingPage/UserInfo";
import { AddingExp } from "./Pages/AddingPage/AddingExp";
import TopAppBar from "./Pages/TopAppbar";
import { MainPage } from "./Pages/Dashboards/Dashboard";
import { Income } from "./Pages/Income";
import { Expenditure } from "./Pages/Expenditure";
import UserLogin from "./Pages/Components/authentication/UserLogin";

function App() {
  return (
    <div>
      <BrowserRouter>
        <TopAppBar />
        <Routes>
          <Route path="/" element={<UserLogin />} />
          <Route path="/main" element={<AddingExp />} />
          <Route path="/dashboard" element={<MainPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/inc" element={<Income />} />
          <Route path="/exp" element={<Expenditure />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
