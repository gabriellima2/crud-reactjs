import Wrapper from './components/wrapper/Wrapper';

import './App.css';
import { useState, useEffect } from 'react';

function darkThemeDataInLocalStorage() {
  const darkThemeData = localStorage.getItem('darkTheme');

  if ( !darkThemeData ) {
    localStorage.setItem('darkTheme', JSON.stringify({active: false}));
    return;
  };

  const { active } = JSON.parse(darkThemeData);
  return active;
};

function App() {
  const [ darkTheme, setDarkTheme ] = useState(darkThemeDataInLocalStorage);
  
  useEffect(() => {
    localStorage.setItem('darkTheme', JSON.stringify({active: darkTheme}))
  }, [ darkTheme ]);

  const handleTheme = () => {
    setDarkTheme(!darkTheme);
  }

  return (
    <div id='container' className={`dark-${darkTheme}`}>
      <header id='header'>
        <a href='#' id='logo'>GABRIEL</a>
        <button id='theme-toggle' onClick={ handleTheme }>☀</button>
      </header>
      <Wrapper />

      <footer id='footer'>
        <p>Gabriel 2022</p>
        <a href='' id='link'>LINK A</a>
      </footer>
    </div>
  );
}

export default App
