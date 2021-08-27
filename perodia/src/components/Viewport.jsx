import React, { useEffect, useState, useRef } from 'react';
import { drawRectangle, drawText  } from '../utilities/Helpers.js'

const Viewport = ({layerData, canvasOffset, setCanvasOffset, ...rest}) => {

    const canvasRef = useRef();
    const [clicked, setClicked] = useState(false);
    
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        
        renderToCanvas(ctx);  

        canvas.addEventListener('mouseup', mouseClickListener);
        canvas.addEventListener('mousedown', mouseClickListener);
        canvas.addEventListener('mouseleave', mouseClickListener);
        canvas.addEventListener('mousemove', mouseMoveListener);
        
        return () => {
            canvas.removeEventListener('mouseup', mouseClickListener);
            canvas.removeEventListener('mousedown', mouseClickListener);
            canvas.removeEventListener('mouseleave', mouseClickListener);
            canvas.removeEventListener('mousemove', mouseMoveListener);
            
        };
    }, [mousePosition, clicked, canvasOffset, layerData]);// eslint-disable-line react-hooks/exhaustive-deps

    const mouseClickListener = (e) => {
        e.type === 'mouseup' || e.type === 'mouseleave' ? setClicked(false) : setClicked(true);
    }
    
    const renderToCanvas = (ctx) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        drawRectangle(ctx, 0, 0, ctx.canvas.width, ctx.canvas.height, 'black', false);
        

        layerData.forEach((layer) => {
            if (!layer.visible || layer.objects.length < 1) { return false };

            layer.objects.forEach((object) => {
                if (!object.visible) { return false };
                drawRectangle(ctx, object.x - canvasOffset.x, object.y - canvasOffset.y, object.width, object.height, object.fill, false)
            });
        });

        drawText(ctx, 10, 20, mousePosition.x + ', ' + mousePosition.y, 'white', 10);
    }

    const mouseMoveListener = (e) => {
        const canvasBounds = canvasRef.current.getBoundingClientRect();
        const newMouseX = Math.round(e.clientX - canvasBounds.left);
        const newMouseY = Math.round(e.clientY - canvasBounds.top);
        
        setMousePosition({ 
            x: newMouseX, 
            y: newMouseY
        });

        if (clicked === true) {
            
            setCanvasOffset({ 
                x: canvasOffset.x + (mousePosition.x - newMouseX),
                y: canvasOffset.y + (mousePosition.y - newMouseY)
            });
        } 
    }

    return (
        <>
            <canvas id="world" ref={canvasRef} width="500" height="500"></canvas>
        </>
    )
}

export default Viewport;