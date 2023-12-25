import { Provider } from "react-redux";
import React from "react";
import store from "./exam13/13_02";
import { App } from "./App";
import ReactDOM from "react-dom";

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);