// import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import init from "./init";

const render = async () => {
  const root = ReactDOM.createRoot(
    document.getElementById("chat")
  );
  root.render(await init());
};

render();
