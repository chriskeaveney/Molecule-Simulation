// Healthy molecule class (can be infected)
class Healthy extends Molecule {
    constructor(_x, _y, _vx, _vy, _checked) {
        super(_x, _y, _vx, _vy);
    }

    display() {
        stroke(255);
        strokeWeight(1);
        fill("rgba(90, 255, 95, 0.5)");
        ellipseMode(CENTER);
        ellipse(this.location.x, this.location.y, v.circleRadius, v.circleRadius);
        fill("rgba(90, 255, 95, 0.1)");
        noFill();
        stroke(this.RColor);
        strokeWeight(1);
    }
}
