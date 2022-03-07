// Infected molecule class (can infect healthy molecules)
class Infector extends Molecule {
    constructor(_x, _y, _vx, _vy, _checked) {
        super(_x, _y, _vx, _vy);
    }

    display() {
        fill("rgba(139, 0, 0, 0.25)");
        // Molecules are drawn from their centre for collions
        ellipseMode(CENTER);

        // Outer circle for infected molecule that's pulsates
        drawingContext.setLineDash([4, 6]);
        let extrarad = map(count, 0, 60, 0, 40);
        ellipse(this.location.x, this.location.y, (v.circleRadius * 2) + extrarad, (v.circleRadius * 2) + extrarad);
        fill("rgb(139, 0, 0)");
        drawingContext.setLineDash([]);
        let infectionRadius = ellipse(this.location.x, this.location.y, v.circleRadius, v.circleRadius);
    }

}
