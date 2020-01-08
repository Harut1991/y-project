import {
    Switch,
    Route
} from "react-router-dom";
import React from 'react';
import { About, Home, Results, Watch } from "./components";

export default class CustomRoute extends React.Component {
    render() {
        return (
            <Switch>
              <Route  name="about" path="/about" component={About} />
              <Route  name="results" path="/results" component={Results} />
              <Route  name="watch" path="/watch" component={Watch} />
              <Route  name="home" path="/" component={Home} />
            </Switch>
        )
    }
}