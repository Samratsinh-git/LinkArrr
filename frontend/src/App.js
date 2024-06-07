// import logo from "./logo.svg";
import React, { useMemo, useState } from "react";
import "./App.css";
import {
  Switch,
  Route,
  Link,
  Router,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import SignUp from "./Auth/Signup";
import Login from "./Auth/Login";
import LoginSignUp from "./Auth/LoginSignUp";
import Home from "./MainPages/Home";
import SocialMediaForm from "./MainPages/AddSocials";
import UserPage from "./MainPages/UserProfile";
import { HomeContext } from "./Context/context";
import NotFound from "./MainPages/NotFound";
// import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [link, setLink] = useState(null);
  const value = useMemo(() => ({ link, setLink }), [link, setLink]);

  return (
    <div className="App">
      {/* <LoginSignUp/>  */}
      {/* <Router> */}
      <HomeContext.Provider value={value}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginSignUp />} />
            <Route path="/users/add" element={<SignUp />} />
            <Route path="/home" element={<Home />} />
            <Route path="/socials/add" element={<SocialMediaForm />} />
            <Route path="/users/profile" element={<UserPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </HomeContext.Provider>
      {/* </Router> */}
    </div>
  );
}

export default App;
