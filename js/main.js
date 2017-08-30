let canvas = document.querySelector('#canvas'),
    c = canvas.getContext('2d'),
    innerWidth = canvas.width = window.innerWidth,
    innerHeight = canvas.height = window.innerHeight;

let mouse = {
    x: undefined,
    y: undefined
};

let colorsArray = [
    'bisque',
    'cadetblue',
    'darkseagreen',
    'darksalmon',
    'lightgray'
];

let gravity = 0.6,
    friction = 0.85;

// EVENTS

window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener('resize', function() {
    innerWidth = canvas.width = window.innerWidth;
    innerHeight = canvas.height = window.innerHeight;

    init();
});

addEventListener('click', function() {
    init();
});

// UTILITY FUNCTIONS

function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}

function Ball(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dy = dy;
    this.dx = dx;
    this.radius = radius;
    this.color = color;

    this.update = function() {
        if (this.y + this.radius + this.dy > canvas.height || this.y - this.radius < 0) {
            this.dy = -this.dy * friction;
        } else {
            this.dy += gravity;
        }

        if (this.x + this.radius + dx > canvas.width || this.x - this.radius <= 0) {
            this.dx = -this.dx
        }

        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    };

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.stroke();
        c.closePath();
    };
}

// IMPLEMENTATION

let ball;
let ballArray = [];

function init() {
    ballArray = [];
    for (let i = 0; i < 100; i++) {
        let radius = randomIntFromRange(10, 30);
        let x = randomIntFromRange(radius, canvas.width - radius);
        let y = randomIntFromRange(radius, canvas.height - radius);
        let dx = randomIntFromRange(-2, 2);
        let dy = randomIntFromRange(-2, 2);
        let color = randomColor(colorsArray);
        ballArray.push(new Ball(x, y, dx, dy, radius, color));
    }
}

// ANIMATE FUNCTION

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < ballArray.length; i++) {
        ballArray[i].update();
    }
}

init();
animate();
