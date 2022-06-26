// канвас поле для рисования в заметке
var canvas, ctx, flag = false,
    prevX = 0,
    currX = 0,
    prevY = 0,
    currY = 0,
    dot_flag = false;

export let lineSetting = { color: "black", weight: 2 };

export function initModeDraw() {
    canvas = document.getElementById('note-canvas');
    ctx = canvas.getContext("2d");
    resizeCanvasToDisplaySize(ctx.canvas);

    canvas.addEventListener("mousemove", function (e) {
        findxy('move', e);
    }, false);
    canvas.addEventListener("mousedown", function (e) {
        findxy('down', e)
    }, false);
    canvas.addEventListener("mouseup", function (e) {
        findxy('up', e)
    }, false);
    canvas.addEventListener("mouseout", function (e) {
        findxy('out', e)
    }, false);
}

export function draw() {
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
    ctx.strokeStyle = lineSetting.color;
    ctx.lineWidth = lineSetting.weight;
    ctx.stroke();
    ctx.closePath();
}

export function findxy(res, e) {
    const parentCanvas = canvas.closest('.col');
    if (res == 'down') {
        prevX = currX;
        prevY = currY;
        currX = e.clientX - parentCanvas.offsetLeft - 12;
        currY = e.clientY - parentCanvas.offsetTop;

        flag = true;
        dot_flag = true;
        if (dot_flag) {
            ctx.beginPath();
            ctx.fillStyle = lineSetting.color;
            ctx.fillRect(currX, currY, 2, 2);
            ctx.closePath();
            dot_flag = false;
        }
    }
    if (res == 'up' || res == "out") {
        flag = false;
    }
    if (res == 'move') {
        if (flag) {
            prevX = currX;
            prevY = currY;
            currX = e.clientX - parentCanvas.offsetLeft - 12;
            currY = e.clientY - parentCanvas.offsetTop;
            draw();
        }
    }
}

export function resizeCanvasToDisplaySize(canvas) {
   const width = canvas.clientWidth;
   const height = canvas.clientHeight;

   if (canvas.width !== width || canvas.height !== height) {
     canvas.width = width;
     canvas.height = height;
     return true;
   }

   return false;
}