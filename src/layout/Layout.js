import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Menu from "./Menu";
import { Route, Switch } from "react-router-dom";
import Home from "../home/Home";
import ObservationCreate from "../observations/ObservationCreate"
import ObservationEdit from "../observations/ObservationEdit";

function Layout() {
  return (
    <>
    <div className="container-fluid px-0">
      <Header />
      <Menu />
    </div>
      <div className="container">
        <Switch>
          <Route path="/observations/new">
            <ObservationCreate />
          </Route>
          <Route path="/observations/edit/:id">
            <ObservationEdit />
          </Route>
          <Route exact={true} path="/">
            <Home />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
