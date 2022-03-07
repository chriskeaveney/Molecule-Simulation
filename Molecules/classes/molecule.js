// Molecule superclass which is inherited from each molecule subclass
class Molecule {
    constructor
        (
            _x = random(width), _y = random(height), _vx = random(-0.25, 0.5), _vy = random(0.5, -1.5), _checked = false
        ) {
            this.location = createVector(_x, _y);
            this.velocity = createVector(_vx, _vy);
            this.acceleration = createVector();
            this.RColor = color(255, 255, 255);
            this.checked = _checked;
            this.count = 0;
            this.lifespan = 0;
        }

    update() {
        this.velocity.add(this.acceleration);
        this.velocity.limit(100);
        this.location.add(this.velocity);
        this.acceleration.mult(0);
    }

    display() {
        stroke(150);
        stroke(this.RColor);
        strokeWeight(1);
        fill("rgba(232, 236, 241, 0.5)");
        ellipse(this.location.x, this.location.y, v.circleRadius * 2, v.circleRadius * 2);
    }

    // Checker reverses direction of molecules when the edge of the canvas is hit
    checkEdges() {
        if (this.location.x > width || this.location.x < 0) {
            this.velocity.x = this.velocity.x * -1;
        }
        if (this.location.y > height || this.location.y < 0) {
            this.velocity.y = this.velocity.y * -1;
        }
    }


}
