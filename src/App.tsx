import React from 'react';
import './App.css';
import './assets/style/reset.css';
import CharacterSelect from './components/CharacterSelect';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <CharacterSelect />
      </header>
    </div>
  );
}

export default App;
