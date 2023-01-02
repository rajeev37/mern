import React from "react";
import './App.css';
import Header from "./components/organisms/Header";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import NotFound from "./components/pages/NotFound";
import Editor from "./components/pages/Editor";
import Admin from "./components/pages/Admin";
import Layout from "./components/organisms/Layout";

import { Routes, Route } from "react-router-dom";
import Signup from "./components/pages/Signup/Signup";
import Login from "./components/pages/Login/Login";
import Welcome from "./components/pages/Welcome/Welcome";
import { useSelector } from "react-redux";
const ROLES = {
  'User': 2001,
  'Editor': 1984,
  'Admin': 5150
}
function App () {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  console.log(isLoggedIn);
    return (
      <Routes>
        <Route path="/" element={<Layout/>} >
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      // <div>
      //   <Header/>
      //   <Routes>
      //       <Route exact path="/" element={<Home />} />
      //       <Route path="/about" element={<About />} />
      //       <Route exact path="/signup" element={<Signup />} />
      //       <Route path="/login" element={<Login />} />
      //       <Route path="/welcome" element={<Welcome />} />
      //       <Route path="*" element={<NotFound />} />

      //       <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
      //         <Route path="editor" element={<Editor />} />
      //       </Route>

      //       <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
      //         <Route path="admin" element={<Admin />} />
      //       </Route>
      //   </Routes> 
      // </div>         
        
    )
}

export default App;
