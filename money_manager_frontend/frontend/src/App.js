import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Signup } from './Pages/Signup';
import { Login } from './Pages/Login';
import { Expense } from './Pages/Expense';
import { UserInfo } from './Pages/UserInfo';
import { Home } from './Pages/Home';
import { AddingExp } from './Pages/AddingExp';
import TopAppBar from './Pages/TopAppbar';
import { MainPage } from './Pages/Dashboard';
import { Income } from './Pages/Income';
import { Expenditure } from './Pages/Expenditure';

function App() {
  return (
    <div>
      <BrowserRouter>
        {/* <TopAppBar /> */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/main' element={<AddingExp />} />
          <Route path='/dashboard' element={<MainPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/inc' element={<Income />} />
          <Route path='/exp' element={<Expenditure />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
