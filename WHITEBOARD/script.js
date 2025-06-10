const canvas      = document.getElementById('board');
const ctx         = canvas.getContext('2d');
const clearBtn    = document.getElementById('clearBtn');
const modeBtn     = document.getElementById('modeBtn');
const colorPicker = document.getElementById('colorPicker');
const widthPicker = document.getElementById('widthPicker');
const saveBtn     = document.getElementById('saveBtn');

let drawing   = false;
let lastX     = 0, lastY = 0;
let mode      = 'draw';

function resize() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight - document.querySelector('.toolbar').offsetHeight;
}
window.addEventListener('resize', resize);
resize();

modeBtn.addEventListener('click', () => {
  mode = (mode === 'draw') ? 'erase' : 'draw';
  modeBtn.textContent = (mode === 'draw') ? 'Erase' : 'Draw';
  modeBtn.classList.toggle('active', mode === 'erase');
});

clearBtn.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

saveBtn.addEventListener('click', () => {
  const link    = document.createElement('a');
  link.href     = canvas.toDataURL('image/png');
  link.download = 'whiteboard.png';
  link.click();
});

function drawLine(x0, y0, x1, y1, color, width) {
  if (mode === 'erase') {
    ctx.globalCompositeOperation = 'destination-out';
    ctx.strokeStyle = 'rgba(0,0,0,1)';
    ctx.lineWidth   = width;
  } else {
    ctx.globalCompositeOperation = 'source-over';
    ctx.strokeStyle = color;
    ctx.lineWidth   = width;
  }
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(x0, y0);
  ctx.lineTo(x1, y1);
  ctx.stroke();
  ctx.globalCompositeOperation = 'source-over';
}

canvas.addEventListener('mousedown', e => {
  drawing = true;
  lastX = e.offsetX; lastY = e.offsetY;
});
canvas.addEventListener('mouseup',   () => drawing = false);
canvas.addEventListener('mouseout',  () => drawing = false);
canvas.addEventListener('mousemove', e => {
  if (!drawing) return;
  const x     = e.offsetX, y = e.offsetY;
  const color = colorPicker.value;
  const width = parseInt(widthPicker.value, 10);

  drawLine(lastX, lastY, x, y, color, width);
  lastX = x; lastY = y;
});

function getTouchPos(e) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: e.touches[0].clientX - rect.left,
    y: e.touches[0].clientY - rect.top
  };
}

canvas.addEventListener('touchstart', e => {
  e.preventDefault();
  drawing = true;
  const pos = getTouchPos(e);
  lastX = pos.x; lastY = pos.y;
});
canvas.addEventListener('touchmove', e => {
  e.preventDefault();
  if (!drawing) return;
  const pos   = getTouchPos(e);
  const color = colorPicker.value;
  const width = parseInt(widthPicker.value, 10);

  drawLine(lastX, lastY, pos.x, pos.y, color, width);
  lastX = pos.x; lastY = pos.y;
});
canvas.addEventListener('touchend',   () => drawing = false);
canvas.addEventListener('touchcancel',() => drawing = false);
