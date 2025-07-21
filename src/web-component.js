import React from "react";
import ReactDOM from "react-dom/client";
import reactToWebComponent from "react-to-webcomponent";
import AppC from "./AppC.jsx";

// Convert App into a Web Component
const WebCalculator = reactToWebComponent(AppC, React, ReactDOM);

// Register it as <web-calculator>
customElements.define("web-calculator", WebCalculator);
