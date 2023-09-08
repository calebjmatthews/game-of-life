export default class BoardLayer {
  value: boolean[][] = [];

  constructor(boardLayer: BoardLayer|null) {
    if (boardLayer) {
      Object.assign(this, boardLayer);
    };
  };

  initialize(size: [number, number]) {
    for (let colIndex = 0; colIndex < size[0]; colIndex++) {
      this.value[colIndex] = [];
      for (let rowIndex = 0; rowIndex < size[1]; rowIndex++) {
        this.value[colIndex][rowIndex] = Math.random() > 0.5;
      };
    };
  };

  getNeighborsSum(args: { position: [number, number], size: [number, number] }) {
    const { position, size } = args;
    let sum = 0;
    for (let offsetX = -1; offsetX <= 1; offsetX++) {
      for (let offsetY = -1; offsetY <= 1; offsetY++) {
        if ((offsetX !== 0 || offsetY !== 0)) {
          const offset = [(position[0] + offsetX), (position[1] + offsetY)];
          const withinX = (offset[0] >= 0) && (offset[0] < size[0]);
          const withinY = (offset[1] >= 0) && (offset[1] < size[1]);
          if (withinX && withinY) {
            sum += (this.value[offset[0]][offset[1]] ? 1 : 0);
          };
        };
      };
    };
    return sum;
  };
};