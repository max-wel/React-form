import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import Form from "./components/Form/Form";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  return (
    <div className="h-100">
      <Switch>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/" component={Form} />
      </Switch>
    </div>
  );
}

export default App;
