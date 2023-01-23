import React from "react";
import './App.css';
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import NotFound from "./components/pages/NotFound";
import Layout from "./components/organisms/Layout";

import { Routes, Route } from "react-router-dom";
import Signup from "./components/pages/Signup/Signup";
import Login from "./components/pages/Login/Login";
import Welcome from "./components/pages/Welcome/Welcome";
import UsersList from "./components/pages/Users/UsersList";
import EditUser from "./components/pages/Users/EditUser";
import NewUserForm from "./components/pages/Users/NewUserForm";
import PersistLogin from './components/molecules/PersistLogin';
import RequireAuth from './components/molecules/RequireAuth';
import { useSelector } from "react-redux";
const ROLES = {
  'User': 1001,
  'Editor': 2001,
  'Admin': 3001
}
function App () {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  console.log(isLoggedIn);
    return (
      <Routes>
        <Route path="/" element={<Layout/>} >
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
          <Route element={<PersistLogin/>}>
            <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]}/>}>
              <Route path="/welcome" element={<Welcome />} />
            </Route>
            <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                  <Route path="users">
                    <Route index element={<UsersList />} />
                    <Route path=":id" element={<EditUser />} />
                    <Route path="new" element={<NewUserForm />} />
                  </Route>
                </Route>
          </Route>
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
