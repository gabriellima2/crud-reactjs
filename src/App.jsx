import { useState, useEffect } from "react";

import Wrapper from "./components/wrapper/Wrapper";
import DataContextProvider from "./utils/context/DataContext/Provider";
import dataInLocalStorage from "./utils/LocalStorage";

import "./App.css";


const DARK_THEME = dataInLocalStorage("darkTheme");

export default function App() {
  const [ dark, setDark ] = useState(DARK_THEME || {active: false});
  
  useEffect(() => {
    localStorage.setItem("darkTheme", JSON.stringify(dark))
  }, [ dark ]);

  const handleTheme = () => {
    setDark({active: !dark.active});
  };

  return (
    <DataContextProvider>
      <div id="container" className={`dark-${dark.active}`}>
        <header id="header">
          <a href="#" id="logo">GABRIEL</a>
          <button id="theme-toggle" onClick={ handleTheme }>☀</button>
        </header>
        <Wrapper />
        <footer id="footer">
          <p>Gabriel 2022</p>
          <a href="" id="link">LINK A</a>
        </footer>
      </div>
    </DataContextProvider>

  );
};
