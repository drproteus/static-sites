"use strict";

var CellularAutomaton = {
  rule: function(state, neighbors) {
    if (state === 1) {
      if (neighbors.length < 2 || neighbors.length > 3) {
        return 0;
      }
      return 1;
    } else if (neighbors.length === 3) {
     return 1;
    } 
    return 0;
  },
  space: {},
  init: function(sizeX, sizeY, attributeCallback) {
    this.space = new Space(sizeX, sizeY);
    this.attrfunc = attributeCallback;
    this.generations = 0;
  },
  update: function() {
    var that = this;
    this.space.update(that.rule, that.attrfunc);
    this.generations++;
  },
  run: function(callback) {
    this.init();
    while(true) {
      this.history.push(this.space.clone());
      this.update();
      callback(this.space);
    }
  },
  toggleCellState: function(x, y) {
    this.space.toggleCellState(x, y);
  },
  randomize: function() {
    this.space.randomize();
  },
  generations: 0
}

class Cell {
  constructor(x, y, state) {
    this.x = x;
    this.y = y;
    this.state = state;
  }

  update(rule, neighbors) {
    this.state = rule(this.state, neighbors);
  }

  toggleState() {
    if (this.state === 0) {
      this.state = 1;
    } else if (this.state === 1) {
      this.state = 0;
    }
  }

  setRandomState() {
     this.state = (Math.random() < 0.15 ? 1 : 0);
  }
}

class Space {
  constructor(sizeX, sizeY) {
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.grid = new Array(sizeX);
    for (var i = 0; i < sizeX; i++) {
      this.grid[i] = new Array(sizeY);
      for (var j = 0; j < sizeY; j++) {
        this.grid[i][j] = new Cell(i, j, 0);
      }
    }
  }

  randomize() {
    for (var i = 0; i < this.sizeX; i++) {
      for (var j = 0; j < this.sizeY; j++) {
        this.grid[i][j].setRandomState();
      }
    }
  }

  update(rule) {
    var tempGrid = new Array(this.sizeX);
    for (var i = 0; i < this.sizeX; i++) {
      tempGrid[i] = new Array(this.sizeY);
      for (var j = 0; j < this.sizeY; j++) {
        tempGrid[i][j] = new Cell(i, j, this.grid[i][j].state)
        tempGrid[i][j].update(rule, this.getLiveNeighbors(i, j));
      }
    }
    this.grid = tempGrid;
  }

  getNeighbors(i, j) {
    var neighbors = [];
    var that = this;
    [[i-1,j-1],[i,j-1],[i+1,j-1],
      [i-1, j],[i+1, j],
      [i-1, j+1],[i,j+1],[i+1,j+1]].forEach(function(coordinates) {
        coordinates[0] = (coordinates[0] + that.sizeX) % that.sizeX;
        coordinates[1] = (coordinates[1] + that.sizeY) % that.sizeY;
        if (coordinates[0] >= 0 && coordinates[0] < that.sizeX &&
          coordinates[1] >= 0 && coordinates[1] < that.sizeY) {
            neighbors.push(that.grid[coordinates[0]][coordinates[1]]);
          }
      });
    return neighbors;
  }

  getLiveNeighbors(i, j) {
    var that = this;
    return this.getNeighbors(i, j).filter(function(cell) {
      if (cell.state === 1) {
        return true;
      } else {
        return false;
      }
    });
  }

  toggleCellState(x, y) {
    if (this.grid !== "undefined") {
      this.grid[y][x].toggleState();
    }
  }
}
