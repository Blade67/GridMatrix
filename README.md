# **GridMatrix**

A simplified solution for 2D Arrays, Grids, Matrices or whatever you want to call them!

**Disclaimer**: This module was designed in a non-destructive way, meaning that if anything goes wrong, it tries to return `undefined` instead of an error. (if possible)

Github Repo: https://github.com/Blade67/GridMatrix

## **Installation**

```
npm i @blade67/gridmatrix
```

## **Setup**

```js
const GridMatrix = require("@blade67/gridmatrix");

let grid = new GridMatrix({ width: 2, height: 2 });
// Output: [[null, null], [null, null]]
```

## **API**

## Propperties

-   **size**
    ```js
    <GridMatrix>.size
    // Output: { x: 2, y: 2}
    ```
-   **width**
    ```js
    <GridMatrix>.width
    // Output: 2
    ```
-   **height**
    ```js
    <GridMatrix>.height
    // Output: 2
    ```
-   **data**
    ```js
    <GridMatrix>.data
    // Output: [[null, null], [null, null]]
    ```
-   **options**
    ```js
    <GridMatrix>.options
    // Output: { allowOverflow: true, defaultValue: null }
    ```
-   **Directions** (Enum/Object: `{ North: 0, NorthEast: 1, East: 2, SouthEast: 3, South: 4, SouthWest: 5, West: 6, NorthWest: 7,

    ````js
    <GridMatrix>.Directions
    // Output: {
    // North: 0,
    // NorthEast: 1,
    // East: 2,
    // SouthEast: 3,
    // South: 4,
    // SouthWest: 5,
    // West: 6,
    // NorthWest: 7,
    // }

        <GridMatrix>.Directions.North
        // Output: 0
        ```

    }`)
    ````

## Methods

-   **setData**
    ```js
    <GridMatrix>.setData({ x: 0, y: 0}, "Node 0-0");
    // Output: "Node 0-0"
    ```
-   **getData**
    ```js
    <GridMatrix>.getData({ x: 0, y: 0});
    // Output: "Node 0-0"
    ```
-   **toArray**
    ```js
    <GridMatrix>.toArray();
    // Output: ["Node 0-0", null, null, null]
    ```
-   **getNeighbour**
    ```js
    <GridMatrix>.getNeighbour({ x: 0, y: 1 }, <GridMatrix>.Directions.North);
    // Output: "Node 0-0"
    ```
-   **getNext**
    ```js
    <GridMatrix>.getNext({ x: 1, y: 1 }, { wrap: true });
    // Output: "Node 0-0"
    // Output (wrap: false): undefined
    ```
-   **getPrevious**
    ```js
    <GridMatrix>.getPrevious({ x: 0, y: 0 }, { wrap: true });
    // Output: null
    // Output (wrap: false): undefined
    ```
-   **swap**
    ```js
    <GridMatrix>.swap({ x: 0, y: 0 }, { x: 1, y: 1 });
    // Output: [[null, null],[null, "Node 0-0"]]
    ```
-   **addRowBefore**
    ```js
    <GridMatrix>.addRowBefore(["a", "b"]);
    // Output: [["a", "b"],[null, null],[null, "Node 0-0"]]
    ```
-   **addRowAfter**
    ```js
    <GridMatrix>.addRowAfter(["a", "b"]);
    // Output: [[null, null],[null, "Node 0-0"],["a", "b"]]
    ```
-   **removeRow**
    ```js
    <GridMatrix>.removeRow(1);
    // Output: [[null, null],["a", "b"]]
    ```
-   **addColumnBefore**
    ```js
    <GridMatrix>.addColumnBefore(["a", "b"]);
    // Ouput: [["a", null, null],["b", null, "Node 0-0"]]
    ```
-   **addColumnAfter**
    ```js
    <GridMatrix>.addColumnAfter(["a", "b"]);
    // Ouput: [[null, null, "a"],[null, "Node 0-0", "b"]]
    ```
-   **removeColumn**
    ```js
    <GridMatrix>.removeColumn(2);
    // Output: [[null, null],[null, "Node 0-0"]]
    ```
