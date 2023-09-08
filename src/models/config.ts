export default class Config {
  size: [number, number] = [100, 100];
  timestep: number = 50;
  tooFew: [number, number] = [0, 1];
  reproduce: [number, number] = [3, 3];
  tooMany: [number, number] = [4, 8];

  constructor(config: Config|null) {
    if (config) {
      Object.assign(this, config);
    };
  };
};