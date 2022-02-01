const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;
let particleArray;

// Create constructor function
function Particle(x, y, directionX, directionY, size, color){
    this.x = x;
    this.y = y;
    this.directionX= directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
}
// Add draw method to particle prototype
Particle.prototype.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
}
// Add update method to particle prototype
Particle.prototype.update = function() {
    if (this.x + this.size > canvas.width +10 || this.x - this.size < -10) {
        this.directionX = -this.directionX;
    }
    if (this.y + this.size > canvas.height + 10 || this.y - this.size < -10) {
        this.directionY = -this.directionY;
    }
    this.x += this.directionX;
    this.y += this.directionY;

    this.draw();
}
// Create particle arrary
function init() {
    particleArray = [];
    for (let i=0; i<100; i++) {
        let size = Math.random() * 3;
        let x = Math.random() * (innerWidth - size * 1.5);
        let y = Math.random() * (innerHeight - size * 1.5);
        let directionX = (Math.random() * 0.4) - 0.2;
        let directionY = (Math.random() * 0.4) - 0.2;
        let color = 'white';

        particleArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}
// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i=0; i<particleArray.length; i++) {
        particleArray[i].update();
    }
}
init();
animate();

// Makes sure particles don't freak out when window is resized
window.addEventListener('resize', 
function() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    //init();
})