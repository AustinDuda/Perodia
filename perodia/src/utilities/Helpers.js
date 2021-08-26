export const drawCircle = (ctx, x, y, size, color) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, size/2, 0, 2 * Math.PI);
    ctx.fill();
}

export const drawText = (ctx, x, y, text, color, size) => {
    ctx.font = size + 'px';
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);
}

export const drawTextOpts = (ctx, x, y, text, color, size, align, type, scale) => {
    ctx.font = (size/scale ) + 'px ' + type;
    ctx.fillStyle = color;
    ctx.textAlign = align;
    ctx.fillText(text, x, y);
}

export const drawRectangle = (ctx, x, y, width, height, color, outline) => {
    ctx.beginPath();
    if (outline) { 
        ctx.rect(x, y, width, height);
        ctx.stroke(); 
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = color;
        
    } else {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, width, height);
    }
}