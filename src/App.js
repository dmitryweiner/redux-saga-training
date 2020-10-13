import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import ListView from "./features/list/ListView";

function App() {
  return (
    <div className="App">
      <header className="App-header">
{/*
        <Counter />
*/}
        <ListView />
      </header>
    </div>
  );
}

export default App;
