let colores = ["red", "rgb(100,227,100)", "yellow", "rgb(229,94,229)", "rgb(255,209,0)", "blue"];
let circulos;

function setup() {
  // Ajustar al tamaño completo de la ventana
  let canvas = createCanvas(windowWidth, windowHeight);
  
  // Posicionar el canvas al fondo y fijo
  canvas.position(0, 0);
  canvas.style('z-index', '-1');
  canvas.style('position', 'fixed');

  circulos = [];
  for (let i = 0; i < 42; i++) {
    let c = new Circulo();
    circulos.push(c);
  }
  
  // 60 es el estándar web para fluidez sin saturar el procesador
  frameRate(60); 
}

function draw() {
  // Fondo oscuro para que resalte el neón (puedes ajustarlo al color de tu web)
  background(10, 10, 12); 
  circulos.forEach(operarCirculos);
}

// Hace que el fondo se ajuste si el usuario cambia el tamaño de la ventana
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
    // Reduje un poco la velocidad (-2 a 2) para que sea un fondo sutil y no maree
    this.vx = random(-2, 2); 
    this.vy = random(-2, 2);
    this.c = random(colores);
    this.s = 25;
    this.t = random(0, 1);
    
    if (this.vx == 0) this.vx = 1;
    if (this.vy == 0) this.vy = 1;
  }
  
  dibujar() {
    noStroke();
    fill(this.c);
    drawingContext.shadowBlur = 43;
    drawingContext.shadowColor = this.c;
    // Pulso del tamaño con el seno
    circle(this.x, this.y, this.s * Math.abs(sin(this.t * 1.1))); 
    this.t += 0.05;
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
