const GridMatrix = require("./index");

let grid = new GridMatrix({ width: 3, height: 3 });

let i = 0;
for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 3; x++) {
        grid.setData({ x, y }, i);
        i++;
    }
}

console.log(grid.data);
console.log("----------------------------------------");
console.log(grid.toArray());
console.log("----------------------------------------");
console.log(grid.getData({ x: 1, y: 0 }));
console.log("----------------------------------------");
console.log(grid.getNeighbour({ x: 2, y: 2 }, grid.Directions.North));
console.log("----------------------------------------");
console.log(grid.getNext({ x: 2, y: 2 }, { wrap: true }));
console.log("----------------------------------------");
console.log(grid.getPrevious({ x: 0, y: 0 }, { wrap: true }));
console.log("----------------------------------------");
console.log(grid.swap({ x: 1, y: 0 }, { x: 2, y: 1 }));
