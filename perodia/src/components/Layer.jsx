import '../styles/layers.scss'; 
import React, { useState } from 'react';
import { LAYERPROPS } from '../utilities/Enums.js';
import iconDelete from '../assets/images/icon-delete.svg';
import iconLayers from '../assets/images/icon-layers.svg';
import iconVisible from '../assets/images/icon-visible.svg';
import iconObjectShape from '../assets/images/icon-object-shape.svg';

const Layers = ({layer, index, layerData, setLayerData, ...rest}) => {

    const [layerExpanded, setLayerExpanded] = useState(false);

    /* Updates layer properties */
    const updateLayerProperty = (index, property, value) => {
        setLayerData(
            layerData.map((item, i) => {
                return i === index ? {...item, [property] : value} : item 
            })
        )
    }
    
    /* Delete layers */
    const deleteLayer = (index) => {
        setLayerData(layerData.filter((item, i) => i !== index));
    }

    /* Toggle expanded object layers */
    const toggleObjectLayers = () => {
        setLayerExpanded(!layerExpanded);
    }

    /* Return elements */
    return (
        <>
            <div className={(layerExpanded ? 'expanded' : '') + ' layer'}>
                <img src={iconLayers} onClick={toggleObjectLayers} className="toggle-objects" width="20" height="20" alt="Layer icon"/>
                <input value={layer.name} onChange={(e) => { updateLayerProperty(index, LAYERPROPS.NAME, e.target.value) }}></input>
                
                <button className="layer-toggle" data-visible={layer.visible} onClick={(e) => { updateLayerProperty(index, LAYERPROPS.VISIBLE, !layer.visible) }}>
                    <img src={iconVisible} width="21" height="16" alt="Toggle layer visibility"/>
                </button>
                
                <button className="layer-delete" onClick={(e) => { deleteLayer(index) }}>
                    <img src={iconDelete} width="16" height="16" alt="Delete layer"/>
                </button>
            </div>
            { layer.objects.length > 0 && (
                <div className="object-layers" data-visible={layer.visible}>
                    {layer.objects.map((object, i) => {
                        return (
                            <div key={i} className="object-layer">
                                <img src={iconObjectShape} width="16" height="16" alt="Object shape"/>
                                <p>{object.name}</p>
                            </div>
                        )
                    })}
                </div>
            )}
            
        </>
    )
}

export default Layers;