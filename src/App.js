import React from 'react';
import WebCam from './components/WebCam';
import IsolationDetails from './components/IsolationDetails';
import './App.scss';

function App() {
  return (
    <main>
      <WebCam />
      <IsolationDetails />
    </main>
  );
}

export default App;
