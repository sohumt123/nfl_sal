import React from 'react';
import { GlobalStyles } from './styles/GlobalStyles';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';

function App() {
  return (
    <div className="App">
      <GlobalStyles />
      <Header />
      <Dashboard />
    </div>
  );
}

export default App;
