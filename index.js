let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

class Circle {
    constructor(x, y, fill='#fff') {
        this.x = x;
        this.y = y;
        this.fill = fill;
    }

    draw() {
        ctx.fillStyle = this.fill;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, 2 * Math.PI);
        ctx.fill();
    }
}

class Main {
    constructor(startingPoints) {
        this.startingPoints = startingPoints;

        this.points = new Array();
    }

    getRandPoint() {
        let num = Math.floor(Math.random()*this.startingPoints.length);
        return this.startingPoints[num];
    }

    getHalfWay() {
        let lastPoint = this.points[this.points.length-1];
        let randStartingPoint = this.getRandPoint();
        let x1, x2, y1, y2;

        if (randStartingPoint.x > lastPoint.x) {
            x1 = randStartingPoint.x;
            x2 = lastPoint.x;
        } else {
            x1 = lastPoint.x;
            x2 = randStartingPoint.x;
        }

        if (randStartingPoint.y > lastPoint.y) {
            y1 = randStartingPoint.y;
            y2 = lastPoint.y;
        } else {
            y1 = lastPoint.y;
            y2 = randStartingPoint.y;
        }

        let midX = (x1 + x2) / 2;
        let midY = (y1 + y2) / 2;

        let circle = new Circle(midX, midY);
        circle.draw();
        this.points.push(circle);
    }

    draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (const point of this.startingPoints) {
            point.draw();
        }

        for (const point of this.points) {
            point.draw();
        }
    }

    loop() {
        this.draw();
        this.getHalfWay();
        window.requestAnimationFrame(this.loop.bind(this));
    }
}

let hexagon = [
    new Circle(350, 70),
    new Circle(500, 150),
    new Circle(500, 315),
    new Circle(350, 400),
    new Circle(200, 315),
    new Circle(200, 150)
];

let triangle = [
    new Circle(350, 70),
    new Circle(175, 300),
    new Circle(525, 300)
];


let main = new Main(triangle);
main.draw();

const getStartingPoint = (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    let circle = new Circle(x, y, '#BFE3B4');
    circle.draw();

    main.points.push(circle);

    canvas.removeEventListener('mousedown', getStartingPoint);
    main.getHalfWay();


    window.requestAnimationFrame(()=>main.loop());
}

canvas.addEventListener('mousedown', getStartingPoint);