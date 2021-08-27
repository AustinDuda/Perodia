import React from 'react';
import Layer from './Layer';
import '../styles/layers.scss'; 
import { AXIS } from '../utilities/Enums.js';
import iconAlign from '../assets/images/icon-align.svg';
import iconCreate from '../assets/images/icon-create.svg';

const Layers = ({setRoomWidth, setRoomHeight, roomWidth, roomHeight, layerData, setLayerData, canvasOffset, setCanvasOffset, ...rest}) => {

    /* Handles room size updates and input validation */
    const updateRoomSize = (value, axis) => {
        value = +value.replace(/\D/g, "");
        value = value !== '' || !isNaN(value) ? value : 0;
        if (value > 5000) { return false; }

        axis ? setRoomHeight(value) : setRoomWidth(value);
    }
    
    /* Creates new layers */
    const createNewLayer = () => {
        setLayerData(oldLayerData => [...oldLayerData, {
            name: 'Layer ' + (oldLayerData.length + 1),
            visible: true,
            objects: [{}]
        }]);
    }

    const realignCanvas = () => {
        setCanvasOffset({x: 0, y: 0})
    }

    /* Return elements */
    return (
        <div>
            <div className='panel-layers'>
                <p className='panel-title'>Layers</p>
                <div className='layers'>
                    {layerData.map((layer, index) => {
                        return (
                            <Layer key={index} { ...{ layer, index, layerData, setLayerData}}/>
                        )
                    })}
                </div>
                <div className='panel-controls'>
                    <button onClick={createNewLayer}><img src={iconCreate} width="20" height="20" alt="Create new layer"/></button>
                    <button onClick={realignCanvas}><img src={iconAlign} width="20" height="20" alt="Center canvas offset"/></button>
                </div>
            </div>
            <div >
                <p className='panel-title'>Room Settings</p>
                <div className='panel-inputs'>
                    <label>
                        <span>Width:</span>
                        <input type="text" value={roomWidth} onChange={(e) => { updateRoomSize(e.target.value, AXIS.WIDTH) }}/>
                    </label>
                    <label>
                        <span>Height:</span>
                        <input type="text" value={roomHeight} onChange={(e) => { updateRoomSize(e.target.value, AXIS.HEIGHT) }}/>
                    </label>
                </div>
                
            </div>
        </div>
    )
}

export default Layers;