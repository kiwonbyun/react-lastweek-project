import React, { useEffect } from "react";
import Header from "./Header";
import Home from "./Home";
import { Reset } from "styled-reset";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Signup from "./Signup";
import Login from "./Login";
import Add from "./Add";
import Notice from "./Notice";
import Detail from "./Detail";
import { loginCheckFB } from "./redux/modules/user";
import { apiKey } from "./shared/firebase";

function App() {
  const dispatch = useDispatch();
  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;

  const is_session = sessionStorage.getItem(_session_key) ? true : false;

  useEffect(() => {
    if (is_session) {
      dispatch(loginCheckFB());
    }
  }, []);

  return (
    <div style={{ backgroundColor: "RGB(33, 33, 33)", height: "100vh" }}>
      <Reset />
      <Header />
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/write">
        <Add />
      </Route>
      <Route path="/notice">
        <Notice />
      </Route>
      <Route path="/post/:id">
        <Detail />
      </Route>
    </div>
  );
}

export default App;
