import React, { useEffect, useState, useRef } from 'react';
import { drawRectangle, drawText  } from '../utilities/Helpers.js'

const Viewport = () => {

    const canvasRef = useRef();
    const [clicked, setClicked] = useState(false);
    const [canvasOffset, setCanvasOffset] = useState({ x: 0, y: 0 });
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        
        renderToCanvas(ctx);  

        const mouseListener = (e) => mouseClickListener(e);
        canvas.addEventListener('mouseup', mouseListener);
        canvas.addEventListener('mousedown', mouseListener);
        canvas.addEventListener('mouseleave', mouseListener);
        canvas.addEventListener('mousemove', calcMousePosition);
        
        
        return () => {
            canvas.removeEventListener('mouseup', mouseListener);
            canvas.removeEventListener('mousedown', mouseListener);
            canvas.removeEventListener('mouseleave', mouseListener);
            canvas.removeEventListener('mousemove', calcMousePosition);
            
        };
    }, [mousePosition, clicked, canvasOffset]);

    const mouseClickListener = (e) => {
        e.type === 'mouseup' || e.type === 'mouseleave' ? setClicked(false) : setClicked(true);
    }
    
    const renderToCanvas = (ctx) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        drawRectangle(ctx, 0, 0, ctx.canvas.width, ctx.canvas.height, 'black', false);
        drawRectangle(ctx, 60 - canvasOffset.x, 60 - canvasOffset.y, (ctx.canvas.width*2) - canvasOffset.x, (ctx.canvas.height*2) - canvasOffset.y, 'red', false);
        drawRectangle(ctx, 120 - canvasOffset.x, 120 - canvasOffset.y, 40, 40, 'blue', false);
        drawText(ctx, 10, 20, mousePosition.x + ', ' + mousePosition.y, 'white', 10);
    }

    const calcMousePosition = (e) => {
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