// Colores basados en la paleta "Creative Studio"
let colores = ["#6366F1", "#EC4899", "#818CF8", "#F472B6", "#F8FAFC"];
let circulos;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  
  // Solución al problema de desfase en móviles
  canvas.position(0, 0); 
  canvas.style('top', '0');
  canvas.style('left', '0');
  canvas.style('z-index', '-1');
  canvas.style('position', 'fixed');

  circulos = [];
  for (let i = 0; i < 40; i++) {
    circulos.push(new Circulo());
  }
  
  frameRate(60); 
}

function draw() {
  // Fondo sólido Azabache Profundo para proteger la legibilidad siempre
  background('#0F172A'); 
  circulos.forEach(operarCirculos);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function operarCirculos(circulo) {
  circulo.dibujar();
  circulo.mover();
}

class Circulo {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.vx = random(-1.5, 1.5); 
    this.vy = random(-1.5, 1.5);
    this.c = random(colores);
    this.s = random(15, 35);
    this.t = random(0, TWO_PI);
    
    if (this.vx === 0) this.vx = 1;
    if (this.vy === 0) this.vy = 1;
  }
  
  dibujar() {
    noStroke();
    fill(this.c);
    drawingContext.shadowBlur = 30;
    drawingContext.shadowColor = this.c;
    // Efecto de pulso suave
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
