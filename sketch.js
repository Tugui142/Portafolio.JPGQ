let colores = ["#6366F1", "#EC4899", "#818CF8", "#F472B6", "#F8FAFC"];
let circulos;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  
  // FIX DEFINITIVO: Saca el canvas del <main> y lo ancla al body absoluto
  document.body.appendChild(canvas.elt);

  canvas.elt.style.position = 'fixed';
  canvas.elt.style.top = '0';
  canvas.elt.style.left = '0';
  canvas.elt.style.width = '100vw';
  canvas.elt.style.height = '100vh';
  canvas.elt.style.zIndex = '-1'; 
  canvas.elt.style.pointerEvents = 'none';

  circulos = [];
  for (let i = 0; i < 40; i++) {
    circulos.push(new Circulo());
  }
  
  frameRate(60); 
}

function draw() {
  // El fondo se pinta transparente para heredar el de CSS, o puedes dejar el oscuro
  background('#0F172A'); 
  circulos.forEach(c => {
    c.dibujar();
    c.mover();
  });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

class Circulo {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.vx = random(-1.5, 1.5) || 1; 
    this.vy = random(-1.5, 1.5) || 1;
    this.c = random(colores);
    this.s = random(15, 35);
    this.t = random(0, TWO_PI);
  }
  
  dibujar() {
    noStroke();
    fill(this.c);
    drawingContext.shadowBlur = 30;
    drawingContext.shadowColor = this.c;
    circle(this.x, this.y, this.s * Math.abs(sin(this.t))); 
    this.t += 0.03;
  }
  
  mover() {
    this.x += this.vx;
    this.y += this.vy;
    
    if (this.x > width) this.x = 0;
    if (this.x < 0) this.x = width;
    if (this.y > height) this.y = 0;
    if (this.y < 0) this.y = height;
  }
}
