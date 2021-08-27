import './styles/app.scss';
import './styles/typography.scss';
import React, { useState } from 'react';
import Layers from './components/Layers';
import Viewport from "./components/Viewport";


function App() {

  const [roomWidth, setRoomWidth] = useState(0);
  const [roomHeight, setRoomHeight] = useState(0);
  const [canvasOffset, setCanvasOffset] = useState({ x: 0, y: 0 });
  const [layerData, setLayerData] = useState([
    {
        name: 'Layer 1',
        visible: true,
        objects: [
            {
                type: 'rect',
                x: 20,
                y: 20,
                width: 200,
                height: 200,
                fill: 'blue'
            }
        ]
    },
    {
      name: 'Layer 2',
      visible: true,
      objects: [
        {
            type: 'rect',
            x: 50,
            y: 50,
            width: 50,
            height: 50,
            fill: 'red'
        }
      ]
    }
  ])

  return (
    <section id="app">
        <Layers { ...{ setRoomWidth, setRoomHeight, roomWidth, roomHeight, layerData, setLayerData,  setCanvasOffset} }/>
        <Viewport { ...{layerData, canvasOffset, setCanvasOffset}}/>
    </section>
  );
}

export default App;
