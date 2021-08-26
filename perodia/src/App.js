import './styles/app.scss';
import './styles/typography.scss';
import Layers from './components/Layers';
import Viewport from "./components/Viewport";
import React, { useState } from 'react';

function App() {

  const [roomWidth, setRoomWidth] = useState(0);
  const [roomHeight, setRoomHeight] = useState(0);

  return (
    <section id="app">
        <Layers { ...{ setRoomWidth, setRoomHeight, roomWidth, roomHeight} }/>
        <Viewport/>
    </section>
  );
}

export default App;
