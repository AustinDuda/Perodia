import React from 'react';
import '../styles/layers.scss'; 
import { AXIS } from '../utilities/Enums.js';

const Layers = ({setRoomWidth, setRoomHeight, roomWidth, roomHeight, ...rest}) => {

    const updateRoomSize = (value, axis) => {
        value = +value.replace(/\D/g, "");
        value = value !== '' || !isNaN(value) ? value : 0;
        if (value > 5000) { return false; }

        axis ? setRoomHeight(value) : setRoomWidth(value);
    }

    return (
        <div>
            <div >
                <p className='panel'>Layers</p>
                <button>+</button>
            </div>
            <div >
                <p className='panel'>Room Settings</p>
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