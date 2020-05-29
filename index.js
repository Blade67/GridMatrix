module.exports = class GridMatrix {
    /**
     * @param {Object} size
     * @param {Number} size.width
     * @param {Number} size.height
     * @param {Object} options
     * @param {Boolean} options.allowOverflow - If true, height overflow will be ignored. If false, overflow will be cropped. Default: true
     * @param {*} options.defaultValue - Default: null
     */
    constructor(size, options) {
        this.size = Object.assign({ x: 0, y: 0 }, size);
        this.options = Object.assign({ allowOverflow: true, defaultValue: null }, options);
        this.width = Number(this.size.width) !== NaN ? Number(this.size.width) : 0;
        this.height = Number(this.size.height) !== NaN ? Number(this.size.height) : 0;
        this.data = generateGridMatrix(this.width, this.height, this.options.defaultValue);
        this.Directions = Object.freeze({
            North: 0,
            NorthEast: 1,
            East: 2,
            SouthEast: 3,
            South: 4,
            SouthWest: 5,
            West: 6,
            NorthWest: 7,
        });
    }

    /**
     * @returns {Array|null}
     */
    toArray() {
        return this.data.flat();
    }

    /**
     * @param {Object} position
     * @param {Number} position.x
     * @param {Number} position.y
     * @param {*} value
     */
    setData(position, value) {
        if (value === null) return undefined;
        let pos = Object.assign({ x: 0, y: 0 }, position);
        if (this.data[pos.y][pos.x] === undefined) return undefined;
        this.data[pos.y][pos.x] = value;
        return this.data[pos.y][pos.x];
    }

    /**
     * @param {Object} position
     * @param {Number} position.x
     * @param {Number} position.y
     * @returns {*|null}
     */
    getData(position) {
        let pos = Object.assign({ x: 0, y: 0 }, position);
        if (this.data[pos.y][pos.x] === undefined) return undefined;
        return this.data[pos.y][pos.x];
    }

    /**
     * @param {Object} position
     * @param {Number} position.x
     * @param {Number} position.y
     * @param {Number} dir - <GridMatrix>.Directions.<"North", "NorthEast", "East", ..>
     *  @returns {*|null}
     */
    getNeighbour(position, dir, options) {
        let opt = Object.assign({ wrap: false }, options);
        let pos = Object.assign({ x: 0, y: 0 }, position);
        if (this.data[pos.y][pos.x] === undefined) return undefined;
        if (Object.values(this.Directions).find((el) => el === dir) === undefined)
            throw new Error(
                `Invalid direction "${dir}"! Directions:\n${Object.keys(this.Directions)
                    .map((el, i) => (el = `${i} - <GridMatrix>.Directions.${el}`))
                    .join("\n")}\n`
            );
        let ty = pos.y;
        let tx = pos.x;
        try {
            switch (dir) {
                case this.Directions.North:
                    if (opt.wrap && pos.y - 1 < 0) ty = this.data.flat().length / this.width;
                    return this.data[ty - 1][tx];
                case this.Directions.NorthEast:
                    if (opt.wrap) {
                        if (pos.y - 1 < 0) ty = this.data.flat().length / this.width;
                        if (pos.x + 1 > this.data[ty - 1].length - 1) tx = -1;
                    }
                    return this.data[ty - 1][tx + 1];
                case this.Directions.East:
                    if (opt.wrap && pos.x + 1 > this.data[ty].length - 1) tx = -1;
                    return this.data[ty][tx + 1];
                case this.Directions.SouthEast:
                    if (opt.wrap) {
                        if (pos.y + 1 > this.data.flat().length / this.width - 1) ty = -1;
                        if (pos.x + 1 > this.data[ty + 1].length - 1) tx = -1;
                    }
                    return this.data[ty + 1][tx + 1];
                case this.Directions.South:
                    if (opt.wrap && pos.y + 1 > this.data.flat().length / this.width - 1) ty = -1;
                    return this.data[ty + 1][tx];
                case this.Directions.SouthWest:
                    if (opt.wrap) {
                        if (pos.y + 1 > this.data.flat().length / this.width - 1) ty = -1;
                        if (pos.x - 1 < 0) tx = this.data[pos.y].length;
                    }
                    return this.data[ty + 1][tx - 1];
                case this.Directions.West:
                    if (opt.wrap && pos.x - 1 < 0) tx = this.data[ty].length;
                    return this.data[ty][tx - 1];
                case this.Directions.NorthWest:
                    if (opt.wrap) {
                        if (pos.y - 1 < 0) ty = this.data.flat().length / this.width;
                        if (pos.x - 1 < 0) tx = this.data[ty - 1].length;
                    }
                    return this.data[ty - 1][tx - 1];
            }
        } catch (e) {
            return undefined;
        }
    }

    /**
     * @param {Object} position
     * @param {Number} position.x
     * @param {Number} position.y
     * @param {Object} options
     * @param {Boolean} options.wrap
     */
    getNext(position, options) {
        let opt = Object.assign({ wrap: false }, options);
        let pos = Object.assign({ x: 0, y: 0 }, position);
        if (this.data[pos.y][pos.x] === undefined) return undefined;
        return this.width * pos.y + pos.x + 1 < this.data.length - 1
            ? this.data.flat()[this.width * pos.y + pos.x + 1]
            : opt.wrap
            ? this.data.flat()[0]
            : undefined;
    }

    /**
     * @param {Object} position
     * @param {Number} position.x
     * @param {Number} position.y
     * @param {Object} options
     * @param {Boolean} options.wrap
     */
    getPrevious(position, options) {
        let opt = Object.assign({ wrap: false }, options);
        let pos = Object.assign({ x: 0, y: 0 }, position);

        if (this.data[pos.y][pos.x] === undefined) return undefined;
        return this.width * pos.y + pos.x - 1 > 0
            ? this.data.flat()[this.width * pos.y + pos.x - 1]
            : opt.wrap
            ? this.data.flat()[this.data.flat().length - 1]
            : undefined;
    }

    /**
     * @param {Object} position
     * @param {Number} position.x
     * @param {Number} position.y
     * @param {Object} target
     * @param {Number} target.x
     * @param {Number} target.y
     */
    swap(position, target) {
        let pos = Object.assign({ x: 0, y: 0 }, position);
        let tar = Object.assign({ x: 0, y: 0 }, target);

        if (this.data[pos.y][pos.x] === undefined && this.data[tar.y][tar.x] === undefined) return undefined;
        let tmp = this.data[pos.y][pos.x];
        this.data[pos.y][pos.x] = this.data[tar.y][tar.x];
        this.data[tar.y][tar.x] = tmp;
        return this.data;
    }

    /**
     * @param {Array} data - Column data to add to the GridMatrix
     */
    addColumnBefore(data) {
        if (!Array.isArray(data) || data.length !== this.height) return undefined;
        for (let col in this.data) {
            this.data[col].unshift(data[col]);
        }
        this.width++;
        return this.data;
    }

    /**
     * @param {Array} data - Column data to add to the GridMatrix
     */
    addColumnAfter(data) {
        if (!Array.isArray(data) || data.length !== this.height) return undefined;
        for (let col in this.data) {
            this.data[col].push(data[col]);
        }
        this.width++;
        return this.data;
    }

    /**
     * @param {Number} column - The column ID to remove
     */
    removeColumn(column) {
        if (column < 0 || column > this.width) return undefined;
        for (let col in this.data) {
            this.data[col].splice(column, 1);
        }
        return this.data;
    }

    /**
     * @param {Array} data - Row data to add to the GridMatrix
     */
    addRowBefore(data) {
        if (!Array.isArray(data) || data.length !== this.width) return undefined;
        this.data.unshift(data);
        this.height++;
        return this.data;
    }

    /**
     * @param {Array} data - Row data to add to the GridMatrix
     */
    addRowAfter(data) {
        if (!Array.isArray(data) || data.length !== this.width) return undefined;
        this.data.push(data);
        this.height++;
        return this.data;
    }

    /**
     * @param {Number} row - The row ID to remove
     */
    removeRow(row) {
        if (row < 0 || row > this.width) return undefined;
        this.data.splice(row, 1);
        return this.data;
    }
};

const splitArray = (array, chunkSize) =>
    Array(Math.ceil(array.length / chunkSize))
        .fill()
        .map((_, index) => index * chunkSize)
        .map((begin) => array.slice(begin, begin + chunkSize));

const generateGridMatrix = (width, height, defaultValue) => {
    let gm = new Array(width * height);
    for (let i = 0; i < gm.length; i++) {
        gm[i] = defaultValue;
    }
    return splitArray(gm, width);
};
