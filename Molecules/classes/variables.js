// Variables class controls default values for the molecules
class Variables {
    constructor() {
        this.circleRadius = 20;
        this.infectionRadius = 50;
        this.infectionRange = 2;
        this.numHealthy = 20;
        this.numInfectors = 3;
        this.numImmune = 5;
        this.velocity = 5;
    }

    update() {
        makeMolecules();
    }
}
