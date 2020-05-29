const GridMatrix = require("./index");

let grid = new GridMatrix({ width: 4, height: 3 });

let i = 0;
for (let y = 0; y < grid.height; y++) {
    for (let x = 0; x < grid.width; x++) {
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
console.log(grid.getNeighbour({ x: 1, y: 2 }, grid.Directions.SouthEast, { wrap: true }));
console.log("----------------------------------------");
console.log(grid.getNext({ x: 2, y: 2 }, { wrap: true }));
console.log("----------------------------------------");
console.log(grid.getPrevious({ x: 0, y: 0 }, { wrap: true }));
console.log("----------------------------------------");
console.log(grid.swap({ x: 1, y: 0 }, { x: 2, y: 1 }));
console.log("----------------------------------------");
console.log(grid.addRowAfter([null, null, null, null]));
console.log("----------------------------------------");
console.log(grid.removeRow(grid.height - 1));
