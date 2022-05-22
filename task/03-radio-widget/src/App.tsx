import React from 'react';
import Widget from './components/Widget';
import AppStyle from './App.module.css'

function App() {
  return (
    <div className={AppStyle.App}>
      <Widget/>
    </div>
  );
}

export default App;
