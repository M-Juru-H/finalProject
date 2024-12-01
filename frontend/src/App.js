import React from "react";
import { BrowserRouter as Router, Routes, Route  } from "react-router-dom";
import Index from './Pages/Index';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Home from './Pages/Home';
import CustomerList from "./Pages/AppointmentsDisplay";
import Appointments from "./Pages/Appointments";

function App(){

  return(
    
    <Router>
      <Routes>

        <Route path = "/" element={<Index />}/>
        <Route path = "/login" element={<Login />}/>
        <Route path = "/signup" element={<Signup />}/>
        <Route path = "/home" element={<Home />}/>
        <Route path = "/appointments" element={<CustomerList />}/>
        <Route path = "/create-appointments" element={<Appointments />}/>

      </Routes>
    </Router>
  );

}

export default App;