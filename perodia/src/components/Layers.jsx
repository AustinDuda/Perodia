import React from 'react';
import '../styles/layers.scss'; 
import { AXIS, LAYERPROPS } from '../utilities/Enums.js';

import iconAlign from '../assets/images/icon-align.svg';
import iconCreate from '../assets/images/icon-create.svg';
import iconDelete from '../assets/images/icon-delete.svg';
import iconLayers from '../assets/images/icon-layers.svg';
import iconVisible from '../assets/images/icon-visible.svg';

const Layers = ({setRoomWidth, setRoomHeight, roomWidth, roomHeight, layerData, setLayerData, canvasOffset, setCanvasOffset, ...rest}) => {

    /* Handles room size updates and input validation */
    const updateRoomSize = (value, axis) => {
        value = +value.replace(/\D/g, "");
        value = value !== '' || !isNaN(value) ? value : 0;
        if (value > 5000) { return false; }

        axis ? setRoomHeight(value) : setRoomWidth(value);
    }

    /* Updates layer properties */
    const updateLayerProperty = (index, property, value) => {
        setLayerData(
            layerData.map((item, i) => {
                return i === index ? {...item, [property] : value} : item 
            })
        )
    }
    
    /* Creates new layers */
    const createNewLayer = () => {
        setLayerData(oldLayerData => [...oldLayerData, {
            name: 'Layer ' + (oldLayerData.length + 1),
            visible: true,
            objects: [{}]
        }]);
    }

    /* Delete layers */
    const deleteLayer = (index) => {
        setLayerData(layerData.filter((item, i) => i !== index));
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
                            <div key={index} className='layer'>
                                <img src={iconLayers} width="20" height="20" alt="Layer icon"/>
                                <input value={layer.name} onChange={(e) => { updateLayerProperty(index, LAYERPROPS.NAME, e.target.value) }}></input>
                                
                                <button className="layer-toggle" data-visible={layer.visible} onClick={(e) => { updateLayerProperty(index, LAYERPROPS.VISIBLE, !layer.visible) }}>
                                    <img src={iconVisible} width="21" height="16" alt="Toggle layer visibility"/>
                                </button>
                                
                                <button className="layer-delete" onClick={(e) => { deleteLayer(index) }}>
                                    <img src={iconDelete} width="16" height="16" alt="Delete layer"/>
                                </button>
                            </div>
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