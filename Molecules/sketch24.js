// Initialise variables
let bg;
var v = new Variables();

let molecules = [];

// More variables to make radius pulse around infected molecules
let count = 0;
let counterMax = 100;
let countDir = true;

// Defines initial enviroment properties (screen size etc.)
function setup() {
    // Creates canvas
    bg = loadImage('img/agar.png');
    let sketch = createCanvas(1110, 600);
    textSize(15);
    sketch.parent('canvasHolder');

    // Initialises graphical user interface
    var gui = new dat.GUI();

    // Adds a folder as a parameter to GUI
    var f1 = gui.addFolder('Radius Controls');

    f1.add(v, 'circleRadius', 0, 50).step(1);

    var f2 = gui.addFolder('Update Controls');

    f2.add(v, 'numHealthy', 0, 50).step(1);

    f2.add(v, 'numInfectors', 0, 50).step(1);

    f2.add(v, 'numImmune', 0, 50).step(1);

    f2.add(v, 'update');

    makeMolecules();
}

// Generates loop for molecules
function makeMolecules() {

    molecules = [];
    for (let i = 0; i < v.numInfectors; i++) {
        molecules.push(new Infector());
    }

    for (let i = 0; i < v.numHealthy; i++) {
        molecules.push(new Healthy());

    }

    for (let i = 0; i < v.numImmune; i++) {
        molecules.push(new Immune());

    }
}

// Continuously executes the draw loop function
function draw() {
    background(bg);
    noStroke;
    fill(0,0,0);

    // Labels for molecule details
    text("Healthy: " + v.numHealthy, 20, 60);
    text("Infected: " + v.numInfectors, 20, 90);
    text("Immune: " + v.numImmune, 20, 120);
    let fps = frameRate();
    text("Framerate: " + fps.toFixed(2), 890, 35);

    // Outer circle for infected molecule which pulsates
    stroke(192, 192, 192);
    strokeWeight(2);
    drawingContext.setLineDash([4, 6]);
    let extrarad = map(count, 0, 60, 0, 40);

    // Original ellipse is twice the size of the molecule
    ellipse(this.location.x, this.location.y, (v.circleRadius * 2) + extrarad, (v.circleRadius * 2) + extrarad);
    drawingContext.setLineDash([]);

    // Loop generates the x & y co-ordinates of the molecules for the X and Y plain
    for (var i = 0; i < molecules.length; i++) {
        for (var j = i + 1; j < molecules.length; j++) {
            let ax = molecules[i].location.x;
            let ay = molecules[i].location.y;
            let bx = molecules[j].location.x;
            let by = molecules[j].location.y;
            let dia = v.circleRadius;

            // Collision detection function to prevent overlap
            if (collideCircleCircle(ax, ay, dia, bx, by, dia)) {
                let angleI = Math.atan2(-molecules[i].velocity.x, -molecules[i].velocity.y) * 180 / Math.PI;
                let angleJ = Math.atan2(-molecules[j].velocity.x, -molecules[j].velocity.y) * 180 / Math.PI;

                let dx = ax - bx;
                let dy = ay - by;
                let dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < v.circleRadius * 1.01 - 2) {

                    let gap = (v.circleRadius * 1.01) - dist

                    molecules[i].location.x += (gap / 2) * (Math.cos(angleI))
                    molecules[i].location.y += (gap / 2) * (Math.sin(angleI))
                    molecules[j].location.x += (gap / 2) * (Math.cos(angleJ))
                    molecules[j].location.y += (gap / 2) * (Math.sin(angleJ))

                }

                // Calculate the normals
                let normalX = dx / dist;
                let normalY = dy / dist;

                // Find midpoint
                let midpointX = (ax + bx) / 2;
                let midpointY = (ay + by) / 2;

                let dVector = (molecules[i].velocity.x - molecules[j].velocity.x) * normalX;
                dVector += (molecules[i].velocity.y - molecules[j].velocity.y) * normalY;

                let dvx = dVector * normalX;
                let dvy = dVector * normalY;

                molecules[i].velocity.x -= dvx;
                molecules[i].velocity.y -= dvy;

                molecules[j].velocity.x += dvx;
                molecules[j].velocity.y += dvy;

                var r = random(1);
                if (r < 0.4) {
                    console.log("Yes");

                    // Function to remove healthy molecules and add infected molecule in its place when a
                    // transition takes place
                    if (molecules[i].constructor.name == "Healthy" && molecules[j].constructor.name == "Infector") {

                        let new_infector = new Infector(molecules[i].location.x, molecules[i].location.y, molecules[i].velocity.x, molecules[i].velocity.y);
                        molecules.splice(i, 1, new_infector);
                    }

                    if (molecules[j].constructor.name == "Healthy" && molecules[i].constructor.name == "Infector") {

                        let new_infector = new Infector(molecules[j].location.x, molecules[j].location.y, molecules[j].velocity.x, molecules[j].velocity.y);
                        molecules.splice(j, 1, new_infector);
                    }
                }

            }

        }
    }

    // Executes the molecule functions
    for (let i = 0; i < molecules.length; i++) {
        molecules[i].update();
        molecules[i].display();
        molecules[i].checkEdges();
    }

    // Counter
    if (count < counterMax && countDir == true) {
        count++;
        if (count >= counterMax) {
            countDir = false;

        }
    } else {
        count--;
        if (count == 0) {
            countDir = true;

        }
    }
}
