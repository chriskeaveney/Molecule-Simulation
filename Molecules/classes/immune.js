// Immune molecule class (can not be infected)
class Immune extends Molecule {
    constructor(_x, _y, _vx, _vy, _checked) {
        super(_x, _y, _vx, _vy);
    }

    display() {
        stroke(255);
        strokeWeight(1);
        fill("rgba(169,169,169, 0.75)");
        ellipseMode(CENTER);
        ellipse(this.location.x, this.location.y, v.circleRadius, v.circleRadius);
        noFill();
        stroke(this.RColor);
        strokeWeight(1);
    }
}
