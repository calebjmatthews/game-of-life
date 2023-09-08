import Config from './config';
import BoardLayer from './boardLayer';

export default class GameOfLife {
  config: Config = new Config(null);
  boardLayer: BoardLayer = new BoardLayer(null);

  constructor(gameOfLife: GameOfLife|null) {
    if (gameOfLife) {
      Object.assign(this, gameOfLife);
    };
  };

  initialize() {
    this.boardLayer.initialize(this.config.size);
  };

  performTimestep() {
    const { size, tooFew, tooMany, reproduce } = this.config;
    const newLayer = new BoardLayer(null);
    newLayer.initialize(size);
    for (let colIndex = 0; colIndex < this.config.size[0]; colIndex++) {
      for (let rowIndex = 0; rowIndex < this.config.size[1]; rowIndex++) {
        const neighborSum = this.boardLayer.getNeighborsSum({ position: [colIndex, rowIndex], size });
        let shouldOccupy = this.boardLayer.value[colIndex][rowIndex];
        if ((neighborSum >= tooFew[0]) && (neighborSum <= tooFew[1])) {
          shouldOccupy = false;
        };
        if ((neighborSum >= tooMany[0]) && (neighborSum <= tooMany[1])) {
          shouldOccupy = false;
        };
        if ((neighborSum >= reproduce[0]) && (neighborSum <= reproduce[1])) {
          shouldOccupy = true;
        };
        newLayer.value[colIndex][rowIndex] = shouldOccupy;
      };
    };
    this.boardLayer = newLayer;
    return this;
  };
};